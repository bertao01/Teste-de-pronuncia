const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

msgEl.innerHTML = randomNum

window.SpeechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition()

// Start recognition and game
recognition.start()

// Capture user speak
function onSpeak(e){
  const msg = e.results[0][0].transcript

  writeMessage(msg)
  checkNumber(msg)
}

// Write message 
function writeMessage(msg){
  msgEl.innerHTML = `
    <div>Você disse: ${msg}</div>
    <span class="box">O número certo é ${randomNum}</span>
  `
}

// Check message against number
function checkNumber(msg){
  const num = +msg

  // Check if valid number
  if(Number.isNaN(num)){
    msgEl.innerHTML += '<div>Este não é um número válido</div>'
    return
  }

  // Check number 
  if( num === randomNum ){
    document.body.innerHTML = `
      <h2>Parabéns, sua pronúncia de ${num} está correta</h2>
      <button class="play-again" id="play-again"> Próximo número</button>
    `
  } else if( num !== randomNum ) {
    msgEl.innerHTML += `<div>tente novamente</div>`
  }
}

// Generate random number 
function getRandomNumber(){
  return Math.floor(Math.random() * 100 ) + 1 
}

// Speak result
recognition.addEventListener('result', onSpeak)

// End SR Service
recognition.addEventListener('end', () => recognition.start())

document.body.addEventListener('click', (e) => {
  if (e.target.id === 'play-again'){
    window.location.reload()
  }
})

