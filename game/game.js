let lastTimeUpdated = 0;
let resourceDisplayElements = [];
let miningButtonElements = [];

let desktop = false;
let saveSeconds = 0;

function setup() {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    desktop = true;
    document.getElementById("gameTitle").innerHTML = "IDLE MINING DESKTOP V " + versionNum;
    document.getElementById("gameTitleTwo").innerHTML = "IDLE MINING DESKTOP V " + versionNum;

  }
  else {
    document.getElementById("gameTitle").innerHTML = "IDLE MINING ONLINE V " + versionNum;
    document.getElementById("gameTitleTwo").innerHTML = "IDLE MINING ONLINE V " + versionNum;
  }


  if (getItem('globals') != null) globals = getItem('globals');
  else globals = defaultItems;
  initExp();
  initMessages();
  logMessage("Welcome to Idle Mining!");
}

// used mostly as an update function
function draw() {
  // if the display text hasn't been created and the player has that type of resource,
  // create the appropriate text element
  for (var i = 0; i < Object.keys(globals.resources).length; i++) {
    if (!globals.resources[Object.keys(globals.resources)[i]].unlock.researched) continue;
    var found = false;
    for (var j = 0; j < resourceDisplayElements.length; j++) {
      if (Object.keys(globals.resources)[i] == resourceDisplayElements[j].id()) {
        found = true;
        break;
      }
    }
    if (!found) {
      var newTextEl = createElement('a', globals.resources[Object.keys(globals.resources)[i]].displayName + ": " + globals.resources[Object.keys(globals.resources)[i]] + "<br>");
      newTextEl.parent("resources");
      newTextEl.id(Object.keys(globals.resources)[i]);
      newTextEl.class('standardText');
      resourceDisplayElements.push(newTextEl);
    }
  }

  // update the text of the resources
  for (var j = 0; j < resourceDisplayElements.length; j++) {
    var element = resourceDisplayElements[j];
    element.html(globals.resources[element.id()].displayName + ": " + globals.resources[element.id()].amount);
  }

  // if the button to gain a certain resource has not been created
  // and the resource is unlocked, create the button and display it
  for (var i = 0; i < Object.keys(globals.resources).length; i++) {
    if (!globals.resources[Object.keys(globals.resources)[i]].baseResource) continue;
    if (!globals.resources[Object.keys(globals.resources)[i]].unlock.researched) continue;
    var found = false;
    for (var j = 0; j < miningButtonElements.length; j++) {
      if (Object.keys(globals.resources)[i] == miningButtonElements[j].id()) {
        found = true;
        break;
      }
    }
    if (!found) {
      let newButtonEl = createButton(Object.keys(globals.resources)[i] + " [+" + globals.clickMulti + "]");
      newButtonEl.parent("mining");
      newButtonEl.id(Object.keys(globals.resources)[i]);
      newButtonEl.style('display', 'block');
      newButtonEl.class('MiningButton');
      miningButtonElements.push(newButtonEl);

      miningButtonCreated(Object.keys(globals.resources)[i]);
    }
  }

  // update the buttons
  productionButtonUpdate(); // located in production.js
  harvesterButtonUpdate(); // located in harvesters.js
  autoProductionButtonUpdate(); // located in autoProduction.js
  checkResearchRequirements();

  // disable the buttons if lacking resources
  disableButtons(); // this is in gatherResources.js

  // see below
  if (millis() - lastTimeUpdated > 1000) OneSecondUpdate();

  // hopefully you figured out these methods are in xpHandler
  displayXP();
  checkLevelUp();
}

// this method runs every second
function OneSecondUpdate() {
  saveSeconds++;
  if (saveSeconds % 60 == 0) saveGame();
  // fire slowly burns out
  if (globals.resources.fire != null) if (globals.resources.fire.amount > 0) globals.resources.fire.amount--;
  lastTimeUpdated = millis();
  // collect resources every second.
  harvestResources();
  // transform resources
  autoProduceResources();

}

function disableButtons() {
  disableMiningButtons();
  disableProductionButtons();
  disableHarvesterButtons();
  disableAutoProductionButtons();
}

function goToMods() {
  storeItem('globals', globals);
  if(desktop)location.href = "file:///home/me/Desktop/P5%20Offline/game/importMod.html";
  else location.href = "importMod.html";
}

function saveGame() {
  storeItem('globals', globals);
  logMessage("Game saved! " + month() + "/" + day() + "/" + year() + " at " + hour() + ":" + minute() + ":" + second());
}
