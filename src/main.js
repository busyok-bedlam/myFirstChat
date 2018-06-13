var socket = io('http://localhost:7000');

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const list = document.getElementById('message-list');

const submitForm = e => {
    e.preventDefault();
    console.log("SUBMITTING")
    const messageContent = input.value.trim();
    if(messageContent){
        socket.emit('SEND_MESSAGE_TO_SERVER', messageContent);
    }
}
const encodeHTML = str => {
    const div = document.createElement('div');
    div.innerHTML = str;
    return div;
}

const addListItem = data => {
    console.log("START ADD ELEMENT")
    const li = document.createElement('li');
    const { content,username,date } = data;
    const liDate = encodeHTML(date.toLocaleString());
    const liContent = encodeHTML(content);
    const liUsername = encodeHTML(username);
    const arr = [liDate,liUsername,liContent];
    for(let item of arr){
        li.appendChild(item)
    }
    list.appendChild(li);
    input.value = ""
}

socket.on('connect', () => {
    console.log('CONNECTED SOCKET ON CLIENT')
})

socket.on('disconnect', function(){
    console.log("DISCONNECTED SOCKET FROM CLIENT")
});
socket.on("SEND_MESSAGE_TO_CLIENT", data => {
    console.log("SEND_MESSAGE_TO_CLIENT")
    addListItem(data);

})

form.addEventListener('submit', submitForm)