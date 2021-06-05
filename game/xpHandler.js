let xpElement;

function initExp()
{
  if(xpElement == null)
  {
    xpElement = createElement('a', 'XP');
    xpElement.parent('xpPanel');
    xpElement.class('standardText');
  }
  displayXP();
}

function gainXP(xp)
{
  globals.Exp.Curr_XP += xp;
  checkLevelUp();
  displayXP();
}

function displayXP()
{
  if(xpElement!=null)xpElement.html('Experience: ' + globals.Exp.Curr_XP.toString() + " / " + globals.Exp.XP_Level_Up.toString() + "<br>Current Level: " + globals.Exp.Level.toString() + "<br><b>Research Points: " + globals.Exp.ResearchPoints + "</b>");
  else initExp();
}

function checkLevelUp()
{
  if(globals.Exp.Curr_XP >= globals.Exp.XP_Level_Up)
  {
    globals.Exp.Curr_XP -= globals.Exp.XP_Level_Up;
    globals.Exp.XP_Level_Up += 5*globals.Exp.Level + 5;
    let rpGained = globals.Exp.Level;
    globals.Exp.ResearchPoints += rpGained;
    globals.Exp.Level ++;
    if(globals.Exp.Level >= 3)logMessage("Leveled Up! Gained " + rpGained.toString() + " research points!  Check the Research Panel to see if you unlocked anything!");
    else logMessage("Leveled Up! Gained " + rpGained.toString() + " research points!");
  }
  displayXP();
}
