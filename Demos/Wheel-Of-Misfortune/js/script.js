// Game Settings

var gameScore = [0, 0]
var roundScore = [0, 0]
var currPlayer = 0
var round = 1
var arr = clueBank.getRandClue()
var clue = arr[1]
var category = arr[0]
var clueTablePos = []
var guessedLetters = ""
var buyAVowel = false
var $tiles = [$(".tile.r1"), $(".tile.r2"), $(".tile.r3")]
var tilesPerRow = $tiles[0].length
var $category = $("#category")
var $instructionBox = $("#instructions")
var $p1Name = $("#p1-name")
var $p2Name = $("#p2-name")
var pNames = [$p1Name.val(), $p2Name.val()]
var $p1roundScore = $("#p1-score")
var $p2roundScore = $("#p2-score")
var $p1gameScore = $("#p1-bank")
var $p2gameScore = $("#p2-bank")
var $startButton = $("#start")
var $guessInput = $("#guess-input")
var $spinButton = $("#spin")
var $buyVowelButton = $("#buy-vowel")
var $solveButton = $("#solve")

// Spinning wheel Prizes
const prizes = {
    0: '650',
    1: '900',
    2: '800',
    3: '-250',
    4: '700',
    5: '1500',
    6: 'Lose A Turn',
    7: '550'
};
const total_items = 8;
const minimum_jumps = 30;
let current_index = -1;
let jumps = 0;
let speed = 30;
let timer = 0;
let prize = -1;

// Define all Sound Effects
const womanLaugh2 = new Audio("sounds/womanLaugh2.mp3"); // BadGuess
const womanLaugh1 = new Audio("sounds/womanLaugh1.mp3"); // BadGuess
const playPop = new Audio("sounds/pop.mp3"); // Gamesound - Button Click
const victoryfornow = new Audio("sounds/victoryfornow.mp3"); // GoodSolves
const flawless = new Audio("sounds/flawless.mp3"); // GoodGuess
const verynice = new Audio("sounds/verynice.mp3"); // GoodGuess
const impeccable = new Audio("sounds/impeccable.mp3"); // GoodGuess
const demonlaugh = new Audio("sounds/demonlaugh.mp3"); // BadGuess
const avoiddeath = new Audio("sounds/avoideddeath.mp3"); // GoodSolves
const satisfactory = new Audio("sounds/satisfactory.mp3"); // GoodGuess
const solutiondeath = new Audio("sounds/solutiondeath.mp3"); //Taunt
const doomedtofail = new Audio("sounds/doomedtofail.mp3"); //Taunt
const playFool = new Audio("sounds/fool.mp3"); // BadGuess
const loseATurn = new Audio("sounds/loseATurn.mp3"); // GameSound - Land on Lose a Turn
const imbecile = new Audio("sounds/imbecile.mp3"); // BadGuess
const chooseOpponent = new Audio("sounds/chooseOpponent.mp3"); // GameSound Start of Game 1 time
const wheelofMisfortune = new Audio("sounds/wheelofMisfortune.mp3"); // GameSound - Start
const losePoints = new Audio("sounds/lose250.mp3"); // GameSound - Landing on Lose Points
const spinBtn = new Audio("sounds/spinButton.mp3"); // GameSound - Clicking on Spin Button
const solveBtn = new Audio("sounds/solveBtn.mp3"); // GameSound - Clicking on Solve Button
const correctGuess = new Audio("sounds/correctGuess.mp3"); // GoodGuess
const correctSolve = new Audio("sounds/correctSolve.mp3"); // GoodSolves
const incorrectSolve = new Audio("sounds/incorrectSolve.mp3"); // Taunts
const playFlip = new Audio("sounds/flip.mp3"); // Gamesound - Flipping a correct Tile
const errorSound = new Audio("sounds/errorSound.mp3"); // Gamesound - User Error
const wrongAnswer = new Audio("sounds/wrongAnswer.mp3"); // BadGuess
const successChime = new Audio("sounds/success-chime.mp3"); // Gamesound - points pop up
const playHeartbeat = new Audio("sounds/heartbeat.mp3"); // GameSound - Spinning Wheel
const playPing = new Audio("sounds/ping.mp3"); // GameSound Click Green Continue Button
const swoosh = new Audio("sounds/swoosh.mp3"); // GameSound - Flipping Board Tiles
const playAmbient = new Audio("sounds/ambient.mp3"); // GameSound - Ambient
playAmbient.volume = 0.1;
const playLaugh1 = new Audio("sounds/laugh.mp3"); // BadGuess
const victory = new Audio("sounds/FlawlessVictory.mp3"); // GoodSolves
const playWonderful = new Audio("sounds/Wonderful.mp3"); // GoodGuess
const playImpressive = new Audio("sounds/Impressive.mp3"); // GoodGuess
const playOutstanding = new Audio("sounds/Outstanding.mp3"); // GoodGuess
const roundThree = new Audio("sounds/round3.mp3"); // GameSound Round 3
const roundTwo = new Audio("sounds/round2.mp3"); // GameSound - Round 2
const roundOne = new Audio("sounds/round1.mp3"); // GameSound - Round 1
console.log(category, ",", clue)
// Arrays
var goodGuesses = [
    playOutstanding,
    playImpressive,
    playWonderful,
    correctGuess,
    satisfactory,
    impeccable,
    verynice,
    flawless
]

var badGuesses = [
    demonlaugh,
    wrongAnswer,
    playFool,
    imbecile,
    wrongAnswer,
    playLaugh1,
    wrongAnswer,
    womanLaugh2,
    womanLaugh1,
]

var goodSolves = [
    victory,
    avoiddeath,
    victoryfornow,
    correctSolve
]

var taunts = [
    solutiondeath,
    doomedtofail,
]

var pScore = {
    roundEl: [$p1roundScore, $p2roundScore],
    gameEl: [$p1gameScore, $p2gameScore]
}


// Modal
var ebModal = document.getElementById('mySizeChartModal');
var ebBtn = document.getElementById("spin");
var ebSpan = document.getElementsByClassName("ebcf_close")[0];
ebBtn.onclick = function() {
    spinBtn.play();
    ebModal.style.display = "block";
}



// Functions
/* --------------------------------------------------------------- */

function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

/* --------------------------------------------------------------- */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* --------------------------------------------------------------- */

showStartButton()
function showStartButton() {
    $startButton.show().on("click", async function(e) {
        playPop.play();
        $startButton.fadeOut("fast").off()



        roundOne.play();
        console.log("Sleeping 2 sec")
        await sleep(2 * 1000);
        emptyBoard()
        placeTiles()
        showMessage(currPlayerName() + " will play first...", true) // shows message and displays continue button

        $("table").fadeIn('slow')
        for (var i = 0; i < gameScore.length; i++) {
            pScore.roundEl[i].html(0)
            pScore.gameEl[i].html(gameScore[i])
        }
    })
}

/* --------------------------------------------------------------- */

function showMessage(msg, showContinue, nextRound) {
    $instructionBox.html(msg + " ")
    if (showContinue) {
        $instructionBox.append($('<span class="arrow"></span>').click(function() {
            playPing.play();
            $(this).hide()
            choose()
        }).html(""))
    }
    if (nextRound) {
        $instructionBox.append($('<span class="arrow"></span>').click(function() {
            playPing.play();
            $(this).hide()
            emptyBoard()
            var arr = clueBank.getRandClue()
            console.log(arr)
            clue = arr[1]
            category = arr[0]
            placeTiles()
            // reset scores display for round
            for (var i = 0; i < gameScore.length; i++) {
                pScore.roundEl[i].html(0)
            }


            if (round === 2) {
                roundTwo.play();
            }
            if (round === 3) {
                roundThree.play();
            }

            showMessage("Let's play the round " + round, true)

        }).html(">"))
    }
}

/* --------------------------------------------------------------- */

function currPlayerName() {
    pNames = [$p1Name.val(), $p2Name.val()]
    return pNames[currPlayer]
}

/* --------------------------------------------------------------- */

function emptyBoard() {
    for (var i = 0; i < $tiles.length; i++) {
        $tiles[i].removeClass("blank-tile").html("")
        $tiles[i].addClass("tile").html("")
    }
}

/* --------------------------------------------------------------- */

function placeTiles(solved) {
    var clueArr = clue.split(" ")
    var currRow = 0
    var currCol = 0
    var k = 0
    clueTablePos = []

    $category.html(category)

    for (var i = 0; i < clueArr.length; i++) { //for each element (aka word) in clue
        var currWord = clueArr[i]
        if (currCol + currWord.length < tilesPerRow) { //if element fits
            if (currCol !== 0) { //if not on first column add a space
                currCol += 1
            }
        } else {
            currRow += 1 //go to next row
            currCol = 0 //go to first tile of that row
        }
        for (var j = 0; j < currWord.length; j++) {
            swoosh.play();
            flipTiles(currRow, currCol, k, solved, currWord[j])
            clueTablePos.push([currRow, currCol])
            currCol++
            k++
        }
    }
}

/* --------------------------------------------------------------- */

function flipTiles(passedCurrRow, passedCurrCol, tileNum, solvedBool, currLetter) {
    window.setTimeout(function() {

        $($tiles[passedCurrRow][passedCurrCol]).removeClass("tile").html("")
        $($tiles[passedCurrRow][passedCurrCol]).delay(1000).addClass('blank-tile')
        if (solvedBool) {
            $($tiles[passedCurrRow][passedCurrCol]).html(currLetter)
        }
    }, tileNum * 150)

}

/* --------------------------------------------------------------- */

function choose() {
    enableChoices()
    showMessage("Ok " + currPlayerName() + ", what do you want to do?", false)
}

/* --------------------------------------------------------------- */

function enableChoices() {
    $spinButton.css("display", "inline-block");
    $buyVowelButton.css("display", "inline-block").on("click", buyVowel)
    $solveButton.css("display", "inline-block").on("click", solve)
}

/* --------------------------------------------------------------- */

function disableChoices() {

    $spinButton.hide().off()
    $buyVowelButton.hide().off()
    $solveButton.hide().off()
}

/* --------------------------------------------------------------- */

function buyVowel() {

    //check if you can even buy a vowel
    if (roundScore[currPlayer] < 250) {
        errorSound.play();
        showMessage("You need at least 250 for a vowel.", false)
        $guessInput.hide().off()
    } else {
        spinBtn.play();
        spinValue = -250
        disableChoices()
        showMessage("Alright, vowels are 250 each.", false)
        var returnDown = false
        $guessInput.show().focus().keydown(function(event) {
            if (event.which === 13 && returnDown === false) {
                returnDown = true
                guessVowel($(this).val(), spinValue)
                $(this).val("")
            }
        }).keyup(function(event) {
            if (event.which === 13 && returnDown === true) {
                returnDown = false
            }
        })
    }
}

/* --------------------------------------------------------------- */

async function solve() {
    disableChoices()
    solveBtn.play()
    await sleep(2 * 1000)
    getRandomItem(taunts).play()

    showMessage("Go ahead and solve, " + currPlayerName())
    var returnDown = false
    $guessInput.show().focus().attr('maxlength', 30).keydown(function(event) {
        if (event.which === 13 && returnDown === false) {
            returnDown = true
            checkSolve($(this).val())
            $(this).val("").attr('maxlength', 1)
        }
    }).keyup(function(event) {
        if (event.which === 13 && returnDown === true) {
            returnDown = false
        }
    })
}

/* --------------------------------------------------------------- */

function guess(letter, spinValue) {
    letter = letter.toLowerCase()
    var result = checkGuess(letter)
    if (result === "vowel") {
        showMessage("Sorry, you have to buy vowels. Please guess a consonant. You spun " + spinValue + ".", false)
        errorSound.play();
    }
    if (result === "not a letter") {
        launch_toast(letter, "red");
        errorSound.play();
        showMessage("Uh, that's not a letter", false)
    } else if (result === "already-guessed") {
        launch_toast(letter, "red");
        errorSound.play();
        showMessage("Whoops, '" + letter + "' was already guessed. Sorry you lost your turn.", true)
        nextPlayer()
        $guessInput.hide().off()
    } else if (result === "wrong") {
        launch_toast(letter, "red");
        wrongAnswer.play();
        guessedLetters += letter
        nextPlayer()
        showMessage("No '" + letter + "'. " + currPlayerName() + ", you're up", true)
        $guessInput.hide().off()
    } else if (result === "correct") {
        launch_toast(letter, "green");
        getRandomItem(goodGuesses).play();

        guessedLetters += letter

        letterCount = updateBoard(letter)

        updateScore(spinValue, letterCount)

        showMessage("Alright! Go ahead and flip them!", true)
        $guessInput.hide().off()
    }
}

/* --------------------------------------------------------------- */

function guessVowel(letter, spinValue) {
    letter = letter.toLowerCase()

    //check the letter
    var result = checkGuess(letter)
    var clueNoSpaces = clue.replace(/\s/ig, "")
    if (result !== "vowel") {
        errorSound.play();
        showMessage("That's not a vowel.", false)
    } else {
        if (guessedLetters.indexOf(letter) !== -1) {
            launch_toast(letter, "red");
            errorSound.play();
            showMessage("Whoops, '" + letter + "' was already guessed. Sorry you lost your turn.", true)
            nextPlayer()
            $guessInput.hide().off()
        } else if (clueNoSpaces.indexOf(letter) === -1) {
            launch_toast(letter, "red");
            wrongAnswer.play();
            guessedLetters += letter
            nextPlayer()
            showMessage("No '" + letter + "'. " + currPlayerName() + ", you're up", true)
            $guessInput.hide().off()
        } else {
            getRandomItem(goodGuesses).play();
            launch_toast(letter, "green");
            guessedLetters += letter
            letterCount = updateBoard(letter)
            updateScore(spinValue, letterCount)
            showMessage("Flip over those vowels!", true)
            $guessInput.hide().off()
        }
    }
}

/* --------------------------------------------------------------- */

function updateBoard(letter) {
    //find positions of letter on board
    var clueNoSpaces = clue.replace(/\s/ig, "")
    var pos = clueNoSpaces.indexOf(letter)
    var posArr = []
    var count = 0

    // pos and count of the letters
    while (pos !== -1) {
        posArr.push(pos)
        pos = clueNoSpaces.indexOf(letter, pos + 1)
        count++
    }

    //highlight all the tiles with that letter
    for (var i = 0; i < posArr.length; i++) {
        tileRow = clueTablePos[posArr[i]][0]
        tileCol = clueTablePos[posArr[i]][1]
        $($tiles[tileRow][tileCol]).addClass("highlight").html(clueNoSpaces[posArr[i]]).click(function(e) { //give tiles ability to flip
            playFlip.play();
            $(e.currentTarget).removeClass('highlight').off()
        })
    }

    return count
}

/* --------------------------------------------------------------- */

//note have it return an array of strings
function checkGuess(letter) { //return "vowel", "correct", "already guessed", "wrong", or "not a letter"
    var vowels = ["a", "e", "i", "o", "u"]
    var clueNoSpaces = clue.replace(/\s/ig, "")

    if (letter.length === 0) {
        return "no input"
    } else if (!/[a-zA-Z]/.test(letter)) {
        return "not a letter"
    } else if (vowels.indexOf(letter) !== -1) {
        return "vowel"
    } else if (guessedLetters.indexOf(letter) !== -1) {
        return "already-guessed"
    } else if (clueNoSpaces.indexOf(letter) === -1) {
        return "wrong"
    } else {
        return "correct"
    }
}

/* --------------------------------------------------------------- */

function checkSolve(guess) {
    guess = guess.toLowerCase()

    var clueNoSpaces = clue.replace(/\s/ig, "")
    var guessNoSpaces = guess.replace(/\s/ig, "").toLowerCase()
    if (clueNoSpaces === guessNoSpaces) {
        //empty the board
        emptyBoard()
        // loop through every letter in the clue and place it on the board
        for (var j = 0; j < guessNoSpaces.length; j++) {

            //find the position(s) of that letter
            var letter = guessNoSpaces[j]
            var pos = clueNoSpaces.indexOf(letter)
            var posArr = []
            var count = 0

            while (pos !== -1) {
                posArr.push(pos)
                pos = clueNoSpaces.indexOf(letter, pos + 1)
                count++
            }

            window.setTimeout(function() {
                placeTiles(true)
            }, 500)
        }

        //go to next round.

        nextRound()
        getRandomItem(goodSolves).play()


    } else {
        getRandomItem(badGuesses).play()
        nextPlayer()
        showMessage("Not quite, sorry. You're up " + currPlayerName(), true)
    }

    $guessInput.hide().off()
}

/* --------------------------------------------------------------- */

function nextPlayer() {
    if (currPlayer === 1) {
        currPlayer = 0
    } else {
        currPlayer++
    }
}

/* --------------------------------------------------------------- */

function nextRound() {
    //bank round points of the current player only
    gameScore[currPlayer] += roundScore[currPlayer]
    //display game scores so far
    for (var i = 0; i < gameScore.length; i++) {
        pScore.roundEl[i].html(0)
        pScore.gameEl[i].html(gameScore[i])
    }

    if (round > 2) {
        pNames = [$p1Name.val(), $p2Name.val()]
        console.log("finished game", gameScore)
        round = 1
        //check who won.
        if (gameScore[0] == gameScore[1]) {
            showMessage("It's a tie, womp womp. \rPress start to play a new game.")
        } else if (gameScore[0] > gameScore[1]) {
            showMessage("Congrats " + pNames[0] + ", you won with " + gameScore[0] + " points! \rPress start to play a new game.")
            victory.play()
        } else {
            showMessage("Congrats " + pNames[1] + ", you won with " + gameScore[1] + " points! \rPress start to play a new game.")
            victory.play()
        }
        gameScore = [0, 0]
        showStartButton()
    } else {
        round++
        //show message and
        showMessage("Congratulations! You banked " + roundScore[currPlayer] + " that round! Here are the scores.", false, true)
    }

    //reset guessed letters
    guessedLetters = ""
    //reset round score
    roundScore = [0, 0]

}

/* --------------------------------------------------------------- */

function updateScore(points, numGuessed, bankrupt) {
    if (bankrupt) {
        roundScore[currPlayer] = 0
    } else {
        roundScore[currPlayer] += points * numGuessed
        console.log(roundScore)
    }
    pScore.roundEl[currPlayer].html(roundScore[currPlayer])
}

/* --------------------------------------------------------------- */

// Toast Notification for Points
function launch_toast(toastMsg, color) {

    var y = document.getElementById("toastMsg");
    y.textContent = toastMsg;
    var x = document.getElementById("toast");
    x.className = "show " + color;

    setTimeout(function() {
        x.className = x.className.replace("show", "");
    }, 5000);
}

/* --------------------------------------------------------------- */

function runCircle() {
    $(`[data-order="${current_index}"]`).removeClass('is-active');

    current_index += 1;

    if (current_index > total_items - 1) {
        current_index = 0;
    }

    playHeartbeat.play();
    $(`[data-order="${current_index}"]`).addClass('is-active');

}

/* --------------------------------------------------------------- */

function generatePrizeNumber() {
    return Math.floor(Math.random() * total_items);
}

/* --------------------------------------------------------------- */

async function controllSpeed() {

    jumps += 1;
    buyAVowel = false;
    disableChoices();
    runCircle();

    // 1. Draw a prize to stop the game
    if (jumps > minimum_jumps + 10 && prize === current_index) {
        clearTimeout(timer);
        const currentPrize = prizes[current_index];
        console.log("Prize: " + currentPrize);


        // Bankrupt
        if (currentPrize === "-250") {
            losePoints.play();
            await sleep(2 * 1000);
            launch_toast(currentPrize, "red");
            await sleep(2 * 1000);
            ebModal.style.display = "none";
            showMessage("YOU HAVE LOST 250 POINTS, " + currPlayerName() + "!", true);
            updateScore(-250, 1, false);
            nextPlayer()
        } else if (currentPrize === "Lose A Turn") { // Lose A Turn

            await sleep(2 * 1000);
            loseATurn.play();
            launch_toast(currentPrize, "red");
            await sleep(2 * 1000);
            ebModal.style.display = "none";
            showMessage(currentPrize + " " + currPlayerName() + ".", true)
            nextPlayer()

        } else { // Points
            await sleep(2 * 1000);

            successChime.play();


            launch_toast(currentPrize, "green");
            await sleep(2 * 1000);
            ebModal.style.display = "none";

            var returnDown = false;
            $guessInput.show().focus().keydown(function(event) {
                if (event.which === 13 && returnDown === false) {
                    returnDown = true
                    guess($(this).val(), currentPrize)
                    $(this).val("")
                }
            }).keyup(function(event) {
                if (event.which === 13 && returnDown === true) {
                    returnDown = false
                }
            })

            showMessage(currentPrize + "! " + currPlayerName() + ", please guess a letter.", false)

        }

        prize = -1;
        jumps = 0;

        // 2. Still running
    } else {
        // The speed before entering the key lottery stage (the appetizer turns special effects)
        if (jumps < minimum_jumps) {
            speed -= 5; // 加快
            // Determine the location of the prize
        } else if (jumps === minimum_jumps) {
            const random_number = generatePrizeNumber();
            prize = random_number;
        } else {
            // The next one is to slow down when it comes to prizes
            if ((jumps > minimum_jumps + 10) && prize === (current_index + 1)) {
                speed += 600;
            } else {
                speed += 20; // slow down
            }
        }
        if (speed < 40) {
            speed = 40;
        }

        timer = setTimeout(controllSpeed, speed);
    }

}

/* --------------------------------------------------------------- */

function init() {
    jumps = 0;
    speed = 100;
    prize = -1;
    controllSpeed()
}

$(document).ready(() => {
    $('#js-start').on('click', init);
});