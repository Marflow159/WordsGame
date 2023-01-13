"use strict"

let array = [`один`,
    `машина`,
    `велосипед`,
    `годинник`,
    `ромашка`,
    `іменинник`,
    `клас`,
    `група`,
    `клен`,
    `верба`,
    `береза`,
    `олень`,
    `какаду`,
    `дельфін`,
    `лінія`,
    `стіна`,
    `земля`,
    `косинус`,
    `молекула`,
    `крапка`,
    `слово`,
    `калина`,
    `чорнобривець`,
    `банкомат`,
    `медсестра`,
    `соловей`,
    `суфікс`,
    `метафора`,
    `підмет`,
    `вексель`,
    `абсциса`,
    `епітет`,
    `есе`,
    `земля`,
    `поле`,
    `ручка`,
    `лин`,
    `математика`,
    `умань`,
    `катет`,
    `меридіан`,
    `краб`,
    `корабель`,
    `журавель`,
    `рукав`,
    `гніздо`,
    `земля`,
    `море`,
    'київ',
    'відмінок',
    'ангіна',
    `україна`,
    `патріот`,
    `герб`,
    'тепло',
    'ряд',
    'дід',
    'багаж',
    'клімат',
    'вишня',
    `голова`,
    `прикметник`,
    `крапка`,
    `жайворонок`,
    `ластівка`,
    `лінія`,
    `слово`,
    `вушко`,
    `бджола`,
    `Маріуполь`,
    `парта`,
]

let main_box = document.querySelector(`.main_box`)
let inputLetter = document.querySelector(`input`)
let butLetter = document.querySelector(`button`)
let heard = document.querySelector(`.heard div`)
let score = document.querySelector(`.score div`)

let random = Math.floor(Math.random() * array.length)

let numOfHeards = 10;
let numOfScore = 0;



if (localStorage.getItem(`gameOver`) !== null){
    getGameOver()
}

if (+localStorage.getItem(`score`) > 0){
    scoreStats()
}

if (localStorage.getItem(`word`) == null ){
    createArray()
}else {
    showArray(localStorage.getItem(`word`))
}

function createArray(){
    array.forEach((e,i) =>{
        if (random === 0 && random === i){
            showArray(e)
        } else if (random - 1  === i){
            showArray(e)
        }
    })
}


function showArray(word) {
    let randomArray = word.split(``)

    localStorage.setItem(`word`,word)

    randomArray.forEach((e,i) =>{
        createBox(e,i)
    })
}

function createBox(letter ){
    let box = document.createElement(`div`)
    box.classList.add(`box`)
    box.innerHTML = `<p>${letter}</p>`
    main_box.append(box)

    let p = document.querySelectorAll(`.main_box p`)
    p.forEach((e) =>{
        e.classList.remove(`show`)
        e.classList.add(`hide`)
    })
}

if (localStorage.getItem(`badLetters`) !== null && localStorage.getItem(`badLetters`) !== null){
    getGoodLetters()
    getBadLetters()
    heardStats()
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
                localStorage.setItem(`heard`, numOfHeards)

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
    pushBadLetters()
    pushGoodLetters()

    let showText = document.querySelectorAll(`.show`)

    if (showText.length === pLetter.length){
        numOfScore++
        console.log(numOfScore);

        score.textContent = `${numOfScore}`
        localStorage.setItem(`score`,`${numOfScore}`)

        localStorage.removeItem(`badLetters`)
        localStorage.removeItem(`goodLetters`)
        localStorage.removeItem(`word`)
        localStorage.removeItem(`heard`)

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

function pushBadLetters(){
    let badboxs = document.querySelectorAll(`.badBox`)
    let badLetter = []

    for (const badbox of badboxs) {
        badLetter.push(badbox.textContent)
    }

    localStorage.setItem(`badLetters`, `${JSON.stringify(badLetter)}`)
}

function getBadLetters() {
    let badLetters = localStorage.getItem(`badLetters`)
    let objBadLetters= JSON.parse(badLetters)

    objBadLetters.forEach(e =>{
        placeBadBox(e)
    })
}

function pushGoodLetters(){
    let goodP = document.querySelectorAll(`.box p`)
    let goodLetter = []

    goodP.forEach((e,i)=>{
        if (e.classList.contains(`show`)){
            goodLetter.push(i)
        }
    })
    localStorage.setItem('goodLetters', JSON.stringify(goodLetter))
}

function getGoodLetters() {
    let goodLetters = localStorage.getItem(`goodLetters`)
    let objGoodLetters = JSON.parse(goodLetters)

    let goodP = document.querySelectorAll(`.box p`)
    console.log(goodP);
    goodP.forEach((elem,i) =>{
        objGoodLetters.forEach(e =>{
            if (e === i){
                elem.classList.remove(`hide`)
                elem.classList.add(`show`)
            }
        })
    })
}

function gameOver() {
    let over = {
        flexBox: `flex`,
        scores: `Рахунок: ${numOfScore}`,
        word: `<br/>${localStorage.getItem(`word`)}`
    }

    localStorage.setItem(`gameOver`, JSON.stringify(over))
    document.querySelector(`.opacity`).style.display = `flex`
    document.querySelector(`.gameOver`).style.display = `flex`
    document.querySelector(`.gameOver div p:last-of-type`).textContent = `Рахунок: ${numOfScore}`
    document.querySelector(`.gameOver div p:nth-of-type(2) span`).innerHTML = `<br/>${localStorage.getItem(`word`)}`

    let gameOverButton = document.querySelector(`.gameOver div button`)

    gameOverButton.addEventListener(`click`, ()=>{
        location.replace(`index.html`)
        localStorage.clear()
        numOfScore = 0
    })
}

function getGameOver(){
    let gameIsOver = JSON.parse(localStorage.getItem(`gameOver`))
    document.querySelector(`.opacity`).style.display = `${gameIsOver.flexBox}`
    document.querySelector(`.gameOver`).style.display = `${gameIsOver.flexBox}`
    document.querySelector(`.gameOver div p:last-of-type`).textContent = `${gameIsOver.scores}`
    document.querySelector(`.gameOver div p:nth-of-type(2) span`).innerHTML = `${gameIsOver.word}`

    let gameOverButton = document.querySelector(`.gameOver div button`)

    gameOverButton.addEventListener(`click`, ()=>{
        location.replace(`index.html`)
        localStorage.clear()
        numOfScore = 0
    })
}

function scoreStats(){
    numOfScore = +localStorage.getItem('score')
    score.textContent = numOfScore;
}
function heardStats(){
    numOfHeards = +localStorage.getItem(`heard`)
    heard.textContent = numOfHeards
}

