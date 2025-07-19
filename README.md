# FUNKY PACK #
It's a personal project made for:
- Enhance my skills with frontend and game development
- Give to my characters of the Funky Pack series an interactive environment
- test my english skills with writing documentation and dialogs
- put this thing on my portfolio might be good, I don't know...

# Playtest

<a href = "https://lonlysoft.github.io/Funky_Pack" > here! </a> Please bear in mind that it's not done yet, but you can test the controls performance on mobile or PC. it's pretty important because I don't have a keyboard so I can't test it.

# what is it?
Funky Pack is a game inspired by farming simulators. We all have heard the story of a farming simulator before: <br>
"There's this guy whose life is not good in the city and then he goes to a farm." <br>
the only difference between a normal farming simulator and Funky Pack is that the guy here never goes to the farm. He needs to work on the city.<br>
The game takes place in American City. A city inspired by the american cartoon stereotype. <br>
the game follows a structure of a weekly schedule. Dynny builds that schedule based on his jobs.

Full schedule run
-
Dynny can do as many jobs he wants as long as they don't overlap much. with a full schedule there's a chance where the locations of each job are far away. To be fair play, the clock changes to a stopwatch 10 minutes early. As if it had a kind of slow motion effect.

stats
-
Dynny has stats like life, hunger, joy, stamina and solitude. <br>
the player needs to watch out for those 5.

life: it's mostly refered as HP. Dynny has 200 HP. if he reaches 0 HP. Game Over. go to hospital that will append your debt. <br>
HUNGER: Dynny gotta eat. if he doesn't, he might faint and eat the holding object to satisfy his hunger. <br>
JOY: How dynny feels. Joy is given by spending time with nukko, playing games or doing leisure activities. <br>
solitude: a special bar that decreases by the years that you're away from Nukko. Dynny doesn't understand that, but Nukko is important to him. And not having him around for too long might get his life empty. if this bar goes to 0. objects like trees and stores might close and Dynny will notice a decrease in water levels.

Jobs
-
Dynny needs to work to pay his debt. the work is made via mini games. and at the end of the month you get a wage for a well done job.


needs exclusive GameMoment with mechanics and graphics
- box pusher: morning to afternoon;
- office guy: morning, afternoon or night;
- elevator technician: when requested. mostly it's in dawn or night;
- I.T. tester: 7x0. hour randomized $1,000,000
- trucker: paid by work and kilometree
- factory worker: morning to night
- caker: morning to afternoon
- tree cutter: morning to evening
- Who wants to be a milionaire!?
- glass cleaner: 5x2 morning only

average game moment covers, but the triggers are different
- informant: when requested. paid by work. minimun of $500
- newspaper deliverer
- pizza deliverer

our wealthy badger - he's important for story
- limo driver: when requested. mostly night or morning
- personal assistant

Current State:
-
Everything is as initial as you can guess. It's not a complicated game, but since it's my first time developing a big project such as a game is. It'll be hard to make.

My main focus is currently on:

the mini games:
they are a huge part of the game. they actually are the reason why this game is called Funky pack.
I'm starting by the Wall Cleaner mini-game. It's pretty easy because it uses the same engine of the main world.

NPC behavior system:
they have lots of behaviors, but most of them is to spawn, move, wait and arrive at certain locations.
it's just important because you need the NPCs to look like they have an actual life inside the game.

current changelog:
dialogs.js readded. the dialog type is now quite better than the first version. I now need to do all the NPCs variations aswell their option system that can change relationship levels.

Item and its collisions updated. Now the player can stand on top of the items, and also collect and put them in their inventory. The next step is make them acessible and usable in the Character Menu.

Issues with pages' lexical erros is resolved. I discovered that my IDE isn't case sensitive. And I'll for sure forget that this is a thing and I'll be wondering why the game isn't running on the pages for more weeks... y'know, the basics...