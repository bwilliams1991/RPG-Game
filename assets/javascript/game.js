
$(document).ready(function () {

	// // Varible Declarations
	// --------------------------------------------------------------------------------------
	var i;
	var j;

	// character selections
	var characterSelected = false;
	var enemySelected = false;

	// store current choice
	var theCharacter = {};
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
			src: "./assets/images/obi-wan-kenobi.jpg"
		},
		{ //character[1].attribute
			name: "Luke Skywalker",
			healthPoints: 100,
			attackPower: 8,
			counterAttackPower: 5,
			baseAttack: 8,
			src: "./assets/images/luke-skywalker.jpg"
		},
		{ //character[2].attribute
			name: "Darth Sidious",
			healthPoints: 150,
			attackPower: 8,
			counterAttackPower: 20,
			baseAttack: 8,
			src: "./assets/images/sid.png"
		},
		{ //character[3].attribute
			name: "Darth Maul",
			healthPoints: 180,
			attackPower: 8,
			counterAttackPower: 25,
			baseAttack: 8,
			src: "./assets/images/DarthMaul.jpeg"
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
			alt: characters[i].name
		});

		switch (i) {
			case 0:
				imgBtn.addClass("img-thumbnail imgBtn-obi available");
				$('img').attr("id", "obi-wan");
				break;
			case 1:
				imgBtn.addClass("img-thumbnail imgBtn-luke available");
				$('img').attr("id", "luke");
				break;
			case 2:
				imgBtn.addClass("img-thumbnail imgBtn-sid available");
				$('img').attr("id", "sid");
				break;
			case 3:
				imgBtn.addClass("img-thumbnail imgBtn-maul available");
				$('img').attr("id", "maul");
				break;
		}
		$("#characterChoose").append(imgBtn);

		// name
		var nameOver = $("<h4>");
		// health
		var healthOver = $("<h5>");

		switch (i) {
			case 0:
				nameOver.addClass("nameover-obi");
				break;
			case 1:
				nameOver.addClass("nameover-luke");
				break;
			case 2:
				nameOver.addClass("nameover-sid");
				break;
			case 3:
				nameOver.addClass("nameover-maul");
				break;
		}
		nameOver.text(characters[i].name);
		$("#characterChoose").append(nameOver);

		switch (i) {
			case 0:
				healthOver.addClass("healthover-obi");
				break;
			case 1:
				healthOver.addClass("healthover-luke");
				break;
			case 2:
				healthOver.addClass("healthover-sid");
				break;
			case 3:
				healthOver.addClass("healthover-maul");
				break;
		}
		// $('h5').attr("id", "health"); // for testing(@-line101)
		healthOver.text(characters[i].healthPoints);
		$("#characterChoose").append(healthOver);
		$('h5').attr("id", "health"); // line behaves oddly, not adding id "health" to h5 for d.maul when on line line 98 or earlier.?
	}




	//  initialize the character value 
	function theCharacter(theCharacter) {
		character.name = theCharacter.name;
		character.healthPoints = theCharacter.healthPoints;
		character.attackPower = theCharacter.attackPower;
		character.baseAttack = theCharacter.baseAttack;
	}

	// initialize the enemy value 
	function theDefender(theDefender) {
		defender.name = theDefender.name;
		defender.healthPoints = theDefender.healthPoints;
		defender.counterAttackPower = theDefender.counterAttackPower;
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


	// Process
	// --------------------------------------------------------------------------------------
	
	// confirm restart button is hidden on game start
	$("#restart").hide();


	// character determination

	/// there has got to be a better way...

	$("#obi-wan").on("click", function () {
		// console.log("Obi-Wan Kenobi");

		if (characterSelected == false) {
			$("#message").empty();

			theCharacter(characters[0]);
			characterSelected = true;

			$("#obi-wan").removeClass("available").addClass("chosen");
			$("#chosen").append(this);

			// Move the remaining characters to the enemies section
			moveEnemies();

		} else if ((characterSelected == true) && (defenderSelected == false)) {

			// User selects defender
			if ($("#obi-wan").hasClass("theEnemy")) {
				$("#message").empty();

				theDefender(characters[1]);// fix
				defenderSelected = true;

				// move to defender section
				$("#obi-wan").removeClass("theEnemy").addClass("defenders");
				$("#enemies").append(this);
			}
		}
	});
	


	$("#luke").on("click", function () {
    // console.log("Luke Skywalker");

    if(characterSelected == false) {
      $("#message").empty();

      theCharacter(characters[1]);
      characterSelected = true;

      $("#luke").removeClass("available").addClass("chosen");
      // $("#chosen-character").append(this);

      // Move the remaining characters to the enemies section
			moveEnemies();
			
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      // User selects defender
      if($("#luke").hasClass("theEnemy")) {
        $("#message").empty();

        theDefender(characters[0]);//fix
        defenderSelected = true;

        // move to defender section 
        $("#luke").removeClass("theEnemy").addClass("defenders");
        $("#enemies").append(this);
      }
    }
  });

  $("#sid").on("click", function () {
    // console.log("Darth Sidious");

    if(characterSelected == false) {
      $("#message").empty();

      // Set the user's character
      theCharacter(characters[2]);
      characterSelected = true;

      // Display the chosen character
      $("#sid").removeClass("available").addClass("chosen");
      // $("#chosen").append(this);

      // Move the remaining characters to the enemies section
      moveEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      // User selects defender
      if($("#sid").hasClass("theEnemy")) {
        $("#message").empty();

        // Set the user's enemy
        theDefender(characters[1]); //fix
        defenderSelected = true;

        // Add the character to the defender section 
        $("#sid").removeClass("theEnemy").addClass("defenders");
        $("#enemies").append(this);
      }
    }
  });

  $("#maul").on("click", function () {
    // console.log("Darth Maul");

    if(characterSelected == false) {
      $("#message").empty();

      theCharacter(characters[3]);
      characterSelected = true;

      // Display the chosen character
      $("#maul").removeClass("available").addClass("chosen");
      // $("#chosen").append(this);

      // Move the remaining characters to the enemies section
      moveEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      // User selects defender
      if($("#maul").hasClass("theEnemy")) {
        $("#message").empty();

        // Set the user's enemy
        theDefender(characters[1]); //fix
        defenderSelected = true;

       // move to defender section
        $("#maul").removeClass("theEnemy").addClass("defenders");
        $("#enemies").append(this);
      }
    }
  });



// onclick for attack sequence
	//counter attack
		// attack power increase Math.pow?
	// win/lose
	// next defender, repeat fight until finish
	$("#attack-btn").on("click", function() {
    if (characterSelected && defenderSelected && !gameOver) {

      // User attacks
      theDefender.healthPoints -= theCharacter.attackPower;
      $(".defender-character").html(theDefender.healthPoints);
      $("#message").html(messages.attack);

      // attack power increases
      theCharacter.attackPower += theCharacter.baseAttack;

			// check defender health and counter(if alive)
			if (theDefender.healthPoints > 0) {
        theCharacter.healthPoints -=  theDefender.counterAttackPower;
        $(".chosen").html(theCharacter.healthPoints);

        // Check user health after counter
        if (theCharacter.healthPoints > 0) {
          $("#message").append(messages.counter);
        } else {
          theEnd = true;
          $("#message").html(messages.end);
          $("#restart").show();
        }
      } else {
        // enemy is defeated
        enemiesDefeated++;
        defenderSelected = false;
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
    } else if (!defenderSelected && !theEnd) {
      $("#message").html(messages.missing);
    }

	});
	
// onclick for restart button
	$("#restart").on("click", function() {
    resetGame();
	});
	
});