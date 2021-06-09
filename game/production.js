let productionButtonElements = [];
let productionHeaderCreated = false;
function productionButtonUpdate()
{
  // create production building buttons
  for(var i = 0; i < Object.keys(globals.productionBuildings).length; i++){
    var found = false;
    if(!globals.productionBuildings[Object.keys(globals.productionBuildings)[i]].unlock.researched) continue;
    for(var j = 0; j < productionButtonElements.length; j++)
    {
      if(Object.keys(globals.productionBuildings)[i] == productionButtonElements[j].id()) {
        found = true;
        break;
      }
    }
    if(!found) {

      let newButtonEl = createButton(globals.productionBuildings[Object.keys(globals.productionBuildings)[i]].displayName);
      newButtonEl.id(Object.keys(globals.productionBuildings)[i]);
      newButtonEl.style('display', 'block');
      newButtonEl.class('MiningButton');
      productionButtonElements.push(newButtonEl);
      if(productionButtonElements.length > 0 && !productionHeaderCreated) {
        let pHeader = createElement('a', "Production");
        pHeader.size(30);
        pHeader.parent('production');
        productionHeaderCreated = true;
      }
      newButtonEl.parent("production");

      productionButtonCreated(Object.keys(globals.productionBuildings)[i]);
    }
  }

  if(Object.keys(globals.productionBuildings).length > 0) {
    // update the text of the auto-production buttons
    for(var j = 0; j < productionButtonElements.length; j++)
    {
      var stringToAdd = "";
      var element = productionButtonElements[j];
      stringToAdd += "<b>" + globals.productionBuildings[productionButtonElements[j].id()].displayName +"</b><br> Production: <ul>";
      let product = globals.productionBuildings[productionButtonElements[j].id()].production;
      for(var c = 0; c < Object.keys(product).length; c++)
      {
        stringToAdd += "<li>";
        stringToAdd += product[Object.keys(product)[c]] + " ";
        stringToAdd += globals.resources[Object.keys(product)[c]].displayName;
        stringToAdd += "</li>";
      }
      stringToAdd += "</ul>";
      stringToAdd += "Production Cost: <ul>";
      let cost = globals.productionBuildings[productionButtonElements[j].id()].productionCost;
      for(var c = 0; c < Object.keys(cost).length; c++)
      {
        stringToAdd += "<li>";
        stringToAdd += cost[Object.keys(cost)[c]] + " ";
        stringToAdd += globals.resources[Object.keys(cost)[c]].displayName;
        stringToAdd += "</li>";
      }
      stringToAdd += "</ul>";
      element.html(stringToAdd);
      element.attribute('title', globals.productionBuildings[productionButtonElements[j].id()].discription);
    }
  }
}

function produce(id) {
  let prodBuildings = globals.productionBuildings;
  if(Object.keys(globals.productionBuildings).length > 0) {
    let gPC = prodBuildings[id];
  }
  // subtract production cost
  for(var i = 0; i < Object.keys(gPC.productionCost).length; i++)
  {
    globals.resources[Object.keys(gPC.productionCost)[i]].amount -= gPC.productionCost[Object.keys(gPC.productionCost)[i]];
  }
  // add production
  for(var i = 0; i < Object.keys(gPC.production).length; i++)
  {
    gainXP(round(globals.resources[Object.keys(gPC.productionCost)[i]].xp * gPC.production[Object.keys(gPC.production)[i]] / 4));
    globals.resources[Object.keys(gPC.production)[i]].amount += gPC.production[Object.keys(gPC.production)[i]];
  }
}
function productionButtonCreated(id) {
  productionButtonElements[productionButtonElements.length-1].mousePressed(() => {
    produce(id);
  });
}

function disableProductionButtons()
{

  let prodBuildings = globals.productionBuildings;
  //console.log(prodBuildings);
  for(var b = 0; b < productionButtonElements.length; b++)
  {
    let allRes = true;
    let prodBldg = prodBuildings[productionButtonElements[b].id()];
    for(var i = 0; i < Object.keys(prodBldg.productionCost).length; i++)
    {
      if(globals.resources[Object.keys(prodBldg.productionCost)[i]].amount < prodBldg.productionCost[Object.keys(prodBldg.productionCost)[i]]) {
        allRes = false;
        productionButtonElements[b].attribute('disabled', "");
        break;
      }
    }
    if(allRes) {
      productionButtonElements[b].removeAttribute('disabled');
    }
  }
  //
  // // subtract production cost
}


let productionResearchButtons = [];
function checkProductionResearchReq(){
  let gProd = globals.productionBuildings;
  for(var i = 0; i < Object.keys(gProd).length; i++){
    // if the button doesn't exist
    found = false;
    for(var j = 0; j < productionResearchButtons.length; j++){
      if(productionResearchButtons[j].id() == Object.keys(gProd)[i]) {
        found = true;
        break;
      }
    }
    if(found) continue;

    if(!gProd[Object.keys(gProd)[i]].unlock.researched){
      if(gProd[Object.keys(gProd)[i]].unlock.requiredLevel <= globals.Exp.Level){
        researchProductionButtonCreated(Object.keys(gProd)[i]);
      }
    }
  }
  // disable buttons that are too expensive
  for(var i = 0; i < productionResearchButtons.length; i++){
    //console.log(globals.resources[productionResearchButtons[i].id()].unlock.researchPoints + " vs " + globals.Exp.ResearchPoints);
    if(globals.productionBuildings[productionResearchButtons[i].id()].unlock.researchPoints > globals.Exp.ResearchPoints){
      productionResearchButtons[i].attribute('disabled', '');
    }
    else productionResearchButtons[i].removeAttribute('disabled');
  }
}
function researchProductionButtonCreated(buttonIn){
  let gProd = globals.productionBuildings;
  let newProdResearchB = createButton(gProd[buttonIn].displayName + " production building. Hover over button for details. Unlock for " + gProd[buttonIn].unlock.researchPoints + " research points.");
  newProdResearchB.id(buttonIn);
  newProdResearchB.attribute('title', gProd[buttonIn].discription);
  newProdResearchB.parent("researchPanel");
  newProdResearchB.class("ResearchButton");
  productionResearchButtons.push(newProdResearchB);
  newProdResearchB.mousePressed(() => {
    researchProduction(newProdResearchB);
  });
}

function researchProduction(inID)
{
  let buttonIn = inID;
  globals.Exp.ResearchPoints -= globals.productionBuildings[buttonIn.id()].unlock.researchPoints;
  globals.productionBuildings[buttonIn.id()].unlock.researched = true;
  buttonIn.remove();
  logMessage("Unlocked " + globals.productionBuildings[buttonIn.id()].displayName + "! Use this production building in the production section.");
  //productionResearchButtons.splice(inID, inID+1);
}
