const Dialogs = {
	party_not_present: [
		{
			text: "You don't have any party members now to talk to"
		}
	],
	JSON_FOLF: [
		{
			day: {
				name: "Jason Folf",
				ID: "JSON_FOLF",
				text: "hey there",
				condition: {time: "day", weather: "sunny"},
				next: "dayAlt"
			},
			dayAlt: {
				name: "Jason Folf",
				ID: "JSON_FOLF",
				text: "Do you need anything?"
			},
			dayRainy: {
				text: "hey Man! Weather's sure cozy to relax and give it a little more of a relaxing feeling. if you know what I mean.",
				condition: {time: "day", weather: "sunny"},
				next: "dialogDayAlt"
			},
			night: {
				name: "Jason Folf",
				ID: "JSON_FOLF",
				text: "Oi! Starry Night huh?.",
				condition: {time: "night", weather: "sunny"},
				next: "dayAlt"
			},
			dawn: {
				name: "Jason Folf",
				ID: "JSON_FOLF",
				text: "I'm too tired of plucking up my sleep schedule. Better catch some sleep while it's time...good Night!",
				condition: {time: "dawn"},
			}
		},
		{
			day: {
				text: "hi man",
				condition: {time: "day", weather: "sunny"},
				next: "dialogDayAlt"
			},
			dayAlt: {
				text: "I like checking out weather, here's just clean sky, and tomorrow will be sunny too. Nothing to worry."
			},
			dayRainy: {
				text: "hey Man! Weather's sure cozy to relax and give it a little more of a relaxing feeling. if you know what I mean.",
				condition: {time: "day", weather: "rain"},
				next: "dialogDayAlt"
			},
			night: {
				text: "Oi! Starry Night huh?",
				condition: {time: "night", weather: "sunny"},
				next: "dialogDayAlt"
			},
			storm: {
				text: "What are you doing here, man!? I don't need your help. Go back to your house or whatever."
			},
			dawn: {
				text: "I'm too tired of plucking up my sleep schedule. Better catch some sleep before morning again... good Night!",
				condition: {time: "dawn"},
			},
		}
	],
	Rodney: {
		
	},
	Mort: {
		day: {
			text: "I'm so sleepy... don't get me wrong... daylight and all shouldn't make me feel that way, but the pacificness makes me feel well. and as so well and well that it gets me yawning...",
			condition: {time: "day", weather: "sunny", relationship: 1},
			next: "dialogDayAlt"
		},
	},
	Nukko: {
		day: {
			text: "Hi Dynny! It's so good to see you!"
		}
	},
	Emily: {
		day: {
			text: "Oh! you're friend of that chubby tanuki?",
			next: "dayAlt"
		},
		dayAlt: {
			text: "No I don't want to chat with you, you will probably make me gain weight for being with that beatted fat."
		}
	}
}