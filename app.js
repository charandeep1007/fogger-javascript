const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsleft = document.querySelectorAll('.log-left')
const logsright = document.querySelectorAll('.log-right')
const carsleft = document.querySelectorAll('.car-left')
const carsright = document.querySelectorAll('.car-right')

console.log(squares)
let currIndex = 76
const width = 9
let timerId
let currTime = 20
let outComeTimerId
function moveFrog(e){
    squares[currIndex].classList.remove('frog')
    switch (e.key){
        case 'ArrowLeft':
            if(currIndex % width !==0) currIndex -=1
            break
        case 'ArrowRight':
            if(currIndex % width <width-1) currIndex +=1
            break
        case 'ArrowUp':
            if(currIndex - width >=0) currIndex -=width
            break
        case 'ArrowDown':
            if(currIndex +width < width * width) currIndex +=width
            break
    }
    squares[currIndex].classList.add('frog')
}


function autoMoveElements(){
    currTime--
    timeLeftDisplay.textContent = currTime
    logsleft.forEach(logleft => moveLogLeft(logleft))
    logsright.forEach(logright => moveLogRight(logright))
    carsleft.forEach(carleft => moveCarsLeft(carleft))
    carsright.forEach(carright => moveCarsRight(carright))

}
function chechOutcomes(){
    loose()
    win()
}


function moveLogLeft(logleft){
    switch (true){
        case logleft.classList.contains('l1'):
            logleft.classList.remove('l1')
            logleft.classList.add('l2')
            break
        case logleft.classList.contains('l2'):
            logleft.classList.remove('l2')
            logleft.classList.add('l3')
            break
        case logleft.classList.contains('l3'):
            logleft.classList.remove('l3')
            logleft.classList.add('l4')
            break
        case logleft.classList.contains('l4'):
            logleft.classList.remove('l4')
            logleft.classList.add('l5')
            break
        case logleft.classList.contains('l5'):
            logleft.classList.remove('l5')
            logleft.classList.add('l1')
            break

    }
}
function moveLogRight(logright){
    switch (true){
        case logright.classList.contains('l1'):
            logright.classList.remove('l1')
            logright.classList.add('l5')
            break
        case logright.classList.contains('l2'):
            logright.classList.remove('l2')
            logright.classList.add('l1')
            break
        case logright.classList.contains('l3'):
            logright.classList.remove('l3')
            logright.classList.add('l2')
            break
        case logright.classList.contains('l4'):
            logright.classList.remove('l4')
            logright.classList.add('l3')
            break
        case logright.classList.contains('l5'):
            logright.classList.remove('l5')
            logright.classList.add('l4')
            break

    }
}
function moveCarsLeft(carleft){
    switch (true){
        case carleft.classList.contains('c1'):
            carleft.classList.remove('c1')
            carleft.classList.add('c2')
            break
        case carleft.classList.contains('c2'):
            carleft.classList.remove('c2')
            carleft.classList.add('c3')
            break
        case carleft.classList.contains('c3'):
            carleft.classList.remove('c3')
            carleft.classList.add('c1')
            break
    }

}

function moveCarsRight(carright){
    switch (true){
        case carright.classList.contains('c1'):
            carright.classList.remove('c1')
            carright.classList.add('c3')
            break
        case carright.classList.contains('c2'):
            carright.classList.remove('c2')
            carright.classList.add('c1')
            break
        case carright.classList.contains('c3'):
            carright.classList.remove('c3')
            carright.classList.add('c2')
            break
    }

}
function loose(){
    if(squares[currIndex].classList.contains('c1')||
        squares[currIndex].classList.contains('l4')||
        squares[currIndex].classList.contains('l5')||
        currTime <=0
    ){
        resultDisplay.textContent = 'you loose!!'
        clearInterval(timerId)
        clearInterval(outComeTimerId)
        squares[currIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    }
}

function win(){
    if(squares[currIndex].classList.contains('ending-block')){
        resultDisplay.textContent = 'you win!!'
        clearInterval(timerId)
        clearInterval(outComeTimerId)
        document.removeEventListener('keyup',moveFrog)
    }
}
startPauseButton.addEventListener('click',() =>{
    if(timerId){
        clearInterval(timerId)
        clearInterval(outComeTimerId)
        outComeTimerId = null
        timerId = null
        document.removeEventListener('keyup', moveFrog)
    }
    else {
        timerId = setInterval(autoMoveElements, 1000)
        outComeTimerId = setInterval(chechOutcomes,50 )
        document.addEventListener('keyup',moveFrog)
    }
})

