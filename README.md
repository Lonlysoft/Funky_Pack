# FUNKY PACK #
It's a personal project made for:
- Enhance my skills with frontend and game development
- Give to my characters of the Funky Pack series an interactive environment
- test my english skills with writing documentation and dialogs
- put this thing on my portfolio might be good, I don't know...

# Playtest

<a href = "https://lonlysoft.github.io/Funky_Pack" > here! </a> Please bear in mind that it's not done yet, but you can test the controls performance on mobile, PC or with a gamepad. it's pretty important because I don't have a keyboard or gamepad in order to test the viability of those control modes

# what is it?
Funky Pack is a game inspired by farming simulators. We all have heard the story of a farming simulator before: <br>
"There's this guy whose life is not good in the city and then he goes to a farm." <br>
the only difference between a normal farming simulator and Funky Pack is that the guy here never goes to the farm. He needs to work on the city.<br>
The game takes place in American City. A city inspired by the american cartoon stereotype. <br>
the game follows a structure of a weekly schedule. Dynny builds that schedule based on his jobs.

Full schedule run
-
Dynny can do as many jobs he wants as long as they don't overlap much. With a full schedule there's a chance where the locations of each job are far away. To be fair play, the clock changes to a stopwatch 10 minutes early. As if it had a kind of slow motion effect.

stats
-
Dynny has stats like life, hunger, joy, stamina and solitude. <br>
the player needs to watch for those 5.

life: it's mostly refered as HP. Dynny has 200 HP. if he reaches 0 HP. Game Over. you'll need to go to a hospital and your debt will be increased.<br>
HUNGER: Dynny gotta eat. if he doesn't, he might faint and eat the holding object to satisfy his hunger. <br>
JOY: How dynny feels. Joy is given by spending time with nukko, playing games or doing leisure activities. <br>
solitude: a special bar that decreases by the years that you're away from Nukko. Dynny doesn't understand that, but Nukko is important to him. And not having him around for too long might get his life empty. if this bar goes to 0, objects like trees and stores might disappear. And Dynny might presence allucinations and weird effercts might appear randomly.

Jobs
-
Dynny needs to work to pay his debt. the work is made via mini games. and at the end of the month you get a wage for a well done job.

the planned minigames are in the list below:
- box pusher: morning to afternoon;<br>
A puzzle grid type minigame where the player need to push a box into a bigger box and ship it into the right spots.

- office guy: morning, afternoon or night;
A dungeon crawler minigame where dynny is in a office and you need to defeat coffee machines and distractions in order to build a report of what ever his boss wants

- I.T. tester
time to be recursive, it's a 5 level mini-game where you need to test a bunch of games of different genres in a test room. looking for errors in the game.

- caker: morning to afternoon

- Who wants to be a milionaire
a quiz about the game with the most specific questions. get all the questions right and you'll win $1M. Get one question wrong and you lose it all.

- soldier: all time
inspired but topdown shooters, you'll be sent to a war on a unknown country and you'll battle against some foes that aren't actually evil, but it's your duty to eliminate them. winning or losing makes you get a different game ending. 
*in this mode Dynny won't be able to go back to American City neither add other jobs on the schedule.

average game moment covers, but the triggers are different
- informant: when requested. paid by work. minimun of $500

- pizza deliverer

our wealthy badger - he's important for story
- limo driver: when requested. mostly night or morning

drive the limousine of the wealthy badger into different requested places.

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
it's just important because you need the NPCs to look like they have an actual life inside the game and also handle that to make the game run without problems

current changelog:
dialogs.js re-added. the dialog data is now quite better than the first version. I now need to do all the NPCs variations aswell their option system that can change relationship levels.

Item and its collisions updated. Now the player can stand on top of the items, and also collect and put them in their inventory. The next step is make them acessible and usable in the Character Menu.

- Issues with pages' lexical erros is resolved. Now remote playability is possible
- Issues involving imagery are now resolved
- Dynny's spriteshhet updated, but unfortunately still with incomplete animations. Sorry, but the old one had some major issues and it was bugging me the fact that he hadn't a tail.