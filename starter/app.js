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

//variable declarations 
var scores, roundScore, activePlayer, gamePlayingState; 

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
        var dice = Math.floor(Math.random() * 6 + 1);
        
        //holds previous dice 
        var previousDice; 
        
        //2. Display result
        //variable holds the dice object (png file) 
        var diceDOMObject = document.querySelector('.dice'); 
    
        //displays the dice object
        diceDOMObject.style.display = 'block'; 
    
        //pulls the correct dice.png file 
        diceDOMObject.src = 'dice-' + dice + '.png'; 
        
    
        //3. Update round score IF rolled number was NOT a 1
        //== does type coercion, === does not (!== does not)
        if(dice !== 1) {
            //Add score
            roundScore += dice;
            //selects the current player and updates the round score
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
        } else {
            //Call nextPlayer function in global scope to toggle to next player
            nextPlayer(); 
        }
        
        previousDice = dice;
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
    
        // 3. Check if player won the game   
        if(scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!'; 
        
            //resets display of dice to none
            //DONT USE style property all the time if lots of styles to change
            //create a class in CSS instead
            document.querySelector('.dice').style.display = 'none'; 

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
        document.querySelector('.dice').style.display = 'none'; 

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


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/






