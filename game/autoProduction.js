let autoProductionButtonElements = [];
let autoProductionHeaderCreated = false;

function autoProductionButtonUpdate()
{
  // create autoproduction building buttons
  for(var i = 0; i < Object.keys(globals.auto_production).length; i++){
    var found = false;
    if(!globals.auto_production[Object.keys(globals.auto_production)[i]].unlock.researched) continue;
    for(var j = 0; j < autoProductionButtonElements.length; j++)
    {
      if(Object.keys(globals.auto_production)[i] == autoProductionButtonElements[j].id()) {
        found = true;
        break;
      }
    }
    if(!found) {

      let newButtonEl = createButton(globals.auto_production[Object.keys(globals.auto_production)[i]].displayName);
      newButtonEl.id(Object.keys(globals.auto_production)[i]);
      newButtonEl.style('display', 'block');
      newButtonEl.class('MiningButton');
      autoProductionButtonElements.push(newButtonEl);
      if(autoProductionButtonElements.length > 0 && !autoProductionHeaderCreated) {
        let pHeader = createElement('a', "Auto-Production");
        pHeader.size(30);
        pHeader.parent('auto_production');
        autoProductionHeaderCreated = true;
      }
      newButtonEl.parent("auto_production");

      autoProductionButtonCreated(Object.keys(globals.auto_production)[i]);
    }
  }

  // update the text of the auto-production buttons
  for(var j = 0; j < autoProductionButtonElements.length; j++)
  {
    var stringToAdd = "";
    var element = autoProductionButtonElements[j];
    if(globals.auto_production[autoProductionButtonElements[j].id()].total == 1) stringToAdd += globals.auto_production[autoProductionButtonElements[j].id()].total + " " + globals.auto_production[autoProductionButtonElements[j].id()].displayName +" manufacturing: <ul>";
    else stringToAdd += globals.auto_production[autoProductionButtonElements[j].id()].total + " " + globals.auto_production[autoProductionButtonElements[j].id()].displayName +"s manufacturing: <ul>";
    let harvest = globals.auto_production[autoProductionButtonElements[j].id()].production;
    for(var c = 0; c < Object.keys(harvest).length; c++)
    {
      stringToAdd += "<li>";
      stringToAdd += (harvest[Object.keys(harvest)[c]] * globals.auto_production[autoProductionButtonElements[j].id()].total) + " ";
      stringToAdd += globals.resources[Object.keys(harvest)[c]].displayName;
      stringToAdd += "/sec</li>";
    }
    stringToAdd += "</ul>";
    stringToAdd += "Cost to build: <ul>";
    let cost = globals.auto_production[autoProductionButtonElements[j].id()].cost;
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


function disableAutoProductionButtons()
{

  let autoPBuildings = globals.auto_production;
  for(var b = 0; b < autoProductionButtonElements.length; b++)
  {
    let allRes = true;
    let apBldg = autoPBuildings[autoProductionButtonElements[b].id()];
    for(var i = 0; i < Object.keys(apBldg.cost).length; i++)
    {
      if(globals.resources[Object.keys(apBldg.cost)[i]].amount < apBldg.cost[Object.keys(apBldg.cost)[i]]) {
        allRes = false;
        autoProductionButtonElements[b].attribute('disabled', "");
        break;
      }
    }
    if(allRes) {
      autoProductionButtonElements[b].removeAttribute('disabled');
    }
  }
}

function autoProductionButtonCreated(id) {
  autoProductionButtonElements[autoProductionButtonElements.length-1].mousePressed(() => {
    buildAutoProduction(id);
  });
}

function buildAutoProduction(id){
  let autoProductionBuildings = globals.auto_production;
  let gAPC = autoProductionBuildings[id];
  // subtract auto-production cost
  for(var i = 0; i < Object.keys(gAPC.cost).length; i++)
  {
    globals.resources[Object.keys(gAPC.cost)[i]].amount -= gAPC.cost[Object.keys(gAPC.cost)[i]];
  }
  gAPC.total ++;
}


// loop through each auto-production and add the production accordingly
function autoProduceResources(){



  for(var i = 0; i < Object.keys(globals.auto_production).length; i++)
  {

    let currAutoProd = globals.auto_production[Object.keys(globals.auto_production)[i]];
    if(!currAutoProd.enabled || currAutoProd.total <= 0) continue;
    // check how many auto production buildings meet cost requirements
    var metCostReq = currAutoProd.total;
    for(var c = 0; c < Object.keys(currAutoProd.productionCost).length; c++) {
      var currRes = globals.resources[Object.keys(currAutoProd.productionCost)[c]].amount;
      if(round(currRes/currAutoProd.productionCost[Object.keys(currAutoProd.productionCost)[c]]) < metCostReq){
        metCostReq = round(currRes/currAutoProd.productionCost[Object.keys(currAutoProd.productionCost)[c]]);
      }
    }

    // add production
    for(var h = 0; h < Object.keys(currAutoProd.production).length; h++) {
      globals.resources[Object.keys(currAutoProd.production)[h]].amount += currAutoProd.production[Object.keys(currAutoProd.production)[h]] * metCostReq;
      gainXP(round(globals.resources[Object.keys(currAutoProd.production)[h]].xp*currAutoProd.production[Object.keys(currAutoProd.production)[h]] * metCostReq/4));
    }
    // subtract production costs
    for(var h = 0; h < Object.keys(currAutoProd.productionCost).length; h++) {
      globals.resources[Object.keys(currAutoProd.productionCost)[h]].amount -= currAutoProd.productionCost[Object.keys(currAutoProd.productionCost)[h]] * metCostReq;
    }

  }
}


let autoProductionResearchButtons = [];
function checkAutoProductionResearchReq(){
  let gAP = globals.auto_production;
  for(var i = 0; i < Object.keys(gAP).length; i++){
    found = false;
    for(var j = 0; j < autoProductionResearchButtons.length; j++){
      if(autoProductionResearchButtons[j].id() == Object.keys(gAP)[i]) {
        found = true;
        break;
      }
    }
    if(found) continue;
    //console.log(gRes);
    if(!gAP[Object.keys(gAP)[i]].unlock.researched){
      if(gAP[Object.keys(gAP)[i]].unlock.requiredLevel <= globals.Exp.Level){
        researchAutoProductionButtonCreated(Object.keys(gAP)[i]);
      }
    }
  }
  for(var i = 0; i < autoProductionResearchButtons.length; i++){
    if(globals.auto_production[autoProductionResearchButtons[i].id()].unlock.researchPoints > globals.Exp.ResearchPoints){
      autoProductionResearchButtons[i].attribute('disabled', '');
    }
    else autoProductionResearchButtons[i].removeAttribute('disabled');
  }
}
function researchAutoProductionButtonCreated(buttonIn){
  let gAP = globals.auto_production;
  let newAPResearchB = createButton(gAP[buttonIn].displayName + ". Hover for details. Unlock for " + gAP[buttonIn].unlock.researchPoints + " research points.");
  newAPResearchB.id(buttonIn);
  newAPResearchB.parent("researchPanel");
  newAPResearchB.attribute('title', gAP[buttonIn].discription);
  newAPResearchB.class("ResearchButton");
  autoProductionResearchButtons.push(newAPResearchB);
  newAPResearchB.mousePressed(() => {
    researchAutoProduction(newAPResearchB);
  });
}

function researchAutoProduction(inID)
{
  let buttonIn = inID;
  globals.Exp.ResearchPoints -= globals.auto_production[buttonIn.id()].unlock.researchPoints;
  globals.auto_production[buttonIn.id()].unlock.researched = true;
  buttonIn.remove();
  logMessage("Unlocked " + globals.auto_production[buttonIn.id()].displayName + "! Purchase this auto-production building under the auto-production panel!");
}
//
