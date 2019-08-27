/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Document Object Model
//HTML Webpage content stored in the DOM, manipulated by JavaScript


/*/* LESSON /*
//to select IDs use hash symbol 
//selects Player 1's global score
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//document.querySelector('#current-' + activePlayer).textContent = dice; 

//variable stores the value of the global score of the current player
var x = document.querySelector('#score-0').textContent; 

//for ID's ONLY use getElementByID instead of querySelector
//getElementByID is faster
document.getElementByID('score-0').textContent = '0';

//Button function
//functions can also be called from outside an event listener 
function btn() {
    //DO SOMETHING
}
btn(); 
*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable) - DONE
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


//variable declarations 
var scores, roundScore, activePlayer, gamePlayingState, previousDice1, previousDice2; 

//Call init function at the beginning of our game
init(); 


//selects the btn "roll dice"
//adds event listener, click, function
//anonymous function is declared and written from inside event listener
//cannot use the function again - it is nameless 
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlayingState) {
    
        //1. Random number   
        //variable holds a random number between 1 and 6 (die sides)
        var dice1 = Math.floor(Math.random() * 6 + 1);
        //variable holds random number for second dice
        var dice2 = Math.floor(Math.random() * 6 + 1);
         
        //2. Display result
        //variable holds the dice object (png file) 
        var diceDOMObject1 = document.getElementById('dice-1'); 
        
        //variable holds the second dice object (png file)
        var diceDOMObject2 = document.getElementById('dice-2'); 
    
        //displays the dice object
        diceDOMObject1.style.display = 'block'; 
        
        //displays the second dice object
        diceDOMObject2.style.display = 'block'; 
    
        //pulls the correct dice.png file 
        diceDOMObject1.src = 'dice-' + dice1 + '.png';
        
        //pulls the second dice.png file 
        diceDOMObject2.src = 'dice-' + dice2 + '.png'; 
        
        //if the Player rolls a 6 twice in a row
        if(dice1 === 6 || dice2 === 6) {
            if(previousDice1 == 6 || previousDice2 == 6) {
                //active Player loses score
                scores[activePlayer] = 0; 
            
                //displays the global score in the scores array 
                document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            
                //Call nextPlayer function in global scope to toggle to next player
                nextPlayer(); 
            }
        }
    
        //3. Update round score IF rolled number was NOT a 1
        //== does type coercion, === does not (!== does not)
        else if(dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            //selects the current player and updates the round score
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
        } else {
            //Call nextPlayer function in global scope to toggle to next player
            nextPlayer(); 
        }
        
        //holds previous dice
        previousDice1 = dice1;
        previousDice2 = dice2;
    }
}); 


//selects the btn "hold points"
//adds event listener, click, function
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlayingState) {
    
        // 1. Add current score to global score of the active player
        //Score array[active player]
        scores[activePlayer] += roundScore; 
  
        // 2. Update the user interface (UI)
        //displays the global score in the scores array 
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        
        //holds the input from the user for the final score of the game
        var input = document.querySelector('.final-score').value; 
        
        //Undefined, 0, null or empty string (==) are coerced to false
        //Anything else is coerced to true
        if(input) {
            var winningScore = input;            
        } else {
            winningScore = 100; 
        }
    
        // 3. Check if player won the game   
        if(scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!'; 
        
            //resets display of dice to none
            //DONT USE style property all the time if lots of styles to change
            //create a class in CSS instead
            document.querySelector('.dice1').style.display = 'none'; 

            //adds winner class to active player that wins the game
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        
            //turns off activePlayer selection (winner class from css)
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
            //sets game State to false
            gamePlayingState = false; 
        
        } else {
            //Call nextPlayer function in global scope to toggle to next player
            nextPlayer(); 
        }
    }
   
});


//function toggles between two players 
function nextPlayer() {
      //Next player (ternary operator)
        //if active player === 0 (dice roll 1)
        //active player should be 1 (Player 2)
        //else active player should 0 (Player 1)
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
        //roundScore is reset to 0 
        roundScore = 0;
    
        /*BONUS IMPLEMENTATION */

        
        //SAME AS WRITING BELOW 
        /*
        if(activePlayer === 0 ) {
            activePlayer = 1;
        } else {
            activePlayer = 0;
        }
        */
        
        //resets the current scores to 0
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        
        //toggles selected player (gray background selection)
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');

        //toggles selected player (gray background selection)
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //resets display of dice to none and moves to next player 
        //document.querySelector('.dice').style.display = 'none'; 
}

//event listener for the new game function 
document.querySelector('.btn-new').addEventListener('click', init);

//function intitalizes a new game
function init() {   
        scores = [0,0];                          //array holds the scores of both players
        roundScore = 0;                          //variable holds the score each player earns each round
        activePlayer = 0;                        //variable holds the current player
        gamePlayingState = true;
    
        //set default display of dice.png to none - won't display 
        document.getElementById('dice-1').style.display = 'none'; 
    
        //set default display of dice.png to none - won't display 
        document.getElementById('dice-2').style.display = 'none'; 

        //set default display of scores of players to zero
        //gets global score (score-) and round score (current-)
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';  
    
        //sets the player names back to Player 1 and Player 2
        document.getElementById('name-0').textContent = 'Player 1'; 
        document.getElementById('name-1').textContent = 'Player 2'; 
    
        //remove winner class from both players
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');   
 
        //remove active class from both players
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.remove('active'); 
    
        //add active class back to player 0
        document.querySelector('.player-0-panel').classList.add('active');
}








