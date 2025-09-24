function chooseDialog(npc, currentCondition){
	let initial = "greetings";
	for (const id in npc) {
		if (id.startsWith(initial) && npc[id].condition) {
			const localCondition = npc[id].condition;
			let isAttending = false;
			if(localCondition.weather != undefined && currentCondition.weather == localCondition.weather){
				isAttending = true;
			}
			if(localCondition.time != undefined && currentCondition.time != localCondition.time){
				isAttending = true;
			}
			if(localCondition.relationship != undefined && currentCondition.relationship > localCondition.relationship){
				isAttending = true;
			}
			if (isAttending) {
				return npc[id];
			}
		} else {
			return npc[id];
		}
	}
}

const Dialogs = {
	party_not_present: [
		{
			text: "You don't have any party members now to talk to"
		}
	],
	JSON_FOLF:
	{
		greetings: {
			name: "Jason Folf",
			ID: "JSON_FOLF",
			text: "hey there",
			condition: {time: "day", weather: "clear"},
			options:[
				{
					text: "hey man, you're good?",
					next: "dayPositive"
				},
				{
					text: "who are you?",
					next: "selfExplanation"
				}
			],
		},
		selfExplanation: {
			name: "Jason Folf",
			ID: "JSON_FOLF",
			text: "I'm Jason, The Folf. I mean we already know each other you're Dynny, and we're supposed to be friends or something. I don't know...",
		},
		greetingsRainy: {
			name: "Jason Folf",
			ID: "JSON_FOLF",
			text: "hey there",
			condition: {time: "day", weather: "rain"},
			options:[
				{
					text: "hey man, you're good?",
					next: "positiveDialog"
				},
				{
					text: "who are you?",
					next: "selfExplanation"
				}
			]
		},
		dayAlt: {
			name: "Jason Folf",
			ID: "JSON_FOLF",
			text: "Do you need anything?"
		},
		dayRainy: {
			text: "weather's sure cozy to relax and give it a little more of a relaxing feeling. if you know what I mean.",
			condition: {time: "day", weather: "clear"},
			next: "dialogDayAlt"
		},
		night: {
			name: "Jason Folf",
			ID: "JSON_FOLF",
			text: "Oi! Starry Night huh?.",
			condition: {time: "night", weather: "clear"},
			next: "dayAlt"
		},
		dawn: {
			name: "Jason Folf",
			ID: "JSON_FOLF",
			text: "I'm too tired of plucking up my sleep schedule. Better catch some sleep while it's time...good Night!",
			condition: {time: "dawn"},
		},
		sadMoment: {
			condition: {storyMoment: 40, relationship: 34},
			ID: "JSON_FOLF"
		}
	},
	Rodney: {
		
	},
	Mort: {
		greetings: {
			text: "I'm so sleepy... don't get me wrong... daylight and all shouldn't make me feel that way, but the pacificness makes me feel well. and as so well and well that it gets me yawning...",
			condition: {time: "day", weather: "sunny", relationship: 1},
			next: "loveDialog"
		},
		loveDialog: {
			text: "Oh! hey sweetie! I'm so glad to see you!",
			condition: {relationship: 90}
		}
	},
	Nukko: {
		greetings: {
			name: "Nukko",
			text: "Hi Dynny! It's so good to see you!",
			next: "askingForRest"
		},
		askingForRest: {
			name: "Nukko",
			text: "So. You're in need of what? Rest? some fun activity? I'm free, so I'm up for anything you want, friend.",
			options: [
				{text: "rest", next: "rest"},
				{text: "I want to play some games", next: "playGames"},
				{text: "wanna go outside?", next: "answerOutside"}
			]
		},
		rest: {
			name: "Nukko",
			text: "so, have a good rest inside my belly button."
		},
		playGames: {
			name: "Nukko",
			text: "So let's play some games"
		},
		answerOutside: {
			name: "Nukko",
			text: "well let's go then."
		},
		greetingsRainy: {
			name: "Nukko",
			condition: {weather: "rain"},
			text: "So. it's rainy and all, you're in need of what? A rest? Some fun activity? As long as we're not going outside. I'm up for it.",
			options: [
				{text: "rest", next: "rest"},
				{text: "I want to play some games", next: "playGames"},
				{text: "wanna go outside?", next: "answerOutside"}
			]
		},
		
	},
	Emily: {
		greetings: {
			text: "Oh! you're friend of that chubby tanuki?",
			next: "dayAlt"
		},
		dayAlt: {
			text: "No I don't want to chat with you, you will probably make me gain weight for being with that beatted fat."
		}
	}
}