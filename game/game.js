let lastTimeUpdated = 0;
let resourceDisplayElements = [];
let miningButtonElements = [];

function setup()
{
  if(getItem('globals')!= null) globals = getItem('globals');
  initExp();
  initMessages();
  logMessage("Welcome to Idle Mining!");
}

// used mostly as an update function
function draw()
{
  // if the display text hasn't been created and the player has that type of resource,
  // create the appropriate text element
  for(var i = 0; i < Object.keys(globals.resources).length; i++)
  {
    if(!globals.resources[Object.keys(globals.resources)[i]].unlock.researched) continue;
    var found = false;
    for(var j = 0; j < resourceDisplayElements.length; j++)
    {
      if(Object.keys(globals.resources)[i] == resourceDisplayElements[j].id()) {
        found = true;
        break;
      }
    }
    if(!found)
    {
      var newTextEl = createElement('a', globals.resources[Object.keys(globals.resources)[i]].displayName + ": " + globals.resources[Object.keys(globals.resources)[i]] + "<br>");
      newTextEl.parent("resources");
      newTextEl.id(Object.keys(globals.resources)[i]);
      newTextEl.class('standardText');
      resourceDisplayElements.push(newTextEl);
    }
  }

  // update the text of the resources
  for(var j = 0; j < resourceDisplayElements.length; j++)
  {
    var element = resourceDisplayElements[j];
    element.html(globals.resources[element.id()].displayName + ": " + globals.resources[element.id()].amount);
  }

  // if the button to gain a certain resource has not been created
  // and the resource is unlocked, create the button and display it
  for(var i = 0; i < Object.keys(globals.resources).length; i++)
  {
    if(!globals.resources[Object.keys(globals.resources)[i]].baseResource) continue;
    if(!globals.resources[Object.keys(globals.resources)[i]].unlock.researched) continue;
    var found = false;
    for(var j = 0; j < miningButtonElements.length; j++)
    {
      if(Object.keys(globals.resources)[i] == miningButtonElements[j].id()) {
        found = true;
        break;
      }
    }
    if(!found)
    {
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
function OneSecondUpdate()
{
  // fire slowly burns out
  if(globals.resources.fire.amount > 0) globals.resources.fire.amount --;
  lastTimeUpdated = millis();
  // collect resources every second.
  harvestResources();
  // transform resources
  autoProduceResources();
}

function disableButtons()
{
  disableMiningButtons();
  disableProductionButtons();
  disableHarvesterButtons();
  disableAutoProductionButtons();
}
