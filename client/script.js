import { io } from 'socket.io-client'

const messageContainer = document.getElementById('message-container')
const joinRoomButton = document.getElementById('room-button')
const messageInput = document.getElementById('message-input')
const roomInput = document.getElementById('room-input')
const messageForm = document.getElementById('send-container')

// form from video tutorial is send-container in this script

const socket = io('http://localhost:3000')
socket.on('connect', () => {
    displayMessage(`You connected with id ${socket.id}`);
})

socket.emit('custom-event', 42, 'HelloChat')

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value;
    const room = roomInput.value;

    if (message === "") return
    displayMessage(message);
    
    messageInput.value = "";
  });


joinRoomButton.addEventListener("click", () => {
    const room = roomInput.value;
});

function displayMessage(message) {
    const div = document.createElement("div");
    div.textContent = message;
    document.getElementById("messageContainer").append(div)
}


/*
const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
*/