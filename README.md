# slack-bot-carnage-among-the-stars

The bot for the slack to assist in 3:16 carnage among the stars rpg

Before you begin: in config.json insert you slack-bot token.

You can run bit with "node app.js"

##Commands

### Roll

    Rolls the dices
    Format is "roll [dice]"

    Where [dice] is a dice declaration, like d6, 10d10+18 or d1000+1000d6-18d8. Ex. roll 2d10

### Sarge

    Calls Sarge to make a random quote in order to motivate the troops.
    Format is "sarge".

    Sarge will use random quote from ./content/sarge.json, so you can write your one quotes.

### Create map

    Creates map for current channel.
    Format "create map"

    Map file will be created in /content/map
    If called subsequently, then map will be overriden to blank.

### Map

    Displays map for current channel.
    Format "map" or "map full"
    Short vesion will display alien ability "skill", number of alien tokens left for planet, alien tokens on close, near and far ranges.

    Long version will display short version and curent mission, planet description, alien description and special ability

    Short version:

    .-------------------.
    |        Map        |
    |-------------------|
    | Alien Skill  | 20 |
    | Alien Tokens | 10 |
    | Close        | 10 |
    | Near         | 10 |
    | Far          | 10 |
    '-------------------'

    Long version:
    .-------------------.
    |        Map        |
    |-------------------|
    | Alien Skill  | 20 |
    | Alien Tokens | 10 |
    | Close        | 10 |
    | Near         | 10 |
    | Far          | 10 |
    '-------------------'
    *Mission*
    mission description
    *Planet*
    planet description
    *Aliens*
    *Special ability*
    alien special ability description
    *Description*
    alient description

### Set map value

    Adjusts the map value for current channel.
    Format is "set map (planet|mission|aa description|a description|aa|at) [value]"

    where
        aa - alien ability skill target value
        at - alien threat tokens number
        planet - text for planet description
        mission - text for planet mission description
        aa description - alien ability description description, something like armored, invincible and other stuff.
        a description - alien description


        [value] - new value of property

### Add map value

    Adjusts the map value for current channel.
    Format is "map (aa|at) [positive or negative int]"
    Ex. "map c +2" or "map at -5"

    where
        aa - alien ability skill target value
        at - alien threat tokens number

        [value] - new value of property

### Move character to map range

    Moves character to specific range
    Format is "move (f|far|n|near|c|close) @username"
    Ex. "move c @arnoid"

### Create character

    Creates character profile.
    Format is "create @username"
    Ex. "create @arnoid"
    This will create character profile in /content/characters

### Create character

    Creates character profile.
    Format is "create @username"
    Ex. "create @arnoid"
    This will create character profile in /content/characters

### Character hitpoints

    Prints label with specified character hitpoints status
    Format "@username hp"

    Example output:
    .-------------------------.
    | hp | [#][#][#] | (3) OK |
    '-------------------------'

### Set character stat

    Sets character stat to given int value
    Format "@username set (fa|nfa|kills|hp|totalKills|rank) [value]"
    Ex. "@arnoid set kills 10"

### Add character stat

    Adjust character stat by given int value
    Format "@username (fa|nfa|kills|hp|totalKills|rank) [value]"
    Ex. "@arnoid kills +10" or "@arnoid kills -10"

### Character orders

    Prints character orders according to his rank
    Format "@username orders"

    Example output:
    .--------------------------------------------------------------.
    |                            Orders                            |
    |--------------------------------------------------------------|
    | Order 1 | Kill as many lifeforms as you can                  |
    | Order 2 | Maximize the kill ratio (bugs killed per Trooper). |
    | Order 3 | Follow directives issued by the Officers.          |
    | Order 4 | Protect your squad of Troopers (can use E-Vac).    |
    '--------------------------------------------------------------'

### Give character a flashback

    Gives specified character an unused flashback
    Format "@username add (weakness|strength)"
    Ex. "@arnoid add weakness" or "@arnoid add strength"

### Use character flashback

    Uses character flashback.
    Format "@username use (weakness|strength) [description of used flashback]"

### Print character stats

    Prints description of specified character
    Format "@usename (stat|stats) (full)"

    Ex. "@arnoid stat" or "@arnoid stats full"
    Short stat will print only items which are capable of killing stuff, while full stats will print complete items list

    Example output:
    Short stats
    .----------------------------------------------.
    | **HP**      |         3 | **FA**   |       3 |
    | **KILLS**   | 1/2       | **NFA**  |       0 |
    | Strength    | 0/0       | Weakness | 0/0     |
    | **Items**   | **close** | **near** | **far** |
    | [ ]E-CANNON | 0         | 2d10     | 0       |
    '----------------------------------------------'

    Full stats
    .--------------------------------------------------------.
    | **HP**          |         3 | **FA**       |         3 |
    | **KILLS**       | 1/2       | **NFA**      |         0 |
    | Strength        | 0/0       | Weakness     | 0/0       |
    | **Items**       | **close** | **near**     | **far**   |
    | [ ]E-CANNON     | 0         | 2d10         | 0         |
    | [ ]TRM          | -         | -            | -         |
    | [*]COMBAT DRUGS | -         | -            | -         |
    | **Strength**    | available | **Weakness** | available |
    | strength1       | false     | weakness1    | false     |
    | unknown         | true      | weakness2    | false     |
    | unknown         | true      |              |           |
    '--------------------------------------------------------'

### List items

    Prints the list of ALL possible items with basic damage profile stats.
    Format "(items|item) list"

    Example output:
    .----------------------------------------------------------.
    |                          Items                           |
    |----------------------------------------------------------|
    |                   | [*] | **Close** | **Near** | **Far** |
    |-------------------|-----|-----------|----------|---------|
    | CANCER STICKS     | [ ] | -         | -        | -       |
    | COMBAT DRUGS      | [*] | -         | -        | -       |
    | ENERGY RIFLE      | [ ] | 1         | d10      | 1       |
    | SLUG RIFLE        | [ ] | 1         | d6       | d6      |
    | HAND-TO-HAND      | [ ] | 1         | -        | -       |
    | POWERCLAW         | [ ] | d6        | -        | -       |
    '----------------------------------------------------------'

### List specific items details

    Prints stats and description for specific item from items list
    Format "item [item name]"
    Ex. "item HAND-TO-HAND". Item name can be lowercased.

    Example output:
    .----------------------------------.
    |           HAND-TO-HAND           |
    |----------------------------------|
    |       | *Close* | *Near* | *Far* |
    |-------|---------|--------|-------|
    | basic | 1       | -      | -     |
    | best  | d10     | -      | -     |
    '----------------------------------'
    *Can be upgraded*
    *Reusable*
    This covers attacks with fists, feet, knees, swords, axes, knives, broken bottles, tins of pre-processed food, garrottes, clubs, staves, empty or broken guns, wrenches and, of course, headbutts. You can always switch to Hand-To-Hand as a weapon even if you failed on your last turn. It's humanity's most basic weapon.

### Give character specific item

    Gives specific item to character. Items are in single instance with no duplicates allowed (for now).
    Format "@username give [item name]"
    Ex. "@arnoid give hand-to-hand"

### Removes specific item from character inventory

    Removes specific item to character.
    Format "@username remove [item name]"
    Ex. "@arnoid remove hand-to-hand"
