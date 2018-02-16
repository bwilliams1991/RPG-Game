$(document).ready(function () {

	// // Varible Declarations
	// --------------------------------------------------------------------------------------

	// character selections
	var characterSelected = false;
	var enemySelected = false;

	// store current choice
	var character = {};
	var theEnemy = {};

	// hope this is obvious, one end-game instance is =3 -> win
	var enemiesDefeated = 0;

	// indicates end of game
	var theEnd = false;


	// Create Character options 
	var characters = [
		{//character[0].attribute
			name: "Obi-Wan Kenobi",
			healthPoints: 120,
			attackPower: 8,
			counterAttackPower: 10,
			baseAttack: 8,
			src: "./assets/images/obi-wan-kenobi.jpg",
			id: "obi-wan"
		},
		{ //character[1].attribute
			name: "Luke Skywalker",
			healthPoints: 100,
			attackPower: 8,
			counterAttackPower: 5,
			baseAttack: 8,
			src: "./assets/images/luke-skywalker.jpg",
			id: "luke"
		},
		{ //character[2].attribute
			name: "Darth Sidious",
			healthPoints: 150,
			attackPower: 8,
			counterAttackPower: 20,
			baseAttack: 8,
			src: "./assets/images/sid.png",
			id: "sid"
		},
		{ //character[3].attribute
			name: "Darth Maul",
			healthPoints: 180,
			attackPower: 8,
			counterAttackPower: 25,
			baseAttack: 8,
			src: "./assets/images/DarthMaul.jpeg",
			id: "maul"
		}
	];

	// var messages = {
	// 	attack: "You attacked " + theEnemy.name + " for " + character.attackPower + " damage.",
	// 	counter: theEnemy.name + "attacked you back for " + theEnemy.counterAttackPower + "damage.",
	// 	defeat: "You have defeated " + theEnemy.name + ", choose the next combatant.",
	// 	end: "You have been defeated ... Game Over!",
	// 	missing: "No enemy to attack, please choose another enemy.",
	// 	win: "Winner!",
	// 	character: "Select your character",
	// }


	// Functions
	// --------------------------------------------------------------------------------------
	//

	// create character images and health/name display
	for (var i = 0; i < characters.length; i++) {

		// image
		var imgBtn = $("<img/>", {
			src: characters[i].src,
			width: 250,
			alt: characters[i].name,
			id: characters[i].id,
			value: characters[i].healthPoints
		});

		// name
		var nameOver = $("<span>");

		// health
		var healthOver = $("<span>");

		nameOver.text(characters[i].name);
		healthOver.text(characters[i].healthPoints);

		//switch case for image
		switch (i) {
			case 0:
				imgBtn.addClass("img-thumbnail imgBtn-obi available");
				break;
			case 1:
				imgBtn.addClass("img-thumbnail imgBtn-luke available");
				break;
			case 2:
				imgBtn.addClass("img-thumbnail imgBtn-sid available");
				break;
			case 3:
				imgBtn.addClass("img-thumbnail imgBtn-maul available")
				break;
		}
		$('img').attr("id", imgBtn.id);

		//switch case for name 
		switch (i) {
			case 0:
				nameOver.addClass("nameover-obi name");
				$("#healthbar-obi").append(characters[0].name);
				break;
			case 1:
				nameOver.addClass("nameover-luke name");
				$("#healthbar-luke").append(characters[1].name);
				break;
			case 2:
				nameOver.addClass("nameover-sid name");
				$("#healthbar-sid").append(characters[2].name);
				break;
			case 3:
				nameOver.addClass("nameover-maul name");
				$("#healthbar-maul").append(characters[3].name);
				break;
		}
		$('.name').attr("id", imgBtn.alt);

		//switch case for health
		switch (i) {
			case 0:
				healthOver.addClass("healthover-obi health");
				$("#healthbar-obi").html(healthOver);
				break;
			case 1:
				healthOver.addClass("healthover-luke health");
				$("#healthbar-luke").html(healthOver);
				break;
			case 2:
				healthOver.addClass("healthover-sid health");
				$("#healthbar-sid").html(healthOver);
				break;
			case 3:
				healthOver.addClass("healthover-maul health");
				$("#healthbar-maul").html(healthOver);
				break;
		}
		$('.health').attr("id", imgBtn.value);

		$("#characterChoose").append(nameOver);
		$("#characterChoose").append(healthOver);
		$("#characterChoose").append(imgBtn);

	}























});