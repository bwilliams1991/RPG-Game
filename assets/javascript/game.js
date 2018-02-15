
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

	var messages = {
		attack: "You attacked " + theDefender.name + " for " + theCharacter.attackPower + " damage.",
		counter: theDefender.name + "attacked you back for " + theDefender.counterAttackPower + "damage.",
		defeat: "You have defeated " + theDefender.name + ", choose the next combatant.",
		end: "You have been defeated ... Game Over!",
		missing: "No enemy to attack, please choose another enemy.",
		win: "Winner!",
		character: "Select your character",
	}


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
				break;
			case 1:
				nameOver.addClass("nameover-luke name");
				break;
			case 2:
				nameOver.addClass("nameover-sid name");
				break;
			case 3:
				nameOver.addClass("nameover-maul name");
				break;
		}
		$('.name').attr("id", imgBtn.alt);

		//switch case for health
		switch (i) {
			case 0:
				healthOver.addClass("healthover-obi health");
				break;
			case 1:
				healthOver.addClass("healthover-luke health");
				break;
			case 2:
				healthOver.addClass("healthover-sid health");
				break;
			case 3:
				healthOver.addClass("healthover-maul health");
				break;
		}
		$('.health').attr("id", imgBtn.value);

		nameOver.text(characters[i].name);
		healthOver.text(characters[i].healthPoints);

		$("#characterChoose").append(nameOver);
		$("#characterChoose").append(healthOver);
		$("#characterChoose").append(imgBtn);

	}




	//  initialize the character value                   ////this is broken, unable to console value
	function theCharacter(me) {
		character.name = me.name;
		character.healthPoints = me.healthPoints;
		character.attackPower = me.attackPower;
		character.baseAttack = me.baseAttack;
		character.counterAttackPower = me.counterAttackPower;
		character.src = me.src;
		character.id = me.id;
	}

	// initialize the enemy value 
	function theDefender(them) {
		theEnemy.name = them.name;
		theEnemy.healthPoints = them.healthPoints;
		theEnemy.counterAttackPower = them.counterAttackPower;
		theEnemy.attackPower = them.attackPower;
		theEnemy.baseAttack = them.baseAttack;
		theEnemy.src = them.src;
		theEnemy.id = them.id;
	}

	// Move remaining to defenders Position
	function moveEnemies() {
		$(".available").removeClass("available").addClass("becomeEnemy");
		$("#enemies").append($(".becomeEnemy"));
	}

	// reset game
	function reset() {

		// Reset all the health values
		for (var i = 0; i < characters.length; i++) {
			$("#health").html(characters[i].health);
		}

		$(".imgBtn-obi imgBtn-luke imgBtn-sid imgBtn-maul").removeClass("chosen becomeEnemy").addClass("available");
		var available = $(".available").show();
		$("#characterChoose").html(available);

		$("#message").empty();
		$("#restart").hide();

		// character selections
		var characterSelected = false;
		var enemySelected = false;

		// store current choice
		var theCharacter = {};
		var theEnemy = {};

		// hope this is obvious, one end-game instance is =3 -> win
		var enemiesDefeated = 0;

		// indicates end of game
		var end = false;
	}

	// Move remaining to defenders Position
	function moveEnemies() {
		$(".available").removeClass("available").addClass("becomeEnemy");
		$("#enemies").append($(".becomeEnemy"));
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

			$("#obi-wan").removeClass("available").addClass("chosen");
			// $("#").removeClass("available").addClass("chosen");
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
				// $("#obi-wan").removeClass("theEnemy").addClass("defenders");
				// $("#enemy").append(this);
			}
		}
	});



	$("#luke").on("click", function () {
		// console.log("Luke Skywalker");

		if (characterSelected == false) {
			$("#message").empty();

			theCharacter(characters[1]);
			characterSelected = true;

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

			// User attacks
			them.healthPoints -= me.attackPower;
			$(".theEnemy").html(them.healthPoints);// here
			$("#message").html(messages.attack);

			// attack power increases
			me.attackPower += me.baseAttack;

			// check defender health and counter(if alive)
			if (them.healthPoints > 0) {
				me.healthPoints -= them.counterAttackPower;
				$(".chosen").html(me.healthPoints);

				// Check user health after counter
				if (me.healthPoints > 0) {
					$("#message").append(messages.counter);
				} else {
					theEnd = true;
					$("#message").html(messages.end);
					$("#restart").show();
				}
			} else {
				// enemy is defeated
				enemiesDefeated++;
				enemySelected = false;
				$("#message").html(messages.defeat);
				$(".defender-character").hide();

				// Check if winning
				if (enemiesDefeated === 3) {
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