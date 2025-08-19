// OSRS Achievement Diaries Database
// Complete achievement diary data for all regions

class DiaryTask {
    constructor(description, guide = "") {
        this.description = description;
        this.guide = guide;
        this.completed = false;
    }
}

class DiaryDifficulty {
    constructor(data) {
        this.difficulty = data.difficulty;
        this.description = data.description;
        this.requirements = data.requirements || [];
        this.tasks = data.tasks ? data.tasks.map(task => 
            typeof task === 'string' ? new DiaryTask(task) : new DiaryTask(task.description, task.guide)
        ) : [];
        this.rewards = data.rewards || [];
        this.total_tasks = this.tasks.length;
        this.completed_tasks = 0;
    }

    getCompletionPercentage() {
        return this.total_tasks > 0 ? Math.round((this.completed_tasks / this.total_tasks) * 100) : 0;
    }

    isCompleted() {
        return this.completed_tasks === this.total_tasks;
    }
}

class AchievementDiary {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.region = data.region;
        this.difficulties = {};
        
        // Initialize difficulty levels
        if (data.easy) this.difficulties.easy = new DiaryDifficulty({...data.easy, difficulty: 'Easy'});
        if (data.medium) this.difficulties.medium = new DiaryDifficulty({...data.medium, difficulty: 'Medium'});
        if (data.hard) this.difficulties.hard = new DiaryDifficulty({...data.hard, difficulty: 'Hard'});
        if (data.elite) this.difficulties.elite = new DiaryDifficulty({...data.elite, difficulty: 'Elite'});
    }

    getDifficulties() {
        return Object.keys(this.difficulties);
    }

    getOverallCompletion() {
        const difficulties = Object.values(this.difficulties);
        if (difficulties.length === 0) return 0;
        
        const totalPercentage = difficulties.reduce((sum, diff) => sum + diff.getCompletionPercentage(), 0);
        return Math.round(totalPercentage / difficulties.length);
    }
}

// Complete Achievement Diaries Database
const DIARIES_DATABASE = {
    'ardougne': new AchievementDiary({
        id: 'ardougne',
        name: 'Ardougne Achievement Diary',
        description: 'Tasks around the Ardougne area, including both East and West Ardougne.',
        region: 'Kandarin',
        easy: {
            description: 'Beginner tasks around Ardougne',
            requirements: ['Combat level 40+', 'Various skill requirements'],
            tasks: [
                'Have Wizard Cromperty teleport you to the Essence Mine',
                'Sell silk to the Silk trader in East Ardougne',
                'Use the altar in East Ardougne\'s church',
                'Enter the Combat Training Camp north of West Ardougne',
                'Identify a Diseased sheep near Ardougne',
                'View Aleck\'s Hunter Emporium in Yanille',
                'Use the Ardougne wall-mounted glory',
                'Trade with Jiminua\'s Jungle Store northwest of Ardougne',
                'Buy an Asgarnian ale from The Flying Horse Inn',
                'Claim buckets of sand from Bert in Yanille',
                'Enter the Fishing Guild',
                'Steal from the bakery stall in East Ardougne',
                'Catch any fish in the Ardougne area and cook it there'
            ],
            rewards: ['Ardougne cloak 1', 'Kandarin headgear 1', 'Explorer\'s ring 1']
        },
        medium: {
            description: 'Intermediate tasks around Ardougne',
            requirements: ['Combat level 65+', 'Higher skill requirements'],
            tasks: [
                'Teleport to Ardougne using the spell',
                'Enter the Unicorn pen in Ardougne Zoo using Fairy rings',
                'Grapple over Yanille\'s south wall',
                'Harvest some strawberries from the Ardougne farming patch',
                'Cast the Ardougne Teleport spell',
                'Check the health of a palm tree in Lletya',
                'Trade with people in the Dorgesh-Kaan marketplace',
                'Pickpocket the master farmer north of Ardougne',
                'Travel from Ardougne to Karamja using the charter ship',
                'Use the Fishing Guild bank',
                'Visit Jiminua\'s Jungle Store by going through Crash Island',
                'Catch a red salamander',
                'Mine some coal near Ardougne'
            ],
            rewards: ['Ardougne cloak 2', 'Kandarin headgear 2', 'Explorer\'s ring 2', 'Ardougne teleport runes daily']
        },
        hard: {
            description: 'Challenging tasks around Ardougne',
            requirements: ['High combat level', 'Advanced skill requirements'],
            tasks: [
                'Enter the Magic Guild',
                'Steal from a chest in Ardougne Castle',
                'Attempt to steal from the paladin in Ardougne',
                'Pick some poison ivy berries from the patch south of Ardougne',
                'Recharge some jewellery at Totem Pole',
                'Create some bolts in the Fletching Guild',
                'Kill a Bloodveld in the Tower of Life',
                'Catch a Red chinchompa in the Feldip Hills',
                'Make a Rune crossbow in West Ardougne',
                'Pickpocket a Hero',
                'Make a pot using the pottery wheel and pottery oven in Barbarian Village',
                'Smith a Mithril platebody in West Ardougne',
                'Pray at the Altar in Sophanem'
            ],
            rewards: ['Ardougne cloak 3', 'Kandarin headgear 3', 'Explorer\'s ring 3', 'Extra Ardougne teleport runes']
        },
        elite: {
            description: 'Expert-level tasks around Ardougne',
            requirements: ['Very high combat and skill levels'],
            tasks: [
                'Catch a Manta ray in the Fishing Guild',
                'Attempt to pickpocket Ardougne knight and be stunned',
                'Make a rune dart in Ardougne',
                'Cast Ice Barrage on another player within Castle Wars',
                'Make an unstrung dragontooth necklace in Ardougne',
                'Pickpocket a Hero in East Ardougne',
                'Cast Monster Examine on a Tormented demon'
            ],
            rewards: ['Ardougne cloak 4', 'Kandarin headgear 4', 'Explorer\'s ring 4', 'Unlimited Ardougne teleports']
        }
    }),

    'varrock': new AchievementDiary({
        id: 'varrock',
        name: 'Varrock Achievement Diary',
        description: 'Tasks in and around the great city of Varrock.',
        region: 'Misthalin',
        easy: {
            description: 'Basic tasks around Varrock',
            requirements: ['Low level combat and skills'],
            tasks: [
                'Browse Thessalia\'s Makeovers',
                'Have Aubury teleport you to the Rune essence mine',
                'Mine some iron ore southeast of Varrock',
                'Make some normal planks at the Sawmill',
                'Enter the second level of the Stronghold of Security',
                'Jump over the fence south of Varrock',
                'Chop down a dying tree in the Lumber Yard',
                'Buy a newspaper',
                'Give a dog a bone in Varrock',
                'Spin a bowl on the pottery wheel in the Barbarian Village',
                'Speak to Haig Halen after obtaining 153+ Kudos',
                'Craft some air runes',
                'Get a Slayer task from Vannaka'
            ],
            rewards: ['Varrock armour 1', '150 Antique lamp (any skill level 30+)']
        },
        medium: {
            description: 'Moderate tasks around Varrock',
            requirements: ['Medium level combat and skills'],
            tasks: [
                'Have the Apothecary in Varrock make you a Strength potion',
                'Enter the Champions\' Guild',
                'Select the "Fancy" option when buying from any shop in Varrock',
                'Perform the "Bow" emote in the Varrock Museum',
                'Visit Horvik the Armourer',
                'Craft an Earth tiara',
                'Make a Varrock teleport tablet',
                'Get a slayer task from Vannaka',
                'Make 20 mahogany planks in one go',
                'Pick some Limpwurt root from the patch in Varrock',
                'Enter the Varrock Sewers',
                'Buy some barley from Wyson the Gardener',
                'Speak to the Apothecary about the barbarian herblore training'
            ],
            rewards: ['Varrock armour 2', '250 Antique lamp (any skill level 40+)', 'Varrock teleport to Grand Exchange']
        },
        hard: {
            description: 'Difficult tasks around Varrock',
            requirements: ['High level combat and skills'],
            tasks: [
                'Trade furs from Fancy Dress Shop owner in Varrock',
                'Make 20 Mahogany planks in one go',
                'Craft 100 Earth runes simultaneously',
                'Speak to Haig Halen after obtaining at least 153 Kudos',
                'Make a Super energy potion in the Barbarian Herblore',
                'Teleport to the Digsite using a Digsite pendant',
                'Cast the Varrock Teleport spell',
                'Use the balloon to travel from Varrock to Entrana',
                'Create a Superglass Make tablet',
                'Craft 56 Cosmic runes simultaneously',
                'Squeeze through the obstacle pipe in Edgeville dungeon',
                'Pick some cadava berries near Varrock'
            ],
            rewards: ['Varrock armour 3', '500 Antique lamp (any skill level 50+)', 'Additional daily battlestaves from Zaff']
        },
        elite: {
            description: 'Master-level tasks around Varrock',
            requirements: ['Very high combat and skill levels'],
            tasks: [
                'Craft 252 Air runes simultaneously',
                'Create a Varrock teleport tablet on the lectern in your house',
                'Use Lunar magic to make some Superglass make',
                'Smith and fletch 10 Rune darts within Varrock',
                'Speak to Orlando Smith when you have achieved 153 Kudos'
            ],
            rewards: ['Varrock armour 4', '750 Antique lamp (any skill level 70+)', 'Noted battlestaves from Zaff daily']
        }
    }),

    'lumbridge': new AchievementDiary({
        id: 'lumbridge',
        name: 'Lumbridge & Draynor Achievement Diary',
        description: 'Tasks around the starting areas of Lumbridge and Draynor Village.',
        region: 'Misthalin',
        easy: {
            description: 'Beginner tasks in the starting areas',
            requirements: ['Very low requirements - good for new players'],
            tasks: [
                'Complete the Lumbridge/Draynor Tutorial',
                'Get a Slayer task from Turael in Burthorpe',
                'Catch some Anchovies in Al Kharid',
                'Bake some bread on the Lumbridge kitchen range',
                'Mine some Clay from the Draynor clay rocks',
                'Craft some water runes',
                'Chop and burn some oak logs in Draynor',
                'Obtain some wool and take it to the Lumbridge spinning wheel',
                'Craft a basket',
                'Kill a zombie in the Draynor Sewers',
                'Catch some Anchovies in Draynor',
                'Talk to the Doomsayer to toggle your warnings',
                'Get some grain from the wheat field near Draynor Manor',
                'Enter H.A.M. Hideout'
            ],
            rewards: ['Explorer\'s ring 1', 'Draynor Village Teleport spell', 'Antique lamp worth 2,500 XP']
        },
        medium: {
            description: 'Intermediate tasks in Lumbridge and Draynor',
            requirements: ['Moderate skill levels'],
            tasks: [
                'Grapple across the River Lum',
                'Craft a Coif in the Lumbridge cow pen',
                'Get a Slayer assignment from Chaeldar',
                'Catch some salmon in Lumbridge',
                'Chop some willow logs in Draynor Village',
                'Craft a basket',
                'Catch some anchovies in Draynor Village',
                'Pickpocket a HAM member',
                'Craft a water tiara',
                'Cast Wind strike on a chicken',
                'Complete a lap of the Draynor Village agility course',
                'Upgrade the Device to a higher tier',
                'Purchase some barley from the farmer'
            ],
            rewards: ['Explorer\'s ring 2', 'Falador Teleport spell', 'Antique lamp worth 7,500 XP']
        },
        hard: {
            description: 'Advanced tasks in Lumbridge and Draynor',
            requirements: ['High skill requirements'],
            tasks: [
                'Cast the Lumbridge Home Teleport spell',
                'Pickpocket Martin the Master Gardener',
                'Craft 56 cosmic runes from the Zanaris altar',
                'Travel to Entrana via hot air balloon',
                'Catch a Salmon and cook it in Lumbridge',
                'Chop some Magic logs south of the Ranging Guild',
                'String a yew longbow in the Lumbridge General Store',
                'Craft 140 Mind runes simultaneously',
                'Fill a bucket from the Lumbridge Castle well',
                'Craft an unstrung onyx amulet in a Lumbridge furnace',
                'Purchase some battlestaves from Naff',
                'Slay a Cave Horror',
                'Complete a Temple Trekking path and bury the resulting bones using a certain spell'
            ],
            rewards: ['Explorer\'s ring 3', 'Cabbage-port spell', 'Antique lamp worth 15,000 XP']
        },
        elite: {
            description: 'Master-level tasks in Lumbridge and Draynor',
            requirements: ['Very high skill levels'],
            tasks: [
                'Craft 252 air runes simultaneously',
                'Pick some Limpwurt root from Draynor Manor',
                'Craft, string, and enchant an onyx amulet in Lumbridge',
                'Cast Fertile Soil in the Lumbridge wheat field',
                'Speak with Estate Agent while wearing a full Rogue outfit'
            ],
            rewards: ['Explorer\'s ring 4', 'High Alchemy spell unlimited casts per day', 'Antique lamp worth 50,000 XP']
        }
    }),

    'falador': new AchievementDiary({
        id: 'falador',
        name: 'Falador Achievement Diary',
        description: 'Tasks in and around the white city of Falador.',
        region: 'Asgarnia',
        easy: {
            description: 'Basic tasks around Falador',
            requirements: ['Low level requirements'],
            tasks: [
                'Fill and drink from the Dwarven Rock Cake',
                'Discover how to change to Zamorak robes',
                'Find out what your family crest is from Sir Renitee',
                'Kill a duck in Falador Park',
                'Get a haircut from the Falador hairdresser',
                'Fill a bucket from the pump north of Falador West Bank',
                'Climb over the western Falador wall',
                'Browse Sarah\'s Farming Shop',
                'Browse Cassie\'s Shield Shop',
                'Have the make-over mage change your gender',
                'Mine some tin or copper ore near Falador',
                'Enter the Crafting Guild',
                'Make some mind runes'
            ],
            rewards: ['Falador shield 1', 'Explorer\'s ring 1']
        },
        medium: {
            description: 'Moderate tasks around Falador',
            requirements: ['Medium skill levels'],
            tasks: [
                'Grapple up and then jump off the north Falador wall',
                'Pray at the Altar of Guthix in Taverley',
                'Buy a white 2h sword from Sir Vyvin',
                'Climb the wall into Taverley',
                'Get a slayer task from Vannaka',
                'Enter the Mining Guild',
                'Use the Falador Party Room',
                'Use the balloon to travel to the Crafting Guild',
                'Kill a Mogre',
                'Get a pet fish from Harry in Falador',
                'Change your family crest to the Saradomin symbol',
                'Teleport to Falador',
                'Mine some gold ore underneath Falador'
            ],
            rewards: ['Falador shield 2', 'Explorer\'s ring 2', 'Mole locator']
        },
        hard: {
            description: 'Difficult tasks around Falador',
            requirements: ['High skill levels'],
            tasks: [
                'Craft 54 cosmic runes from the Zanaris altar',
                'Change your family crest to the Arrav crest',
                'Kill the Giant Mole beneath Falador Park',
                'Use a Dwarf Cannon to help kill an enemy',
                'Temple Trekking: Complete a hard path',
                'Prayer: Recharge your prayer at the Port Sarim church altar',
                'Enter the Warriors\' Guild',
                'Mine some adamantite ore',
                'Smith a steel med helm in the Falador furnace',
                'Perform the Skill Cape emote in the Falador Party Room',
                'Kill a Skeletal Wyvern in the Asgarnian Ice Caves',
                'Craft multiple cosmic runes from a single essence',
                'Enter the Mining Guild resource area'
            ],
            rewards: ['Falador shield 3', 'Explorer\'s ring 3', 'Shortcut to Giant Mole lair']
        },
        elite: {
            description: 'Master-level tasks around Falador',
            requirements: ['Very high skill levels'],
            tasks: [
                'Perform a successful prayer flick',
                'Create a Wicked hood teleport to the Falador farm',
                'Smith an adamant platebody in the Falador furnace',
                'Perform the Quest point cape emote in the Falador Party Room',
                'Kill the Giant Mole 1000 times'
            ],
            rewards: ['Falador shield 4', 'Explorer\'s ring 4', 'Enhanced Giant Mole rewards']
        }
    }),

    'karamja': new AchievementDiary({
        id: 'karamja',
        name: 'Karamja Achievement Diary',
        description: 'Tasks on the tropical island of Karamja.',
        region: 'Karamja',
        easy: {
            description: 'Basic island tasks',
            requirements: ['Low levels, access to Karamja'],
            tasks: [
                'Cook a shrimp on Karamja',
                'Fill a vial of water from the source on Karamja',
                'Collect 5 seaweed from the Karamja shoreline',
                'Mine some gold from the rocks on Karamja',
                'Travel to Port Sarim via the dock',
                'Travel to Ardougne via the port',
                'Explore Cairn Isle to the west of Karamja',
                'Use the rope swing to travel to the moss giant island',
                'Mine some gems in Shilo Village',
                'Cut a pineapple near Brimhaven',
                'Travel to the Kharazi Jungle',
                'Cross the lava using the stepping stones',
                'Climb down into Brimhaven Dungeon'
            ],
            rewards: ['Karamja gloves 1', 'Karamja Volcano teleport']
        },
        medium: {
            description: 'Moderate tropical tasks',
            requirements: ['Medium levels, some quest requirements'],
            tasks: [
                'Claim a ticket from the Agility arena in Brimhaven',
                'Discover hidden wall in the Brimhaven Dungeon',
                'Visit the nature altar via the Abyss',
                'Successfully cook 5 pieces of raw karambwan',
                'Trap a Horned graahk',
                'Chop a teak log',
                'Chop a mahogany log',
                'Catch a karambwan using a karambwan vessel',
                'Exchange gems for a machete',
                'Use Vigroy and Hajedy\'s cart service',
                'Achieve 100% favour in Tai Bwo Wannai Cleanup',
                'Cook something on the Karamja volcano',
                'Enter the Kharazi Jungle',
                'Eat an oomlie wrap'
            ],
            rewards: ['Karamja gloves 2', 'Access to Karamja gloves shop', 'Free usage of Brimhaven Agility Arena']
        },
        hard: {
            description: 'Challenging jungle tasks',
            requirements: ['High levels, completed quests'],
            tasks: [
                'Become the owner of a Fruit tree patch',
                'Use the gnome glider to travel to Karamja',
                'Craft some nature runes',
                'Cook a karambwan thoroughly',
                'Kill a metal dragon in Brimhaven Dungeon',
                'Eat an oomlie wrap',
                'Make an antivenom+ potion in Barbarian Herblore',
                'Chop a mahogany log from your planted tree',
                'Kill a Ket-Zek in the Fight Caves',
                'Craft multiple nature runes from a single essence',
                'Kill the Kalphite Queen',
                'Complete a lap of the Brimhaven Agility Arena in 2:40',
                'Equip a fire cape or infernal cape in the TzHaar city'
            ],
            rewards: ['Karamja gloves 3', 'Underground access to red dragons', 'Access to gem cave']
        },
        elite: {
            description: 'Master-level jungle expertise',
            requirements: ['Very high levels, multiple quest completions'],
            tasks: [
                'Craft 56 nature runes at once',
                'Check the health of a palm tree on Karamja',
                'Complete the Elite Clue Scroll obtained from Duradel',
                'Equip an infernal cape in the city of TzHaar'
            ],
            rewards: ['Karamja gloves 4', 'Red dragon shortcuts', 'Increased gem mining']
        }
    }),

    'morytania': new AchievementDiary({
        id: 'morytania',
        name: 'Morytania Achievement Diary',
        description: 'Tasks in the dark, swampy region of Morytania.',
        region: 'Morytania',
        easy: {
            description: 'Basic tasks in the haunted lands',
            requirements: ['Access to Morytania, Priest in Peril completed'],
            tasks: [
                'Cook a thin snail on the Port Phasmatys range',
                'Get a slayer task from Mazchna',
                'Kill a banshee in the Slayer Tower',
                'Have Sbott tan some cowhide for you',
                'Enter the Haunted Mine',
                'Kill a ghoul',
                'Enter Mort Myre Swamp',
                'Kill a werewolf in human form',
                'Enter the Abandoned Mine',
                'Place an item in the Ectofuntus',
                'Travel from Morytania to Port Sarim',
                'Cast a combat spell in the Duel Arena',
                'Travel to Canifis'
            ],
            rewards: ['Morytania legs 1', 'Ectophial for Ectofuntus teleports']
        },
        medium: {
            description: 'Moderate tasks in Morytania',
            requirements: ['Medium levels, some quest progress'],
            tasks: [
                'Complete a lap of the Canifis Agility course',
                'Obtain some bark from a Hollow tree',
                'Kill a fever spider on Braindeath Island',
                'Make a batch of cannonballs at Port Phasmatys',
                'Kill a Banshee in the Slayer Tower',
                'Complete a Temple Trekking path',
                'Kill a Terror bird',
                'Complete the Haunted Mine',
                'Take a shortcut across the Mort Myre Swamp',
                'Board the Swamp Boaty',
                'Make some Pineapple pizza',
                'Fill the Druid pouch with produce from the Nature Grotto',
                'Pray at the Nature Grotto with at least 50 Prayer points'
            ],
            rewards: ['Morytania legs 2', 'Robin hood hat from Temple Trekking', 'Increased Temple Trekking rewards']
        },
        hard: {
            description: 'Difficult tasks in the dark lands',
            requirements: ['High levels, advanced quests'],
            tasks: [
                'Climb the advanced spike chain in Slayer Tower',
                'Create a batch of super compost in the Ectofuntus',
                'Kill an Abyssal demon in the Slayer Tower',
                'Complete a hard Temple Trekking route',
                'Harvest some watermelons from the Canifis allotment',
                'Chop and burn some mahogany logs',
                'Catch a swamp lizard',
                'Complete Barbarian Herblore training',
                'Kill a cave horror',
                'Harvest some bittercap mushrooms from the log',
                'Pray at the Ectofuntus with a full Prayer',
                'Use the shortcut to get to the Cosmic Altar',
                'Mix a super restore potion in the Ectofuntus'
            ],
            rewards: ['Morytania legs 3', 'Extra runes from Runecrafting in Morytania', 'Increased Barrows rewards']
        },
        elite: {
            description: 'Master-level dark arts',
            requirements: ['Very high levels, completed major quests'],
            tasks: [
                'Craft 252 or more blood runes simultaneously',
                'Cremate some fiyr remains',
                'Loot 100 or more Barrows chests',
                'Complete a hard Treasure Trail clue in Morytania'
            ],
            rewards: ['Morytania legs 4', 'Unlimited Ectophial teleports', 'Improved Barrows rewards']
        }
    }),

    'desert': new AchievementDiary({
        id: 'desert',
        name: 'Desert Achievement Diary',
        description: 'Tasks in the harsh Kharidian Desert.',
        region: 'Kharidian Desert',
        easy: {
            description: 'Basic survival in the desert',
            requirements: ['Access to desert areas'],
            tasks: [
                'Catch a Golden warbler',
                'Mine some clay in the north-eastern desert',
                'Enter the Kalphite hive',
                'Enter Al Kharid via the gate',
                'Buy some Waterskins from Shantay',
                'Collect some cacti spine',
                'Cut down a cactus',
                'Travel to the Bedabin Camp',
                'Open the sarcophagus in the first room of Pyramid Plunder',
                'Visit the Genie',
                'Mine some sandstone',
                'Catch an Orange salamander',
                'Cross the Shantay Pass'
            ],
            rewards: ['Desert amulet 1', 'Nardah Teleport spell', 'Antique lamp worth 2,500 XP']
        },
        medium: {
            description: 'Moderate desert exploration',
            requirements: ['Medium levels, some quest progress'],
            tasks: [
                'Pray at the Elidinis Statuette in Nardah',
                'Mine some Gold ore north of Nardah',
                'Complete a lap of the Agility Pyramid',
                'Slay a Desert lizard',
                'Catch a Red salamander',
                'Visit every camp in the desert',
                'Activate Ancient Magicks',
                'Travel to the desert on a magic carpet',
                'Create a Combat potion in Barbarian herblore',
                'Visit the ruins of Ullek',
                'Kill a Locust rider',
                'Steal a Phoenix feather',
                'Open the Grand Gold Chest in Pyramid Plunder'
            ],
            rewards: ['Desert amulet 2', 'Kalphite teleport', 'Antique lamp worth 7,500 XP']
        },
        hard: {
            description: 'Advanced desert challenges',
            requirements: ['High levels, completed quests'],
            tasks: [
                'Refill your waterskins at the Nardah shrine',
                'Burn some yew logs on the Nardah Mayor\'s balcony',
                'Complete a Pyramid Plunder session',
                'Travel from Nardah to the Kalphite lair',
                'Slay a Dust devil with a Slayer task',
                'Kill the Kalphite Queen',
                'Activate preserve prayers using the Nardah shrine',
                'Complete the Tourist Trap quest',
                'Steal from the Grand Gold Chest in Pyramid Plunder',
                'Create a Super restore in Nardah',
                'Restore at least 85 Prayer points at the Nardah shrine',
                'Knock out and pickpocket a Menaphite Thug',
                'Fletch some dragon darts at the Nardah bank'
            ],
            rewards: ['Desert amulet 3', 'Kalphite Queen teleport', 'Antique lamp worth 15,000 XP']
        },
        elite: {
            description: 'Master of the desert',
            requirements: ['Very high levels, major quest completions'],
            tasks: [
                'Steal from the Grand Gold Chest in Pyramid Plunder at 91+ Thieving',
                'Restore at least 85 Prayer points at Nardah\'s shrine',
                'Speak to the Sphinx with a cat speak amulet',
                'Cast Ice barrage against a foe in the desert'
            ],
            rewards: ['Desert amulet 4', 'Unlimited Nardah teleports', 'Antique lamp worth 50,000 XP']
        }
    }),

    'fremennik': new AchievementDiary({
        id: 'fremennik',
        name: 'Fremennik Achievement Diary',
        description: 'Tasks in the northern Fremennik lands.',
        region: 'Fremennik Province',
        easy: {
            description: 'Basic tasks in the northern lands',
            requirements: ['Access to Fremennik areas'],
            tasks: [
                'Catch a fish from the Fremennik dock',
                'Collect some snape grass on Waterbirth Island',
                'Kill 5 rock crabs',
                'Complete a lap of the Barbarian Agility course',
                'Make a barbarian herblore potion',
                'Enter your Player-owned house from Rellekka',
                'Change your boots at Yrsa\'s Shoe Store',
                'Have Peer the Seer tell you what your next level will be',
                'Take the ferry to Waterbirth Island',
                'Create an icon on Entrana',
                'Craft a tiara in Rellekka',
                'Kill a yak on Neitiznot',
                'View Jatix\'s Herblore Shop'
            ],
            rewards: ['Fremennik sea boots 1', 'Peer the Seer teleport']
        },
        medium: {
            description: 'Moderate northern challenges',
            requirements: ['Medium levels, some Fremennik quest progress'],
            tasks: [
                'Travel to Miscellania by boat',
                'Slay a Brine rat',
                'Catch and cook a salmon in Rellekka',
                'Steal from Keldagrim\'s gem stall',
                'Travel to the Lunar Isle',
                'Mine some sandstone in the Fremennik Province',
                'Travel to Waterbirth Island',
                'Complete a game of Barbarian Assault',
                'Equip a coif in the Fremennik Province',
                'Kill a Kurask in the Fremennik Slayer dungeon',
                'Mine some coal in Rellekka',
                'Travel using the Fairy ring system',
                'Slay a cave crawler in the Fremennik Slayer Dungeon'
            ],
            rewards: ['Fremennik sea boots 2', 'Access to the Rellekka portal']
        },
        hard: {
            description: 'Difficult northern trials',
            requirements: ['High levels, completed Fremennik quests'],
            tasks: [
                'Kill each of the Dagannoth Kings',
                'Complete a hard Barbarian Assault wave',
                'Kill a Kurask in the Fremennik Slayer Dungeon',
                'Mine some addy ore in Jatizso',
                'Create a lunar teleport tablet',
                'Mix a Barbarian herblore potion',
                'Kill a Spiritual mage on your Slayer task',
                'Tan a yak hide',
                'Kill the Giant Roc on Miscellania',
                'Complete the Fremennik Isles quest',
                'Craft some Astral runes on Lunar Isle',
                'Use Lunar magic to cure a diseased bush on Lunar Isle',
                'Kill a Troll on Death Plateau'
            ],
            rewards: ['Fremennik sea boots 3', 'Miscellania teleport', 'Noted drops from Dagannoth Kings']
        },
        elite: {
            description: 'Master of the Fremennik ways',
            requirements: ['Very high levels, all Fremennik quests'],
            tasks: [
                'Craft 252 astral runes in a single action',
                'Complete 100 laps of the Rellekka agility course',
                'Slay each of the Dagannoth Kings, obtaining each axe as a drop',
                'Kill the Dagannoth Mother in the lighthouse basement'
            ],
            rewards: ['Fremennik sea boots 4', 'Unlimited Rellekka teleports', 'Enhanced Dagannoth drops']
        }
    }),

    'wilderness': new AchievementDiary({
        id: 'wilderness',
        name: 'Wilderness Achievement Diary',
        description: 'Tasks in the dangerous Player vs Player Wilderness.',
        region: 'Wilderness',
        easy: {
            description: 'Basic wilderness survival',
            requirements: ['Willingness to enter dangerous PvP areas'],
            tasks: [
                'Enter the Wilderness',
                'Cast Lvl-1 Enchant in the Wilderness',
                'Enter the Chaos Temple',
                'Enter the Demonic Ruins',
                'Collect some wines of Zamorak',
                'Mine some rune essence in the Wilderness',
                'Enter the Dark Warriors\' Fortress',
                'Enter the Wilderness Volcano',
                'Enter the Wilderness God Wars Dungeon',
                'Kill an Earth Warrior',
                'Kill a Mammoth',
                'Visit the Chaos Altar',
                'Take some cursed energy'
            ],
            rewards: ['Wilderness sword 1', 'Wilderness teleport locations']
        },
        medium: {
            description: 'Moderate wilderness challenges',
            requirements: ['Medium combat level for wilderness survival'],
            tasks: [
                'Complete a lap of the Wilderness Agility course',
                'Enter the King Black Dragon\'s lair',
                'Teleport to Ardougne from level 30+ Wilderness',
                'Charge an earth orb',
                'Kill an Ankou in the Wilderness',
                'Catch some Dark crabs',
                'Kill a Green dragon',
                'Kill the Crazy archaeologist',
                'Enter the Resource Arena',
                'Pray at the Chaos altar',
                'Kill a player in the Wilderness',
                'Enter the Corporeal Beast\'s lair',
                'Smith a Gold bar at the Wilderness furnace'
            ],
            rewards: ['Wilderness sword 2', 'Increased wilderness obelisk teleport options']
        },
        hard: {
            description: 'High-risk wilderness activities',
            requirements: ['High combat level, wilderness survival skills'],
            tasks: [
                'Kill the Chaos Elemental',
                'Kill the King Black Dragon',
                'Charge all four types of orb in one trip',
                'Kill Callisto',
                'Kill Venenatis',
                'Kill Vet\'ion',
                'Complete a slayer task in the Wilderness',
                'Kill the Corporeal Beast',
                'Obtain a ecumenical key as a drop',
                'Kill another player in the deep Wilderness',
                'Fish some Raw lava eels',
                'Smith a runite bar in the Wilderness',
                'Runecraft some wrath runes'
            ],
            rewards: ['Wilderness sword 3', 'Faster wilderness obelisk charging']
        },
        elite: {
            description: 'Master of the wilderness',
            requirements: ['Very high combat level, extensive wilderness experience'],
            tasks: [
                'Kill all of the wilderness bosses at least once',
                'Complete 50 laps of the Wilderness Agility course',
                'Fish and cook 5 Dark crabs in the Resource Area',
                'Smith a runite bar in the Resource Area'
            ],
            rewards: ['Wilderness sword 4', 'Enhanced wilderness boss drops', 'Revenant cave improvements']
        }
    }),

    'western': new AchievementDiary({
        id: 'western',
        name: 'Western Provinces Achievement Diary',
        description: 'Tasks in the western areas including Gnome Stronghold.',
        region: 'Western Provinces',
        easy: {
            description: 'Basic western exploration',
            requirements: ['Access to western areas'],
            tasks: [
                'Complete a lap of the Gnome Stronghold Agility course',
                'Get a spirit tree planted',
                'Have Elkoy help you through the maze',
                'Receive a Slayer task from Nieve',
                'Kill a Terrorbird',
                'Catch a Feldip Weasel',
                'Travel to the Feldip Hills by Eagle',
                'Craft some Nature runes',
                'Check the health of a fruit tree',
                'Trap a Crimson Swift',
                'Fletch an oak shortbow in the Gnome Stronghold',
                'Kill a Jogre',
                'Mine some coal in the western provinces'
            ],
            rewards: ['Western banner 1', 'Gnome Stronghold teleport']
        },
        medium: {
            description: 'Moderate western challenges',
            requirements: ['Medium levels, some quest progress'],
            tasks: [
                'Travel to the Ape Atoll',
                'Grapple to Watchtower',
                'Complete a lap of the Ape Atoll Agility course',
                'Travel to Crash Island',
                'Catch a Red salamander',
                'Trap a Spined larupia',
                'Kill a Zygomite',
                'Complete the Grand Tree quest',
                'Obtain some Jangerberries',
                'Travel to Mos Le\'Harmless',
                'Kill a Monkey Archer',
                'Catch a Barb-tailed kebbit',
                'Kill an Ogre in the Combat Training Camp'
            ],
            rewards: ['Western banner 2', 'Ape Atoll teleport']
        },
        hard: {
            description: 'Difficult western tasks',
            requirements: ['High levels, completed western quests'],
            tasks: [
                'Complete the Monkey Madness quest',
                'Kill a Zulrah',
                'Complete Regicide',
                'Slay a spiritual warrior',
                'Catch a Dashing kebbit',
                'Complete a hard Barbarian Assault wave',
                'Fletch a magic longbow in the Gnome Stronghold',
                'Harvest some Poison ivy berries',
                'Kill Zulrah 50 times',
                'Kill a Tortured gorilla',
                'Get a Slayer task from Duradel',
                'Check a magic tree\'s health',
                'Kill the Thermonuclear smoke devil'
            ],
            rewards: ['Western banner 3', 'Zul-Andra teleport']
        },
        elite: {
            description: 'Master of the west',
            requirements: ['Very high levels, completed major western quests'],
            tasks: [
                'Fletch 250 dragon darts in the Myth\'s Guild',
                'Kill Zulrah 1000 times',
                'Complete Monkey Madness II',
                'Equip any piece of the Ancestral robes set'
            ],
            rewards: ['Western banner 4', 'Unlimited Zul-Andra teleports', 'Enhanced western drops']
        }
    })
};

// Helper functions
function getAllDiaries() {
    return Object.values(DIARIES_DATABASE);
}

function getDiaryById(id) {
    return DIARIES_DATABASE[id] || null;
}

function getDiariesByRegion(region) {
    return Object.values(DIARIES_DATABASE).filter(diary => diary.region === region);
}

function getDifficultiesByDiary(diaryId) {
    const diary = getDiaryById(diaryId);
    return diary ? diary.getDifficulties() : [];
}

function toggleTaskCompletion(diaryId, difficulty, taskIndex) {
    const diary = getDiaryById(diaryId);
    if (diary && diary.difficulties[difficulty] && diary.difficulties[difficulty].tasks[taskIndex]) {
        const task = diary.difficulties[difficulty].tasks[taskIndex];
        task.completed = !task.completed;
        
        // Update completion count
        const difficultyObj = diary.difficulties[difficulty];
        difficultyObj.completed_tasks = difficultyObj.tasks.filter(t => t.completed).length;
        
        // Save to localStorage
        saveDiaryProgress();
        return true;
    }
    return false;
}

function saveDiaryProgress() {
    const progressData = {};
    Object.keys(DIARIES_DATABASE).forEach(diaryId => {
        const diary = DIARIES_DATABASE[diaryId];
        progressData[diaryId] = {};
        
        Object.keys(diary.difficulties).forEach(diffKey => {
            const difficulty = diary.difficulties[diffKey];
            progressData[diaryId][diffKey] = {
                completed_tasks: difficulty.completed_tasks,
                tasks: difficulty.tasks.map(task => ({ completed: task.completed }))
            };
        });
    });
    
    localStorage.setItem('osrs-diary-progress', JSON.stringify(progressData));
}

function loadDiaryProgress() {
    const savedProgress = localStorage.getItem('osrs-diary-progress');
    if (savedProgress) {
        try {
            const progressData = JSON.parse(savedProgress);
            
            Object.keys(progressData).forEach(diaryId => {
                if (DIARIES_DATABASE[diaryId]) {
                    const diary = DIARIES_DATABASE[diaryId];
                    const savedDiary = progressData[diaryId];
                    
                    Object.keys(savedDiary).forEach(diffKey => {
                        if (diary.difficulties[diffKey] && savedDiary[diffKey]) {
                            const difficulty = diary.difficulties[diffKey];
                            const savedDiff = savedDiary[diffKey];
                            
                            difficulty.completed_tasks = savedDiff.completed_tasks || 0;
                            
                            if (savedDiff.tasks) {
                                savedDiff.tasks.forEach((savedTask, index) => {
                                    if (difficulty.tasks[index]) {
                                        difficulty.tasks[index].completed = savedTask.completed || false;
                                    }
                                });
                            }
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error loading diary progress:', error);
        }
    }
}

// Initialize progress loading
loadDiaryProgress();

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DIARIES_DATABASE,
        getAllDiaries,
        getDiaryById,
        getDiariesByRegion,
        toggleTaskCompletion,
        saveDiaryProgress,
        loadDiaryProgress
    };
}