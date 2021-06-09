let defMod = {
  "modDetails": {
    "modName": "Default Mod",
    "modDiscription": "The default mod. Inlcludes 6 basic resources, as well as various production buildings, harvesters, and auto-production buildings.",
    "modAuthor": "Really Basic Games",
    "enabled": false,
    "dependencies": [null]
  },
  "resources": {
    "wood": {
      "displayName": "Wood",
      "amount": 0,
      "baseResource": true,
      "strength": 1,
      "xp": 1,
      "unlock": {
        "researchPoints": 0,
        "researched": true,
        "requiredLevel": 0
      }
    },
    "stone": {
      "displayName": "Stone",
      "amount": 0,
      "baseResource": true,
      "strength": 3,
      "xp": 3,
      "unlock": {
        "researchPoints": 2,
        "researched": true,
        "requiredLevel": 2
      }
    },
    "coal": {
      "displayName": "Coal",
      "amount": 0,
      "baseResource": true,
      "strength": 2,
      "xp": 3,
      "unlock": {
        "researchPoints": 2,
        "researched": false,
        "requiredLevel": 2
      }
    },
    "fire": {
      "xp": 1,
      "displayName": "Fire",
      "amount": 0,
      "baseResource": false,
      "unlock": {
        "researchPoints": 5,
        "researched": false,
        "requiredLevel": 2
      }
    },
    "iron_ore": {
      "displayName": "Iron Ore",
      "amount": 0,
      "baseResource": true,
      "strength": 5,
      "xp": 5,
      "unlock": {
        "researchPoints": 5,
        "researched": false,
        "requiredLevel": 5
      }
    },
    "iron_ingots": {
      "xp": 10,
      "displayName": "Iron Ingots",
      "amount": 0,
      "baseResource": false,
      "unlock": {
        "researchPoints": 10,
        "researched": false,
        "requiredLevel": 5
      }
    }
  },
  "productionBuildings": {
    "iron_smelter": {
      "displayName": "Iron Smelter",
      "discription": "Smelts iron ore into iron ingots.",
      "unlock": {
        "researchPoints": 25,
        "researched": false,
        "requiredLevel": 10
      },
      "cost": {
        "stone": 10,
        "wood": 10
      },
      "productionCost": {
        "iron_ore": 5,
        "coal": 1,
        "fire": 1
      },
      "total": 0,
      "production": {
        "iron_ingots": 1
      }
    },
    "iron_smelter_large": {
      "displayName": "Large Iron Smelter",
      "discription": "Smelts iron ore into iron ingots in large batches.",
      "unlock": {
        "researchPoints": 100,
        "researched": false,
        "requiredLevel": 20
      },
      "cost": {
        "stone": 10,
        "wood": 10
      },
      "productionCost": {
        "iron_ore": 50,
        "coal": 25,
        "fire": 25
      },
      "total": 0,
      "production": {
        "iron_ingots": 10
      }
    },
    "coal_furnace": {
      "displayName": "Coal Furnace",
      "discription": "Converts coal to large amounts of fire.",
      "unlock": {
        "researchPoints": 75,
        "researched": false,
        "requiredLevel": 10
      },
      "cost": {
        "wood": 150,
        "stone": 750,
        "iron_ingots": 150
      },
      "productionCost": {
        "coal": 10
      },
      "total": 0,
      "production": {
        "fire": 100
      }
    },
    "fire_pit": {
      "displayName": "Fire Pit",
      "discription": "Converts wood to fire.",
      "unlock": {
        "researchPoints": 20,
        "researched": false,
        "requiredLevel": 5
      },
      "cost": {
        "wood": 100,
        "stone": 100
      },
      "productionCost": {
        "wood": 10
      },
      "total": 0,
      "production": {
        "fire": 10
      }
    }
  },
  "harvesters": {
    "wood_harvester": {
      "displayName": "Wood Harvester",
      "discription": "Gathers wood automatically.",
      "unlock": {
        "researchPoints": 50,
        "researched": false,
        "requiredLevel": 20
      },
      "cost": {
        "wood": 50,
        "iron_ingots": 50,
        "coal": 10,
        "stone": 50
      },
      "productionCost": {
        "wood": 0
      },
      "total": 0,
      "production": {
        "wood": 1
      }
    },
    "wood_harvester_large": {
      "displayName": "Large Wood Harvester",
      "discription": "Gathers wood even faster.",
      "unlock": {
        "researchPoints": 250,
        "researched": false,
        "requiredLevel": 35
      },
      "cost": {
        "wood": 150,
        "iron_ingots": 300,
        "coal": 100,
        "stone": 250
      },
      "productionCost": {
        "wood": 0
      },
      "total": 0,
      "production": {
        "wood": 10
      }
    },
    "heavy_drill": {
      "displayName": "Heavy Drill",
      "discription": "Mines some resources automatically.",
      "unlock": {
        "researchPoints": 250,
        "researched": false,
        "requiredLevel": 45
      },
      "cost": {
        "wood": 100,
        "iron_ingots": 1000,
        "coal": 500,
        "stone": 1500
      },
      "productionCost": {
        "wood": 0
      },
      "total": 0,
      "production": {
        "stone": 10,
        "iron_ore": 3,
        "coal": 5
      }
    },
    "small_drill": {
      "displayName": "Small Drill",
      "discription": "Mines some resources automatically.",
      "unlock": {
        "researchPoints": 150,
        "researched": false,
        "requiredLevel": 30
      },
      "cost": {
        "wood": 100,
        "iron_ingots": 450,
        "coal": 250,
        "stone": 750
      },
      "productionCost": {
        "wood": 0
      },
      "total": 0,
      "production": {
        "stone": 5,
        "iron_ore": 1,
        "coal": 2
      }
    }
  },
  "auto_production": {
    "auto_smelter": {
      "enabled": true,
      "displayName": "Auto Smelter",
      "discription": "Converts iron ore to iron ingots.",
      "unlock": {
        "researchPoints": 500,
        "researched": false,
        "requiredLevel": 50
      },
      "cost": {
        "iron_ingots": 1000,
        "coal": 2500,
        "wood": 10000,
        "stone": 5000
      },
      "productionCost": {
        "iron_ore": 5,
        "coal": 1,
        "fire": 1
      },
      "total": 0,
      "production": {
        "iron_ingots": 1
      }
    },
    "auto_wood_furnace": {
      "enabled": true,
      "displayName": "Auto Wood Furnace",
      "discription": "Creates fire from wood.",
      "unlock": {
        "researchPoints": 350,
        "researched": false,
        "requiredLevel": 45
      },
      "cost": {
        "wood": 7500,
        "stone": 7500
      },
      "productionCost": {
        "wood": 10
      },
      "total": 0,
      "production": {
        "fire": 10
      }
    },
    "auto_coal_furnace": {
      "enabled": true,
      "displayName": "Auto Coal Furnace",
      "discription": "Creates larger amounts of fire from coal.",
      "unlock": {
        "researchPoints": 750,
        "researched": false,
        "requiredLevel": 75
      },
      "cost": {
        "wood": 7500,
        "stone": 7500,
        "coal": 2500,
        "iron_ingots": 1000
      },
      "productionCost": {
        "coal": 5
      },
      "total": 0,
      "production": {
        "fire": 100
      }
    }
  }
}
