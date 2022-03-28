// initializations needed

// for the cards section
let openCards = [];

// for the moves. a counter that will be the moves value after click on the cards
let number = 0;

// once full with the cards.length match is won
let matchCards = []

// for time, a counter that will be the time value
let timenum = 0

// list of important elements called her to be used everywhere in the code
const star = document.querySelector('.stars')
let header = document.querySelector('.modal-header')
let modalContent = document.querySelector('.modal-content')
let modalFooter = document.querySelector('.modal-footer')
let startButton = document.querySelector('.start-button')

// creating the element used in the countdown
var countdown = document.createElement('div')
modalContent.append(countdown)

// TODO: starting the game
const modal = document.querySelector('.modal')
const startGame = () => {

    // showing the modal
    modal.classList.add('is-visible')
}

// modal button to start the game when clicked
startButton.addEventListener('click', () => {
    let num = 3
    restartSignal = setInterval(() => {
        countdown.textContent = "Starting in " + num
        num--
    }, 1000)
    setTimeout(() => {
        clearInterval(restartSignal)
        modal.classList.remove('is-visible')
        openCards = []
        matchCards = []
        timenum = 0
        moves.textContent = 0
        time.textContent  = 0
        allbutton.forEach((button) => {
            button.classList.remove('open', 'show', 'match')
        })
        timeCount(timeBox)
    }, 3000)
    //
})

//  TODO: Starting the game
startGame()

// number of moves made in the game
let moves = (document.querySelector('.moves'))
moves.textContent =  0

// Time function
let section = document.querySelector('.score-panel')
let time = document.createElement('div')
section.append(time)
//time.classList.add('.time')
let timeBox;
const timeCount = () => {
    timenum = 0
    timeBox = setInterval(() => {
        timenum++
        time.textContent = timenum + ' secs'
    }, 1000)
}

//  TODO: stop counter function
const stopTimeCount = (timeBox) => {
    clearInterval(timeBox)
}

//  TODO: restarting the game
let restart = document.querySelector('.restart')

let restartSignal
// restarting function
const restarting = () => {
    stopTimeCount(timeBox)
    let num = 3
    restartSignal = setInterval(() => {
        console.log("Restarting in " + num)
        num--
    }, 1000)
    setTimeout(() => {
        clearInterval(restartSignal)
        time.textContent  = 0
        moves.textContent = 0
        openCards = []
        matchCards = []
        number = 0;
         // called here to change layout after last game to prevent cheating
        structure()
        let allbutton =document.querySelectorAll('.card');
        allbutton.forEach((button) => {
            button.classList.remove('open', 'show', 'match')
        })
        startGame()
    }, 3000)
}

 // clicking on restart icon at the top of the page
restart.addEventListener('click', restarting)

/*
 * Create a list that holds all of your cards
 */
let deck = document.querySelector('.deck')
const cardList = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o','fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt',
                'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb']

// html pattern of the button (card) element
const htmlPattern = (card) => {
    return(
    `<li data-id="${card}" class="card">
        <i  class="fa ${card}"></i>
    </li>`)
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// TODO: setting up the structure of the cards
const structure = () =>{
    let deck = document.querySelector('.deck')
    cardsPattern = cardList.map((card) => {
        return htmlPattern(card)
    })
    deck.innerHTML = shuffle(cardsPattern).join('')
}

// TODO: calling the structure of the cards
structure()

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// const winnerCardStructure = () => {
//
// }

// Shown when player completes the game
const winner = () => {
    //stop counter when you win
    stopTimeCount(timeBox)
    header.textContent = 'Congratulations!!! You have successfully completed the game'
    // create remaining
    let cancel = document.createElement('button')
    let stats = document.createElement('div')
    let timeStat = document.createElement('p')
    let moveStat = document.createElement('p')
    let starStat = document.createElement('p')

    // adding elements under elements that require them
    modalContent.append(stats)
    modalFooter.append(cancel)
    stats.append(timeStat)
    stats.append(moveStat)
    stats.append(starStat)

    // adjusting the textContent of the below elements to the required place
    moveStat.textContent = `Number of moves: ${moves.textContent}`
    timeStat.textContent = `Used Time: ${time.textContent}`
    starStat.textContent = `Stars: ${star.children.length} / 6`
    cancel.textContent = "Cancel"

    // Cancel game (Not restarting)
    cancel.addEventListener('click', () => {
        modal.classList.remove('is-visible')
    })

    // function to start game already defined at the beginning
    startButton.textContent = 'Restart'
}

// getting the buttons (card)
let allbutton = document.querySelectorAll('.card');

// Each buttons when clicked. the activities that go on with them.
allbutton.forEach((button) => {
    button.addEventListener('click', function(e){
        number++
        moves.textContent =  number
        
        // checkin if selected button has open show or match classes
        if(!button.classList.contains('open') && !button.classList.contains('show') && !button.classList.contains('match')){
            button.classList.add('open', 'show')
            openCards.push(button)
            if(openCards.length >= 2){

                // checking if both elements in the arr are equal
                if(openCards[0].dataset.id === openCards[1].dataset.id){
                    openCards.map((card) => {
                        card.classList.add('match')
                    })
                    //pushing / adding the matched cards to the matchCards array
                    matchCards.push(openCards[0])
                    matchCards.push(openCards[1])

                    //setting openCards arr to empty
                    openCards = []

                    //if the match cards array is equal to the total number of cards, run the winner function
                    if(matchCards.length === allbutton.length){
                        modal.classList.add('is-visible') // show the modal
                        winner()
                    }
                }

                // removing both open and show classes on the elements inside the openCards arr if they are not equal
                setTimeout(() => {
                    openCards.forEach((card) => {
                        card.classList.remove('open', 'show')
                    })
                    openCards = []
                }, 500)
            }
            
            // Reducing the number of stars as the number of moves increases without a win
            if(moves.textContent > 15 &&  moves.textContent < 17 || moves.textContent > 22 &&  moves.textContent < 24
                || moves.textContent > 29 &&  moves.textContent < 31 || moves.textContent > 35 &&  moves.textContent < 37
                || moves.textContent > 45 &&  moves.textContent < 46){
                
                // getting the last element inside the stars class
                let lastStar = star.lastElementChild

                // removing the last child element
                star.removeChild(lastStar)
            }
        }
    })
})
