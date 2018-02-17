
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
			attackPower: 12,
			counterAttackPower: 5,
			baseAttack: 12,
			src: "./assets/images/luke-skywalker.jpg",
			id: "luke"
		},
		{ //character[2].attribute
			name: "Darth Sidious",
			healthPoints: 150,
			attackPower: 4,
			counterAttackPower: 20,
			baseAttack: 4,
			src: "./assets/images/sid.png",
			id: "sid"
		},
		{ //character[3].attribute
			name: "Darth Maul",
			healthPoints: 180,
			attackPower: 2,
			counterAttackPower: 25,
			baseAttack: 2,
			src: "./assets/images/DarthMaul.jpeg",
			id: "maul"
		}
	];

	var messages = {}

	// var messages = {
	// 	attack: "You attacked " + theEnemy["name"] + " for " + character["attackPower"] + " damage.",
	// 	counter: theEnemy.name + " attacked you back for " + theEnemy.counterAttackPower + " damage.",
	// 	defeat: "You have defeated " + theEnemy.name + ", choose the next combatant.",
	// 	end: "You have been defeated ... Game Over!",
	// 	missing: "No enemy to attack, please choose another enemy.",
	// 	win: "Winner!",
	// 	character: "Select your character",
	// }
	// moved below

	// Functions
	// --------------------------------------------------------------------------------------
	//

	function buildMessages(theEnemy, character) {
		messages.attack = "You attacked " + theEnemy["name"] + " for " + character["attackPower"] + " damage."
		messages.counter = theEnemy.name + " attacked you back for " + theEnemy.counterAttackPower + " damage."
		messages.defeat = "You have defeated " + theEnemy.name + ", choose the next combatant."
		messages.end = "You have been defeated ... Game Over!"
		messages.missing = "No enemy to attack, please choose another enemy."
		message.win = "Winner!"
		messages.character = "Select your character"
	}

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
				imgBtn.addClass("imgBtn-obi available");
				break;
			case 1:
				imgBtn.addClass("imgBtn-luke available");
				break;
			case 2:
				imgBtn.addClass("imgBtn-sid available");
				break;
			case 3:
				imgBtn.addClass("imgBtn-maul available")
				break;
		}
		$('img').attr("id", imgBtn.id);

		//switch case for name / health
		switch (i) {
			case 0:
				nameOver.addClass("nameover-obi name");
				healthOver.addClass("healthover-obi health");

				$("#namebar-obi").prepend(characters[i].name);
				$("#healthbar-obi").append(characters[i].healthPoints);

				break;
			case 1:
				nameOver.addClass("nameover-luke name");
				healthOver.addClass("healthover-luke health");

				$("#namebar-luke").prepend(characters[i].name);
				$("#healthbar-luke").append(characters[i].healthPoints);

				break;
			case 2:
				nameOver.addClass("nameover-sid name");
				healthOver.addClass("healthover-sid health");

				$("#namebar-sid").prepend(characters[i].name);
				$("#healthbar-sid").append(characters[i].healthPoints);
				break;
			case 3:
				nameOver.addClass("nameover-maul name");
				healthOver.addClass("healthover-maul health");

				$("#namebar-maul").prepend(characters[i].name);
				$("#healthbar-maul").append(characters[i].healthPoints);
				break;
		}
		$('.name').attr("id", imgBtn.alt);
		$('.health').attr("id", imgBtn.value);

		$("#characterChoose").append(imgBtn);

	}

	//  initialize the character value 
	function theCharacter(me) {
		character.name = me.name;
		character.healthPoints = me.healthPoints;
		character.attackPower = me.attackPower;
		character.counterAttackPower = me.counterAttackPower;
		character.baseAttack = me.baseAttack;
		character.src = me.src;
		character.id = me.id;
	}

	// initialize the enemy value 
	function theDefender(them) {
		theEnemy.name = them.name;
		theEnemy.healthPoints = them.healthPoints; theEnemy.attackPower = them.attackPower;
		theEnemy.counterAttackPower = them.counterAttackPower;
		theEnemy.baseAttack = them.baseAttack;
		theEnemy.src = them.src;
		theEnemy.id = them.id;
	}

	// Move remaining to defenders Position
	function moveEnemies() {
		$(".available").removeClass("available").addClass("becomeEnemy");

		$("#enemies").append($(".becomeEnemy"));

		// remove html from characterChoose div
		$("#characterChoose").html("");
	}

	// reset game
	function reset() {

		// Reset all the health values
console.log("reset");

		$("#healthbar-obi").html(characters[0].healthPoints);
		$("#healthbar-luke").html(characters[1].healthPoints);
		$("#healthbar-sid").html(characters[2].healthPoints);
		$("#healthbar-maul").html(characters[3].healthPoints);


		$(".imgBtn-obi").removeClass("chosen becomeEnemy").addClass("available");
		$(".imgBtn-luke").removeClass("chosen becomeEnemy").addClass("available");
		$(".imgBtn-sid").removeClass("chosen becomeEnemy").addClass("available");
		$(".imgBtn-maul").removeClass("chosen becomeEnemy").addClass("available");

		var available = $(".available").show();
		$("#characterChoose").html(available);

		$("#message").empty();
		$("#message").append(messages.character);
		$("#restart").hide();

		// character selections
		characterSelected = false;
		enemySelected = false;

		// store current choice
		theCharacter = {};
		theEnemy = {};

		// hope this is obvious, one end-game instance is =3 -> win
		enemiesDefeated = 0;

		// indicates end of game
		end = false;
	}

	// Process
	// --------------------------------------------------------------------------------------

	// 	// confirm restart button is hidden on game start
	$("#restart").hide();


	// character determination

	/// there has got to be a better way...

	$("#obi-wan").on("click", function () {
		// console.log("Obi-Wan Kenobi");
		//if no character selected
		if (characterSelected == false) {
			$("#message").empty();

			theCharacter(characters[0]);
			characterSelected = true;


			// change id of name/health to obi-name/health for greater definition
			$('.name').attr("id", "obi-name");
			$('.health').attr("id", "obi-health");

			$("#obi-wan").removeClass("available").addClass("chosen");

			$("#chosen").append(this);

			// Move the remaining characters to the enemies section
			moveEnemies();

			// if character is selected and enemy is not selected
		} else if ((characterSelected == true) && (enemySelected == false)) {

			// User selects defender
			if ($("#obi-wan").hasClass("becomeEnemy")) {
				$("#message").empty();

				theDefender(characters[0]);
				enemySelected = true;

				// move to defender section
				$("#obi-wan").removeClass("theEnemy").addClass("defenders");
				$("#enemy").append(this);
			}
		}
	});



	$("#luke").on("click", function () {
		// console.log("Luke Skywalker");

		if (characterSelected == false) {
			$("#message").empty();

			theCharacter(characters[1]);
			characterSelected = true;


			// change id of name/health to obi-name/health for greater definition
			$('.name').attr("id", "luke-name");
			$('.health').attr("id", "luke-health");

			$("#luke").removeClass("available").addClass("chosen");

			$("#chosen").append(this);

			// Move the remaining characters to the enemies section
			moveEnemies();



		} else if ((characterSelected == true) && (enemySelected == false)) {

			// User selects defender
			if ($("#luke").hasClass("becomeEnemy")) {
				$("#message").empty();

				theDefender(characters[1]);
				enemySelected = true;

				// move to defender section 
				$("#luke").removeClass("theEnemy").addClass("defenders");
				$("#enemy").append(this);
			}
		}
	});

	$("#sid").on("click", function () {
		// console.log("Darth Sidious");

		if (characterSelected == false) {
			$("#message").empty();

			// Set the user's character
			theCharacter(characters[2]);
			characterSelected = true;


			// change id of name/health to obi-name/health for greater definition
			$('.name').attr("id", "sid-name");
			$('.health').attr("id", "sid-health");

			// Display the chosen character
			$("#sid").removeClass("available").addClass("chosen");

			$("#chosen").append(this);

			// Move the remaining characters to the enemies section
			moveEnemies();
		} else if ((characterSelected == true) && (enemySelected == false)) {

			// User selects defender
			if ($("#sid").hasClass("becomeEnemy")) {
				$("#message").empty();

				// Set the user's enemy
				theDefender(characters[2]);
				enemySelected = true;

				// Add the character to the defender section 
				$("#sid").removeClass("theEnemy").addClass("defenders");
				$("#enemy").append(this);
			}
		}
	});

	$("#maul").on("click", function () {
		// console.log("Darth Maul");

		if (characterSelected == false) {
			$("#message").empty();

			theCharacter(characters[3]);
			characterSelected = true;


			// change id of name/health to obi-name/health for greater definition
			$('.name').attr("id", "maul-name");
			$('.health').attr("id", "maul-health");

			// Display the chosen character
			$("#maul").removeClass("available").addClass("chosen");

			$("#chosen").append(this);

			// Move the remaining characters to the enemies section
			moveEnemies();



		} else if ((characterSelected == true) && (enemySelected == false)) {

			// User selects defender
			if ($("#maul").hasClass("becomeEnemy")) {
				$("#message").empty();

				// Set the user's enemy
				theDefender(characters[3]);
				enemySelected = true;

				// move to defender section
				$("#maul").removeClass("theEnemy").addClass("defenders");
				$("#enemy").append(this);
			}
		}
	});



	// onclick for attack sequence
	//counter attack
	// attack power increase Math.pow?
	// win/lose
	// next defender, repeat fight until finish
	$("#attack-btn").on("click", function () {
		if (characterSelected && enemySelected && !theEnd) {
			buildMessages(theEnemy, character)
			console.log("attack");
			// User attacks
			theEnemy.healthPoints -= character.attackPower;
			if(theEnemy.name === "Obi-wan Kenobi") {
				$("#healthbar-obi").html(theEnemy.healthPoints);
			} else if (theEnemy.name === "Luke Skywalker") {
				$("#healthbar-luke").html(theEnemy.healthPoints);
			} else if (theEnemy.name === "Darth Sidious") {
				$("#healthbar-sid").html(theEnemy.healthPoints);
			} else if (theEnemy.name === "Darth Maul") {
				$("#healthbar-maul").html(theEnemy.healthPoints);
			}
			
			$("#message").html(messages.attack);
			console.log(character.attackPower);
			// attack power increases
			character.attackPower += character.baseAttack;
			if(character.name === "Obi-wan Kenobi") {
				$("#healthbar-obi").html(character.healthPoints);
			} else if (character.name === "Luke Skywalker") {
				$("#healthbar-luke").html(character.healthPoints);
			} else if (character.name === "Darth Sidious") {
				$("#healthbar-sid").html(character.healthPoints);
			} else if (character.name === "Darth Maul") {
				$("#healthbar-maul").html(character.healthPoints);
			}
			console.log(character.attackPower);
			// check defender health and counter(if alive)
			if (theEnemy.healthPoints > 0) {
				character.healthPoints -= theEnemy.counterAttackPower;
				$("#healthbar-obi").html(character.healthPoints);//here
				console.log("enemy not dead, countered");
				// Check user health after counter
				if (character.healthPoints > 0) {
					$("#message").append(messages.counter);
					console.log("you are not dead");
				} else {
					console.log("dead");
					theEnd = true;
					$("#message").html(messages.end);
					$("#restart").show();
				}
			} else {
				console.log("he gone!");
				// enemy is defeated
				enemiesDefeated++;
				enemySelected = false;
				$("#message").html(messages.defeat);
				$(".defenders").hide();

				// Check if winning
				if (enemiesDefeated === 3) {
					console.log("you have killed them all");
					theEnd = true;
					$("#message").html(messages.win);
					$("#restart").show();
				}
			}
		} else if (!characterSelected && !theEnd) {
			$("#message").html(messages.character);
		} else if (!enemySelected && !theEnd) {
			$("#message").html(messages.missing);
		}

	});

	// onclick for restart button
	$("#restart").on("click", function () {
		reset();
	});

});



// not displaying/updating fight damage values 