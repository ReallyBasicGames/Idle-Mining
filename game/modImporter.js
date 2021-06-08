
let selectFileButton;
let inputButton;
let displayElements = [];

let tempDisplay;

let mods = [];

let removeModElement;
let removeModInput;
let errorElement;

let homeScreenButton;
let clearStorageButton;

function setup()
{
  if(location.href == "file:///home/me/Desktop/P5%20Offline/game/importMod.html") {
    if(getItem('globals')!= null) globals = getItem('globals');
    if(getItem('mods')!= null) mods = getItem('mods');
    homeScreenButton = createButton("Exit to Game");
    homeScreenButton.class("ModButton");
    homeScreenButton.parent("input");
    homeScreenButton.mousePressed(home);
    clearStorageButton = createButton("Clear Storage (Recommended if mod is loaded or removed)");
    clearStorageButton.class("ModButton");
    clearStorageButton.parent("input");
    clearStorageButton.mousePressed(clearThisStorage);
    createElement('a', '<br>').parent("input");
    createElement('a', '<br>').parent("input");
    selectFileButton = createButton("LOAD MOD FROM COMPUTER");
    selectFileButton.mousePressed(getMod);
    selectFileButton.parent("input");
    selectFileButton.class("ModButton");
    errorElement = createElement('a', '');
    errorElement.class("error-text");
    errorElement.parent("error");
    createElement('a', '<br>').parent("input");
    createElement('a', '<br>').parent("input");
    createElement('a', 'Careful! If you remove a mod, you MUST clear your storage!').parent("input");
    createElement('a', '<br>').parent("input");
    removeModInput = createInput('').attribute('placeholder', '#');
    removeModInput.parent("input");
    removeModInput.attribute('type', 'number');
    removeModInput.class("ModInputField");
    removeModElement = createButton("DELETE EXSISTING MOD");
    removeModElement.parent("input");
    removeModElement.class("ModButton");
    removeModElement.mousePressed(() => {
      removeMod(removeModInput.value());
    });
    reloadMods();
  }
}

function reloadMods()
{

  for(var i = 0; i < mods.length; i++)
  {
    let disText = "<li>" + mods[i].modDetails.modName + " made by " + mods[i].modDetails.modAuthor + "<br>Mod Description: " + mods[mods.length-1].modDetails.modDiscription + "</li>";
    displayElements.push(createElement('a', disText).id(mods[i].modDetails.modName).parent('mods'));
  }
}

function clearThisStorage() {
  storeItem('globals', null);
  storeItem('mods', null);
  clearStorage();
  globals = defaultItems;
  storeItem('globals', globals);
  homeScreenButton.removeAttribute('disabled');
  homeScreenButton.html("Exit to Game");
}

function home()
{
  // store the local mods in the globals
  try {
    //console.log(globals);
    for(var i = 0; i < mods.length; i++)
    {
      let currMod = mods[i];
      //console.log(currMod);

      // merge the resources
      for(var r = 0; r < Object.keys(currMod.resources).length; r++) {
        globals.resources[Object.keys(currMod.resources)[r]] = currMod.resources[Object.keys(currMod.resources)[r]];
      }
      // merge the production buildings
      for(var p = 0; p < Object.keys(currMod.productionBuildings).length; p++) {
        globals.productionBuildings[Object.keys(currMod.productionBuildings)[p]] = currMod.productionBuildings[Object.keys(currMod.productionBuildings)[p]];
      }
      // merge the harvesters
      for(var h = 0; h < Object.keys(currMod.harvesters).length; h++) {
        globals.harvesters[Object.keys(currMod.harvesters)[h]] = currMod.harvesters[Object.keys(currMod.harvesters)[h]];
      }
      // merge the auto-production buildings
      for(var a = 0; a < Object.keys(currMod.auto_production).length; a++) {
        globals.auto_production[Object.keys(currMod.auto_production)[a]] = currMod.auto_production[Object.keys(currMod.auto_production)[a]];
      }
    }
    storeItem('mods', mods);
    storeItem('globals', globals);
    // go to game.html
    location.href = "file:///home/me/Desktop/P5%20Offline/game/game.html";
  } catch (e) {
    errorElement.html("<b>Encountered an error while combining:<br>" + e + "</b>")
  }


}

function removeMod(val)
{
  let newVal = val-1;
  if(newVal < 0 || newVal >= mods.length) {
    errorElement.html("Index out of bounds.");
    return;
  }
  mods.splice(newVal, newVal+1);
  displayElements[newVal].remove();
  displayElements.splice(newVal, newVal+1);
  homeScreenButton.attribute('disabled', ' ');
  homeScreenButton.html("Must clear storage before exiting.");
}

function draw() {
  if(mods.length <= 0) {
    removeModElement.attribute('disabled', '');
    removeModInput.attribute('disabled', '');
  }
  else {
    removeModElement.removeAttribute('disabled');
    removeModInput.removeAttribute('disabled');
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
