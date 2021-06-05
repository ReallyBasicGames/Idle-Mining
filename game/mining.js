function gatherResource(resource)
{
  let addition = globals.clickMulti + round(Math.sqrt(globals.pickaxeLevel - globals.resources[resource].strength));
  globals.resources[resource].amount += globals.clickMulti;
  gainXP(globals.resources[resource].xp * globals.clickMulti + (globals.pickaxeLevel - globals.resources[resource].strength));
}

function miningButtonCreated(id) {
  miningButtonElements[miningButtonElements.length-1].mousePressed(() => {
    gatherResource(id);
  });
}

/*
This method is kinda confusing, so I will do my best to explain.
Simply what it does is disable / enable buttons if the player doesn't / does
have the resources to press it.
*/


function disableMiningButtons()
{
  // for each mining button
  for(var i = 0; i < miningButtonElements.length; i++)
  {

    //console.log(globals.resources[miningButtonElements[i].id()].strength + " vs. " + globals.miningStrength);
    if(globals.resources[miningButtonElements[i].id()].strength > globals.pickaxeLevel) {
      miningButtonElements[i].attribute('disabled', '');
      miningButtonElements[i].html("Increase pickaxe strength to mine this resource.");
    }
    else {
      miningButtonElements[i].removeAttribute('disabled');
      miningButtonElements[i].html(globals.resources[miningButtonElements[i].id()].displayName + " [+" + (globals.clickMulti + round(Math.sqrt(globals.pickaxeLevel - globals.resources[miningButtonElements[i].id()].strength))) + "]");
    }
  }
}
