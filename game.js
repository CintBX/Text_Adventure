const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {}

function startGame() {
	state = {};
	showTextNode(1);
}

function showTextNode(textNodeIndex) {
	const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
	textElement.innerText = textNode.text;
	while (optionButtonsElement.firstChild) {
		optionButtonsElement.removeChild(optionButtonsElement.firstChild);
	}

	textNode.options.forEach(option => {
		if (showOption(option)) {
			const button = document.createElement('button');
			button.innerText = option.text;
			button.classList.add('btn');
			button.addEventListener('click', () => selectOption(option));
			optionButtonsElement.appendChild(button);
		}
	})
}

function showOption(option) {
	return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
	const nextTextNodeId = option.nextText;
	if (nextTextNodeId <= 0) {
		return startGame();
	}
	state = Object.assign(state, option.setState);
	showTextNode(nextTextNodeId);
}

const textNodes = [
	{
		id: 1,
		text: 'You wake up in a strange place, and find a jar of blue goo next to you.',
		options: [
			{
				text: 'Take goo',
				setState: { blueGoo: true },
				nextText: 2
			},
			{
				text: 'Leave the goo',
				nextText: 2
			}
		]
	},
	{
		id: 2,
		text: 'You venture forth in search of answers to where you are, when suddenly you come across a merchant.',
		options: [
			{
				text: 'Trade the goo for a sword',
				requiredState: (currentState) => currentState.blueGoo,
				setState: { blueGoo: false, sword: true },
				nextText: 3
			},
			{
				text: 'Trade the goo for a shield',
				requiredState: (currentState) => currentState.blueGoo,
				setState: { blueGoo: false, shield: true },
				nextText: 3
			},
			{
				text: 'Ignore the merchant',
				nextText: 3
			}
		]
	},
	{
		id: 3,
		text: 'After leaving the merchant, you start to feel tired and stumble upon a small town next to a dangerous-looking castle.',
		options: [
			{
				text: 'Explore the castle',
				nextText: 4
			},
			{
				text: 'Enter the town and search for the Inn',
				nextText: 5
			},
			{
				text: 'Find a stable and sleep ontop of hay',
				nextText: 6
			}
		]
	},
	{
		id: 4,
		text: 'You are so tired that you fall asleep while exploring the castle.  A terrible monster kills you in your sleep.',
		options: [
			{
				text: 'Restart',
				nextText: -1
			}
		]
	},
	{
		id: 5,
		text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
		options: [
			{
				text: 'Restart',
				nextText: -1
			}
		]
	},
	{
		id: 6,
		text: 'You wake up well rested and full of energy, although you smell like an animal. What now?',
		options: [
			{
				text: 'Explore the castle',
				nextText: 7
			}
		]
	},
	{
		id: 7,
		text: 'While exploring the castle you come across a horrible monster in your path.',
		options: [
			{
				text: 'Run away',
				nextText: 8
			},
			{
				text: 'Slash it with your sword',
				requiredState: (currentState) => currentState.sword,
				nextText: 9
			},
			{
				text: 'Raise your shield',
				requiredState: (currentState) => currentState.shield,
				nextText: 10
			},
			{
				text: 'Throw the blue goo at it',
				requiredState: (currentState) => currentState.blueGoo,
				nextText: 11
			}
		]
	},
	{
		id: 8,
		text: 'Your attempts to run are in vain. The monster catches you easily.',
		options: [
			{
				text: 'Restart',
				nextText: -1
			}
		]
	},
	{
		id: 9,
		text: 'The sword cuts it and enrages the monster.  He attacks you with his claws.',
		options: [
			{
				text: 'Restart',
				nextText: -1	
			}
		]
	},
	{
		id: 10,
		text: 'The monster slams against your shield and backs you into a wall, overpowering you.',
		options: [
			{
				text: 'Restart',
				nextText: -1
			}
		]
	},
	{
		id: 11,
		text: 'The mysterious blue goo turns out to be magical, and explodes upon contact with the monster. The monster is disintegrated. Behind where he once stood, you see an important-looking door.',
		options: [
			{
				text: 'Turn around and leave',
				nextText: 12
			},
			{
				text: 'Open it and enter the room',
				nextText: 13
			}
		]
	},
	{
		id: 12,
		text: 'You return to town and live the rest of your days as a commoner',
		options: [
			{
				text: 'Restart',
				nextText: -1
			}
		]
	},
	{
		id: 13,
		text: 'You enter the room and inside, you find a large treasure chest. You approach it.',
		options: [
			{
				text: 'Open it',
				nextText: 14
			},
			{
				text: 'Inspect it',
				nextText: 15
			}
		]
	},
	{
		id: 14,
		text: 'A poison dart fires out from the chest, striking you in the neck.',
		options: [
			{
				text: 'Restart',
				nextText: -1
			}
		]
	},
	{
		id: 15,
		text: 'It is locked. Luckily, the dumb monster left the key on the floor behind the chest. You open it and find rare, priceless coins and gems.',
		options: [
			{
				text: 'Fill your bag',
				nextText: 16
			},
			{
				text: "Walk away. These don't belong to you",
				nextText: 12
			}
		]
	},
	{
		id: 16,
		text: 'You return to town as the richest man in history. You have your fill of booze and bitches, and live happily ever after.',
		options: [
			{
				text: 'Thanks for playing!',
				nextText: -1
			}
		]
	}
]

startGame();