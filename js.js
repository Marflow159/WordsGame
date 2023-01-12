"use strict"

let array = [`один`,`машина`,`велосипед`,`годинник`,`ромашка`,`іменинник`,`клас`,`група`,]

let main_box = document.querySelector(`.main_box`)
let inputLetter = document.querySelector(`input`)
let butLetter = document.querySelector(`button`)
let heard = document.querySelector(`.heard div`)
let score = document.querySelector(`.score div`)

let random = Math.floor(Math.random() * array.length)


let numOfHeards = 10;
let numOfScore = 0;

if (+localStorage.getItem(`score`) > 0){
    localStore()
}

array.forEach((e,i) =>{
    if (random === 0 && random === i){
        showArray(e)
    } else if (random - 1  === i){
        showArray(e)
    }
})

function showArray(word) {
    let randomArray = word.split(``)

    randomArray.forEach((e,i) =>{
        createBox(e,i)
    })
}

function createBox(letter, order ){
    let box = document.createElement(`div`)
    box.classList.add(`box`)
    box.innerHTML = `<p>${letter}</p>`
    main_box.append(box)

    let p = document.querySelectorAll(`.main_box p`)
    p.forEach((e,i) =>{
        e.classList.remove(`show`)
        e.classList.add(`hide`)
    })
}

butLetter.addEventListener(`click`, checkLetter)

inputLetter.addEventListener(`keypress`, e =>{
    if( e.code === 'Enter' ) checkLetter()
})

function checkLetter() {
    let letterInput = inputLetter.value.toLowerCase()
    let pLetter = document.querySelectorAll(`.main_box p`)
    if (letterInput.length === 0){
        inputLetter.placeholder = `введіть букву`
    }else if (letterInput === `1` && `2` && `3` && `4` && `5` && `6` && `7` && `8` && `9` && `0`){
        inputLetter.style.border = `2px solid red`
        inputLetter.placeholder = `введіть букву`
    }else{
        if (letterInput.length >= 2){
            inputLetter.style.border = `2px solid red`
            inputLetter.placeholder = `забагато символів`
        }else{
            inputLetter.style.border = `2px solid grey`
            let numYes;
            let numNo = 0;

            for(let letter of pLetter){
                if (letterInput === letter.textContent ){
                    numYes = 1
                    break
                }else {
                    numNo = numNo + 1
                }
            }

            if (numYes === 1){
                for(let letter of pLetter){
                    if (letterInput === letter.textContent ){
                        letter.classList.remove(`hide`)
                        letter.classList.add(`show`)
                    }
                }
                numNo = 0;
                numYes = 0;
            }

            if (numNo === pLetter.length){
                numOfHeards--
                heard.textContent = `${numOfHeards}`;

                let badBoxs = document.querySelectorAll(`.badBox`)
                let noBad = 0;

                if (badBoxs.length === 0){
                    placeBadBox(letterInput)
                }else {
                    for (const badBox of badBoxs) {
                        if (badBox.textContent === letterInput){
                            break
                        }else {
                            noBad = noBad + 1;
                        }
                    }
                    if(noBad === badBoxs.length){
                        placeBadBox(letterInput)
                    }
                }

                numNo = 0;
                noBad = 0;
            }

        }
    }
    inputLetter.value = ``

    if (numOfHeards === 0) {
        gameOver()
    }

    let showText = document.querySelectorAll(`.show`)

    if (showText.length === pLetter.length){
        numOfScore++
        score.textContent = `${numOfScore}`
        localStorage.setItem(`score`,`${numOfScore}`)
        location.reload()
    }
}

function placeBadBox(letter) {
    if(letter.length > 0){
        let badLetters = document.querySelector(`.letters`)
        let badLetter = document.createElement(`div`)

        badLetter.classList.add(`badBox`)
        badLetter.textContent = letter

        badLetters.append(badLetter)
    }
}

function gameOver() {
    let opacity = document.querySelector(`.opacity`)
    let gameOverBox = document.querySelector(`.gameOver`)
    let scoreText = document.querySelector(`.gameOver div p:last-of-type`)
    let gameOverButton = document.querySelector(`.gameOver div button`)

    opacity.style.display = `flex`
    gameOverBox.style.display = `flex`

    scoreText.textContent = `Рахунок: ${numOfScore}`

    gameOverButton.addEventListener(`click`, ()=>{
        location.reload()
        localStorage.clear()
        numOfScore = 0
    })
}
function localStore(){
    let localScore = localStorage.getItem(`score`)
    numOfScore = localScore
    console.log(numOfScore);
    score.textContent = `${numOfScore}`
}


