let messages = [];
let messageElement
let maxMessageLength = 7;

function initMessages()
{
  if(messageElement == null) {
    messageElement = createElement('a', '> ');
    messageElement.parent('messages');
    messageElement.style('color', 'gray');
    messageElement.style('width', '1000px');
    messageElement.style('height', '144px');
    for(var i = 0; i < maxMessageLength; i++)
    {
      messages.push(" ");
    }
  }
}

function logMessage(message){
  messages.push(message);
  if(messages.length > maxMessageLength) {
    messages.shift(0);
  }
  displayMessages();
}


function displayMessages(){
  let stringToAdd = "";
  for(var i = 0; i < maxMessageLength-1; i++)
  {
    stringToAdd += (". " + messages[i]);
    stringToAdd += "<br>";
  }
  stringToAdd += (">> " + messages[messages.length-1]);
  stringToAdd += "<br>";



  messageElement.html(stringToAdd);
}
