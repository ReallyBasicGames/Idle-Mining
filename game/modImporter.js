
let selectFileButton;
let inputButton;
let displayElements = [];

let tempDisplay;

let mods = [];

let removeModElement;
let errorElement;

function setup()
{
  if(location.href == "file:///home/me/Desktop/P5%20Offline/game/importMod.html") {
    selectFileButton = createButton("LOAD MOD FROM COMPUTER");
    selectFileButton.mousePressed(getMod);
    selectFileButton.parent("input");
    selectFileButton.class("ResearchButton");
    errorElement = createElement('a', '');
    errorElement.class("error-text");
  }
}

function draw()
{
  if(location.href == "file:///home/me/Desktop/P5%20Offline/game/importMod.html") {

  }
}

function getMod()
{
  // https://stackoverflow.com/questions/16215771/how-to-open-select-file-dialog-via-js
  var input = document.createElement('input');
  input.type = 'file';
  input.onchange = e => {
    // getting a hold of the file reference
    selectedModFile = e.target.files[0];

    // setting up the reader
   var reader = new FileReader();
   reader.readAsText(selectedModFile,'JSON');

   // here we tell the reader what to do when it's done reading...
   reader.onload = readerEvent => {
      var content = readerEvent.target.result; // this is the content!
      //console.log(JSON.stringify(content));
      try {
        content = JSON.parse(content);
        if(!checkNameMatch(content.modDetails.modName)) {
          mods.push(content);
          let disText = "<li>" + mods[mods.length-1].modDetails.modName + " made by " + mods[mods.length-1].modDetails.modAuthor + "<br>Mod Description: " + mods[mods.length-1].modDetails.modDiscription + "</li>";
          displayElements.push(createElement('a', disText).id(mods[mods.length-1].modDetails.modName).parent('mods'));
       }
       else errorElement.html('<b>You already have this mod!</b>');
      }
      catch (e)
      {
        errorElement.html("<b>Encountered an error loading your mod: <br>" + e + "</b>");
      }
   }
  }
  input.click();
}


function checkNameMatch(name){
  for(var i = 0; i < mods.length; i++){
    let currMod = mods[i];
    if(currMod.modDetails.modName == name) return true;
  }
  return false;
}
