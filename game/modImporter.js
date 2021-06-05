
let inputField;
let inputButton;
let displayElement;

let mods = [];
let modLinks = [];

function setup()
{
  if(location.href == "file:///home/me/Desktop/P5%20Offline/game/importMod.html") {
    inputField = createInput('').attribute('placeholder', "Mod link...");
    inputButton = createButton("Submit");
    inputButton.mousePressed(submitMod);
    createElement('a', '<br>');
    displayElement = createElement('a', 'Mods<br>').id('displayEl');
  }
}

function draw()
{
  if(location.href == "file:///home/me/Desktop/P5%20Offline/game/importMod.html") {
    // disable the submit button if input is invalid
    if(inputField.value() == "Mod link..." || inputField.value() == "") inputButton.attribute('disabled', '');
    else inputButton.removeAttribute('disabled');

    // display all mods with a button to remove them
    let disText = 'Mods:<br><ul><li>mod...</li></ul>';
    displayElement.html(disText);
  }
}


// handle getting mods from github
function submitMod()
{
  modLinks.push(inputField.value);
}
