import { io } from 'socket.io-client'

const messageContainer = document.getElementById('message-container')
const joinRoomButton = document.getElementById('room-button')
const messageInput = document.getElementById('message-input')
const roomInput = document.getElementById('room-input')
const messageForm = document.getElementById('send-container')

// form from video tutorial is send-container in this script


// every socket is in their own room that is called by the socket id
// i.e. the room name is the same as the socket name given
const socket = io('http://localhost:3000')

// creating a user socket for a specific user
// we can probably access a database and put the username into the token spot
const userSocket = io('http://localhost:3000/user', {auth: {token: "Movie Critic"}});


socket.on('connect', () => {
    displayMessage(`You connected with id ${socket.id}`);
})

userSocket.on('connect_error', error => {
  displayMessage(error)
})

socket.on('receive-message', message => {
    displayMessage(message);
});

// this takes an event and sends it to the server
socket.emit('custom-event', 42, 'Hello Movie Chat')

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value;
    const room = roomInput.value;

    if (message === "") return
    displayMessage(message);
    socket.emit('send-message', message, room)
    
    messageInput.value = "";
  });


joinRoomButton.addEventListener("click", () => {
    // lets the user name a specific room
    const room = roomInput.value;
    // joins the user to the room they named
    // also contains a callback function so the user knows they joined the room
    socket.emit('join-room', room, message => {
      displayMessage(message);
    })
});

function displayMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
  }
