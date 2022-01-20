let timer = null;
let timeRemaining = 0;


onmessage = function (e) {
  const { startTimer, time } = e.data
  if (startTimer) {
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
    timeRemaining--
    postMessage(timeRemaining)
  }
  else clearInterval(timer)
}