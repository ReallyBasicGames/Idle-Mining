let harvesterButtonElements = [];
let harvesterHeaderCreated = false;

function harvesterButtonUpdate()
{
  // create harvester building buttons
  for(var i = 0; i < Object.keys(globals.harvesters).length; i++){
    var found = false;
    if(!globals.harvesters[Object.keys(globals.harvesters)[i]].unlock.researched) continue;
    for(var j = 0; j < harvesterButtonElements.length; j++)
    {
      if(Object.keys(globals.harvesters)[i] == harvesterButtonElements[j].id()) {
        found = true;
        break;
      }
    }
    if(!found) {

      let newButtonEl = createButton(globals.harvesters[Object.keys(globals.harvesters)[i]].displayName);
      newButtonEl.id(Object.keys(globals.harvesters)[i]);
      newButtonEl.style('display', 'block');
      newButtonEl.class('MiningButton');
      harvesterButtonElements.push(newButtonEl);
      if(harvesterButtonElements.length > 0 && !harvesterHeaderCreated) {
        let pHeader = createElement('a', "Harvesters");
        pHeader.size(30);
        pHeader.parent('harvesters');
        harvesterHeaderCreated = true;
      }
      newButtonEl.parent("harvesters");

      harvesterButtonCreated(Object.keys(globals.harvesters)[i]);
    }
  }

  // update the text of the harvester buttons
  for(var j = 0; j < harvesterButtonElements.length; j++)
  {
    var stringToAdd = "";
    var element = harvesterButtonElements[j];
    if(globals.harvesters[harvesterButtonElements[j].id()].total == 1) stringToAdd += globals.harvesters[harvesterButtonElements[j].id()].total + " " + globals.harvesters[harvesterButtonElements[j].id()].displayName +" harvesting: <ul>";
    else stringToAdd += globals.harvesters[harvesterButtonElements[j].id()].total + " " + globals.harvesters[harvesterButtonElements[j].id()].displayName +"s harvesting: <ul>";
    let harvest = globals.harvesters[harvesterButtonElements[j].id()].production;
    for(var c = 0; c < Object.keys(harvest).length; c++)
    {
      stringToAdd += "<li>";
      stringToAdd += (harvest[Object.keys(harvest)[c]] * globals.harvesters[harvesterButtonElements[j].id()].total) + " ";
      stringToAdd += globals.resources[Object.keys(harvest)[c]].displayName;
      stringToAdd += "/sec</li>";
    }
    stringToAdd += "</ul>";
    stringToAdd += "Cost to build: <ul>";
    let cost = globals.harvesters[harvesterButtonElements[j].id()].cost;
    for(var c = 0; c < Object.keys(cost).length; c++)
    {
      stringToAdd += "<li>";
      stringToAdd += cost[Object.keys(cost)[c]] + " ";
      stringToAdd += globals.resources[Object.keys(cost)[c]].displayName;
      stringToAdd += "</li>";
    }
    stringToAdd += "</ul>";
    element.html(stringToAdd);
  }
}

function harvesterButtonCreated(id) {
  harvesterButtonElements[harvesterButtonElements.length-1].mousePressed(() => {
    buildHarvester(id);
  });
}


function buildHarvester(id){
  let harvesterBuildings = globals.harvesters;
  let gHC = harvesterBuildings[id];
  // subtract production cost
  for(var i = 0; i < Object.keys(gHC.cost).length; i++)
  {
    globals.resources[Object.keys(gHC.cost)[i]].amount -= gHC.cost[Object.keys(gHC.cost)[i]];
  }
  gHC.total ++;
}

// disable harvester buttons if the player doesn't have the resources
function disableHarvesterButtons()
{

  let harBuildings = globals.harvesters;
  for(var b = 0; b < harvesterButtonElements.length; b++)
  {
    let allRes = true;
    let harBldg = harBuildings[harvesterButtonElements[b].id()];
    for(var i = 0; i < Object.keys(harBldg.cost).length; i++)
    {
      if(globals.resources[Object.keys(harBldg.cost)[i]].amount < harBldg.cost[Object.keys(harBldg.cost)[i]]) {
        allRes = false;
        harvesterButtonElements[b].attribute('disabled', "");
        break;
      }
    }
    if(allRes) {
      harvesterButtonElements[b].removeAttribute('disabled');
    }
  }
}

// loop through each harvester and add the production accordingly
function harvestResources(){
  for(var i = 0; i < Object.keys(globals.harvesters).length; i++)
  {
    let currHarvester = globals.harvesters[Object.keys(globals.harvesters)[i]];
    if(currHarvester.total > 0){
      for(var h = 0; h < Object.keys(currHarvester.production).length; h++) {
        globals.resources[Object.keys(currHarvester.production)[h]].amount += currHarvester.production[Object.keys(currHarvester.production)[h]] * currHarvester.total;
        gainXP(round(globals.resources[Object.keys(currHarvester.production)[h]].xp*currHarvester.production[Object.keys(currHarvester.production)[h]] * currHarvester.total/4));
      }
    }
  }
}

let harvesterResearchButtons = [];
function checkHarvesterResearchReq(){
  let gHar = globals.harvesters;
  for(var i = 0; i < Object.keys(gHar).length; i++){
    found = false;
    for(var j = 0; j < harvesterResearchButtons.length; j++){
      if(harvesterResearchButtons[j].id() == Object.keys(gHar)[i]) {
        found = true;
        break;
      }
    }
    if(found) continue;
    //console.log(gRes);
    if(!gHar[Object.keys(gHar)[i]].unlock.researched){
      if(gHar[Object.keys(gHar)[i]].unlock.requiredLevel <= globals.Exp.Level){
        researchHarvesterButtonCreated(Object.keys(gHar)[i]);
      }
    }
  }
  for(var i = 0; i < harvesterResearchButtons.length; i++){
    if(globals.harvesters[harvesterResearchButtons[i].id()].unlock.researchPoints > globals.Exp.ResearchPoints){
      harvesterResearchButtons[i].attribute('disabled', '');
    }
    else harvesterResearchButtons[i].removeAttribute('disabled');
  }
}
function researchHarvesterButtonCreated(buttonIn){
  let gHar = globals.harvesters;
  let newHarResearchB = createButton(gHar[buttonIn].displayName + ". Hover for details. Unlock for " + gHar[buttonIn].unlock.researchPoints + " research points.");
  newHarResearchB.id(buttonIn);
  newHarResearchB.parent("researchPanel");
  newHarResearchB.class("ResearchButton");
  newHarResearchB.attribute('title', gHar[buttonIn].discription);
  harvesterResearchButtons.push(newHarResearchB);
  newHarResearchB.mousePressed(() => {
    researchHarvester(newHarResearchB);
  });
}

function researchHarvester(inID)
{
  let buttonIn = inID;
  globals.Exp.ResearchPoints -= globals.harvesters[buttonIn.id()].unlock.researchPoints;
  globals.harvesters[buttonIn.id()].unlock.researched = true;
  buttonIn.remove();
  logMessage("Unlocked " + globals.harvesters[buttonIn.id()].displayName + "! Purchase this harvester under the harvester panel!");
}
