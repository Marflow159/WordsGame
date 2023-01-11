"use strict"


let array = [`один`,`машина`,`велосипед`,`годинник`,`ромашка`,`іменинник`,`клас`,`група`,]

let main_box = document.querySelector(`.main_box`)
let inputLetter = document.querySelector(`input`)
let butLetter = document.querySelector(`button`)
let heards = document.querySelectorAll(`img`)

let random = Math.floor(Math.random() * array.length)

let numOfHeards = 4;
let numOf;

butLetter.addEventListener(`click`, checkLetter)

inputLetter.addEventListener(`keyup`, e =>{
    if( e.code === 'Enter' ) checkLetter()
})

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
        console.log(e,i)
    })
}

function createBox(letter, order ){
    let box = document.createElement(`div`)
    box.classList.add(`box`)
    box.classList.add(`n${order }`)
    box.innerHTML = `<p>${letter}</p>`

    main_box.append(box)

    let p = document.querySelectorAll(`p`)
    p.forEach((e,i) =>{
        e.style.display = `none`
    })
}

function checkLetter() {
    console.log(inputLetter.value)
    if (inputLetter.value.length === 0){
        alert(`напишіть букву`)
    }else if (inputLetter.value === `1` && `2` && `3` && `4` && `5` && `6` && `7` && `8` && `9` && `0`){
        inputLetter.style.border = `1px solid red`
        alert(`букви`)
    }else{
        if (inputLetter.value.length >= 2){
            inputLetter.style.border = `1px solid red`
            alert(`забагато символів`)
        }else{
            inputLetter.style.border = `1px solid grey`

            let pLetter = document.querySelectorAll(`p`)

            for(let letter of pLetter){
                if (inputLetter.value === letter.textContent){
                    letter.style.display = `block`
                    numOf = 1;
                    break;
                }else{
                    numOf = 0
                }
            }

            if (numOf === 0){
                heards.forEach((e,i) =>{
                    if (numOfHeards === i){
                        e.src = `photos/heard.png`
                        numOfHeards--

                        if(inputLetter.value.length > 0){
                            let badLetters = document.querySelector(`.letters`)
                            let badLetter = document.createElement(`div`)

                            badLetter.classList.add(`badBox`)
                            badLetter.textContent = inputLetter.value

                            badLetters.append(badLetter)
                        }

                    }
                })
            }

        }
    }
}




