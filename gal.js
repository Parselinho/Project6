//  var's :
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const reset = document.querySelector('.btn__reset');
const button = document.querySelectorAll('button');
const list = document.querySelector('#phrase ul')
const maxMiss = 5;
let missed = 0;

// array :
const phrases = [
 'I love you',
 'I miss you',
 'I need you',
 'Sir alex ferguson',
 'Man Utd'
]
// eventlistener :
reset.addEventListener('click', (e) => {
 overlay.style.display = 'none';
});

// functions :
function getRandomPhraseAsArray(arr) {
 const maxNumber = Math.floor(Math.random() * phrases.length);
 const phrase = phrases[maxNumber];
 const phraseAfterSplit = phrase.split("");
 return phraseAfterSplit;
}
getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
    const phraseArray = getRandomPhraseAsArray(phrases);
    for (i = 0; i < phraseArray.length; i++) {
      const item = document.createElement('li')
      item.textContent = phraseArray[i].toLowerCase();
      list.append(item);
      if (item.textContent === " ") {
          item.className = "space";
      } else {
          item.className = "letter";
      }
    }
}
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 

function checkLetter(button) {
    const liLetter = document.querySelectorAll(".letter");
    let matchFound = null;
    for (i = 0; i < liLetter.length; i++) {
        if (button.textContent === liLetter[i].textContent) {
            liLetter[i].className += " show";
            liLetter[i].style.transition ="all 1s"
            matchFound = button.textContent;
        } 
    }
    return matchFound;
}
// pressing the right buttons - get the answer
qwerty.addEventListener('click', (e) => {
    console.log(e.target);
if (e.target.tagName === 'BUTTON') {
    e.target.className += " chosen"
    e.target.disabled = true;
    let letterFound = checkLetter(e.target);
// for later case : https://stackoverflow.com/questions/6003884/how-do-i-check-for-null-values-in-javascript
if (!letterFound) { //! = Which will check for empty strings (""), null, undefined, false and the numbers 0 and NaN.
    let lost = document.querySelectorAll(".tries img")[missed]; 
    lost.src= "images/lostHeart.png";
    missed++;
}
checkWin();
} 
});


 function resetGame() {
          const phraseArray = getRandomPhraseAsArray(phrases);
          const liReset = document.querySelectorAll('li');
          let heartReset = document.querySelectorAll(".tries img"); 
          list.innerHTML = "";
          missed = 0;
// image src - restart
          for (i = 0; i < heartReset.length; i++) {
            heartReset[i].src = "images/liveHeart.png";;
          }
          for (i = 0; i < button.length; i++) { // reset button
              button[i].className = "";
              button[i].disabled = false;
          }
          addPhraseToDisplay(phraseArray); // reset phrase
 }
function checkWin() {
    const letter = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show')
    const phraseArray = getRandomPhraseAsArray(phrases);
    if ( letter.length === show.length ) {
        overlay.className = "win";
        overlay.style.display = "flex";
        overlay.children[0].textContent = "Youre better then Ronaldo";
        overlay.children[1].textContent = "It was only a luck?";
        resetGame();
    }
    if ( missed >= maxMiss ) {
        overlay.className = "lose";
        overlay.style.display = "flex";
        overlay.children[0].textContent = "Keep practice and you will be good as Ronaldo"
        overlay.children[1].textContent = "Keep practice"
        resetGame();
    }
}