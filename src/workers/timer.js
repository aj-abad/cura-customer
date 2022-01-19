let timer = null;
let timeRemaining = 0;


onmessage = function (shouldStart = false, time = 0) {
  if (shouldStart) {
    timeRemaining = time;
    timer = setInterval(() => {
      increment()
    }, 1000)
  }
  else {
    timeRemaining = 0;
    clearInterval(timer)
  }
}

const increment = () => {
  if (timeRemaining > 0) {
    postMessage()
    timeRemaining--
  }
  else clearInterval(timer)
}