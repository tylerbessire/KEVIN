function sendMessage() {
  const userInput = document.getElementById('userInput').value;

  // Clear the input after sending
  document.getElementById('userInput').value = '';

  // Displaying a temporary message in chat
  displayMessage(userInput, 'user');

  console.log("Sending message to the server:", userInput);

  fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: userInput })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log("Received response from the server:", data);
    displayMessage(data.response, 'kevin');
  })
  .catch(error => {
    console.error('Error sending message:', error);
    console.error('Error stack:', error.stack);
  });
}

function displayMessage(message, sender) {
  const chatMessages = document.getElementById('chatMessages');
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.className = 'message ' + sender;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
}

document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.getElementById('sendButton');
  sendButton.addEventListener('click', sendMessage);

  console.log("Chat interface ready for user input.");
});