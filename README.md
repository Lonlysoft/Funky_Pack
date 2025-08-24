# FUNKY PACK #
It's a personal project made for:
- Enhancing my skills with frontend and gaming development
- Giving to my characters of the Funky Pack series an interactive environment
- Testing my English skills by writing documentation and dialogs
- ...and lastly, to put this thing on my portfolio, it might be good, I don't know...

# Playtest

<a href = "https://lonlysoft.github.io/Funky_Pack"> Test my game here!</a> <br> Please bear in mind that it's not finished yet, it's still in its early stages, but you can test the controls performance on mobile or PC. It's pretty important because I don't have a keyboard, so I can't test it. And also, a gamepad option is available for testing.

# What is it?
Funky Pack is a game inspired by farming simulators. We all have heard the story of a farming simulator before: <br>
"There's this guy whose life is not good in the city and then he goes to a farm." <br>
The only difference between a normal farming simulator and Funky Pack is that the guy here never goes to the farm. He needs to work on the city.<br>
The game takes place in an American City. A city inspired by the American cartoons stereotypes. <br>
The game follows a structure of a weekly schedule. Dynny builds that schedule based on his jobs.

Full schedule run
-
Dynny can do as many jobs he wants as long as they don't overlap much. With a full schedule there's a chance where the locations of each job are far away. To be fairplay, the clock changes to a stopwatch 10 minutes early. As if it had a kind of slow motion effect.

Stats
-
Dynny has stats like life, hunger, joy, stamina and solitude. <br>
The player needs to watch for those 5.

Life: It's commonly referred to as HP. Dynny has 200 HP. If he reaches 0 HP, it's game over. You'll need to go to a hospital and your debt will increase.<br>
Hunger: Dynny gotta eat. If he doesn't, he might faint and eat the holding object to satisfy his hunger. <br>
Joy: How Dynny feels. Joy is given by spending time with nukko, playing games or doing relaxing activities. <br>
Solitude: a special bar that decreases by the years you're away from Nukko. Dynny doesn't understand that, but Nukko is important to him. And not having him around for too long might get his life empty. if this bar goes to 0, objects like trees and stores might disappear. And Dynny might presence allucinations and weird effercts might appear randomly.

Jobs
-
Dynny needs to work to pay his debt. The work is done via mini games. At the end of the month you get a wage for a well done job.

The planned mini-games are in the list below:
- Box pusher: morning till afternoon;<br>
A puzzle grid type mini-game where the player needs to push a box into a bigger box and ship it into the right spots.

- Office guy: morning, afternoon or night;
A dungeon crawler mini-game where Dynny is in a office and you need to defeat coffee machines and distractions in order to build a report of whatever his boss wants.

- I.T. tester
Time to be recursive, it's a 5 level mini-game where you need to test a bunch of games of different genres in a test room and to look for errors in the game.

- Cake baker: morning till afternoon

- Who wants to be a milionaire?
A quiz about the game with the most specific questions. If you give the correct answers to all the questions, you'll win $1M. But be careful, if one answer is wrong, you lose it all.

- Soldier: all time
Inspired from topdown shooters, you'll be sent to a war on a unknown country and you'll battle against some foes that aren't actually evil, but it's your duty to eliminate them. Winning or losing makes you get a different game ending. 
*in this mode Dynny won't be able to go back to the American City or add other jobs on the schedule.

Average game moment covers, but the triggers are different
- Informant: when requested, paid by work with a minimum of $500

- Pizza delivery guy

Our wealthy badger - he's important for story
- Limousine driver: when requested; mostly night or morning

Drive the limousine of the wealthy badger into different requested places.

- Personal assistant

Current State:
-
Everything is as initial as you can guess. It's not a complicated game, but since it's my first time developing a big project such as a game is hard to make.

My main focus is currently on:

The mini games:
They are a huge part of the game. They actually are the reason why this game is called Funky Pack.
I'm starting by the Wall Cleaner mini-game. It's pretty easy because it uses the same engine of the main world.

NPC behavior system:
They have lots of behaviors, but most of them are spawning, moving, waiting and arriving at certain locations.
It's just important because you need the NPCs to look like they have an actual life inside the game and also handle that to make the game run without problems

# Current changelog:

- ```dialogs.js``` was re-added. The dialog data is now quite better than the first version. I now need to do all the NPCs variations as well as their option system that can change relationship levels.
- Items and their collisions are updated. Now the player can stand on top of the items, and also collect and put them in their inventory. The next step is make them acessible and usable in the Character Menu.

- Issues with pages' lexical errors have been resolved. Now remote playability is also possible.
- Issues involving imagery are now resolved.
- Dynny's spritesheet was updated, but unfortunately still with incomplete animations. Sorry, but the old one had some major issues and it was bugging me the fact that he didn't have a tail.

