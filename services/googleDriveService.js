const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { encrypt, decrypt } = require('./encryptionService'); // Assume encryptionService.js exists for handling encryption

class GoogleDriveService {
  constructor() {
    this.auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, '../credentials/google-service-account.json'), // Path to your Google service account credentials
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    this.drive = google.drive({ version: 'v3', auth: this.auth });
  }

  async uploadFile(fileName, content, folderId = 'root') {
    const encryptedContent = encrypt(content); // Encrypt content before uploading
    const bufferStream = new Buffer.from(encryptedContent, 'utf-8');

    try {
      const response = await this.drive.files.create({
        requestBody: {
          name: fileName,
          parents: [folderId],
          mimeType: 'text/plain',
        },
        media: {
          mimeType: 'text/plain',
          body: bufferStream,
        },
      });

      console.log(`File uploaded successfully: ${fileName}`);
      return response.data;
    } catch (error) {
      console.error('The API returned an error: ' + error);
      throw new Error('Failed to upload file to Google Drive');
    }
  }

  async readFile(fileId) {
    try {
      const response = await this.drive.files.get({
        fileId: fileId,
        alt: 'media',
      }, {responseType: 'stream'});

      let data = '';
      response.data.on('data', (chunk) => {
        data += chunk;
      });

      return new Promise((resolve, reject) => {
        response.data.on('end', () => {
          const decryptedContent = decrypt(data); // Decrypt content after downloading
          console.log(`File read successfully: ${fileId}`);
          resolve(decryptedContent);
        });
        response.data.on('error', (err) => {
          console.error('Error reading file from Google Drive', err);
          reject('Failed to read file from Google Drive');
        });
      });
    } catch (error) {
      console.error('The API returned an error: ' + error);
      throw new Error('Failed to read file from Google Drive');
    }
  }

  async updateFile(fileId, newContent) {
    const encryptedContent = encrypt(newContent); // Encrypt content before updating
    const bufferStream = new Buffer.from(encryptedContent, 'utf-8');

    try {
      const response = await this.drive.files.update({
        fileId: fileId,
        media: {
          mimeType: 'text/plain',
          body: bufferStream,
        },
      });

      console.log(`File updated successfully: ${fileId}`);
      return response.data;
    } catch (error) {
      console.error('The API returned an error: ' + error);
      throw new Error('Failed to update file on Google Drive');
    }
  }

  async deleteFile(fileId) {
    try {
      await this.drive.files.delete({
        fileId: fileId,
      });
      console.log(`File deleted successfully: ${fileId}`);
    } catch (error) {
      console.error('The API returned an error: ' + error);
      throw new Error('Failed to delete file from Google Drive');
    }
  }
}

module.exports = GoogleDriveService;