function checkResearchRequirements(){

  checkResourceResearchReq();
  checkProductionResearchReq();
  checkHarvesterResearchReq();
  checkAutoProductionResearchReq();
  // unlocking the research panel
  if(globals.Exp.Level >= 3 || globals.researchUnlocked) {
    globals.researchUnlocked = true;
    document.getElementById("researchPanel").style.display = "block";
  } else {
    document.getElementById('researchPanel').style.display = 'none';
  }

  // check requirements for the click multiplier and pickaxe.
  // click multi
  if(globals.Exp.Level > (globals.clickMulti*5)/2 - 1)
  {
    if(clickMultiButton == null) upgradeClickMultiButton();
  }
  if(globals.Exp.ResearchPoints < round(pow(PI*globals.clickMulti, 2)/3) && clickMultiButton != null) clickMultiButton.attribute('disabled', '');
  else if (clickMultiButton != null)clickMultiButton.removeAttribute('disabled');

  // pickaxe mining strength
  if(globals.Exp.Level > (globals.pickaxeLevel*5)/3 + 3)
  {
    if(pickaxeStrengthButton == null) upgradePickaxeStrengthButton();
  }
  if(globals.Exp.ResearchPoints < round(pow(PI*globals.pickaxeLevel,2)/5 + 1) && pickaxeStrengthButton != null) pickaxeStrengthButton.attribute('disabled', '');
  else if (pickaxeStrengthButton != null)pickaxeStrengthButton.removeAttribute('disabled');

}

/*
CLICK AND MINING MULTIPLIERS

*/

let clickMultiButton;
let pickaxeStrengthButton;

function upgradeClickMultiButton(){
  clickMultiButton = createButton("Increase Click Multiplier. Requires " + round(pow(PI*globals.clickMulti, 2)/3) + " research points.");
  clickMultiButton.addClass("ResearchButton");
  clickMultiButton.mousePressed(upgradeClickMulti);
  clickMultiButton.parent("researchPanel");
}

function upgradeClickMulti(){
 clickMultiButton.remove();
 clickMultiButton = null;
 globals.Exp.ResearchPoints -= round(pow(PI*globals.clickMulti, 2)/3);
 globals.clickMulti ++;
 logMessage("Upgraded click multiplier to " + globals.clickMulti.toString());
}

function upgradePickaxeStrengthButton(){
  pickaxeStrengthButton = createButton("Increase Pickaxe Strength. Allows you to mine tougher materials. Requires " + round(pow(PI*globals.pickaxeLevel,2)/5 + 1) + " research points.");
  pickaxeStrengthButton.addClass("ResearchButton");
  pickaxeStrengthButton.mousePressed(upgradePickaxeStrength);
  pickaxeStrengthButton.parent("researchPanel");
}

function upgradePickaxeStrength(){
 pickaxeStrengthButton.remove();
 pickaxeStrengthButton = null;
 globals.Exp.ResearchPoints -= round(pow(PI*globals.pickaxeLevel,2)/5 + 1);
 globals.pickaxeLevel ++;
 logMessage("Upgraded pickaxe. Its current mining strength is " + globals.pickaxeLevel);
}

let resourceResearchButtons = [];
function checkResourceResearchReq(){
  let gRes = globals.resources;
  for(var i = 0; i < Object.keys(gRes).length; i++){
    found = false;
    for(var j = 0; j < resourceResearchButtons.length; j++){
      if(resourceResearchButtons[j].id() == Object.keys(gRes)[i]) {
        found = true;
        break;
      }
    }
    if(found) continue;
    //console.log(gRes);
    if(!gRes[Object.keys(gRes)[i]].unlock.researched){
      if(gRes[Object.keys(gRes)[i]].unlock.requiredLevel <= globals.Exp.Level){
        researchResourceButtonCreated(Object.keys(gRes)[i]);
      }
    }
  }
  for(var i = 0; i < resourceResearchButtons.length; i++){
    //console.log(globals.resources[resourceResearchButtons[i].id()].unlock.researchPoints + " vs " + globals.Exp.ResearchPoints);
    if(globals.resources[resourceResearchButtons[i].id()].unlock.researchPoints > globals.Exp.ResearchPoints){
      resourceResearchButtons[i].attribute('disabled', '');
    }
    else resourceResearchButtons[i].removeAttribute('disabled');
  }
}
function researchResourceButtonCreated(buttonIn){
  let gRes = globals.resources;
  let newResResearchB = createButton(gRes[buttonIn].displayName + " resource. Unlock for " + gRes[buttonIn].unlock.researchPoints + " research points.");
  newResResearchB.id(buttonIn);
  newResResearchB.parent("researchPanel");
  newResResearchB.class("ResearchButton");
  resourceResearchButtons.push(newResResearchB);
  newResResearchB.mousePressed(() => {
    researchResource(newResResearchB);
  });
}

function researchResource(inID)
{
  let buttonIn = inID;
  globals.Exp.ResearchPoints -= globals.resources[buttonIn.id()].unlock.researchPoints;
  globals.resources[buttonIn.id()].unlock.researched = true;
  buttonIn.remove();
  logMessage("Unlocked " + globals.resources[buttonIn.id()].displayName + "! Mine this new material under the mining panel!");
  //resourceResearchButtons.splice(inID, inID+1);
}
