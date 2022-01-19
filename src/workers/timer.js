let timer = null;

onmessage = function (e) {
  if (e.timerStarted)
    timer = setInterval(() => {
      x()
    }, 1000)
}

const x = () => {
  postMessage(1)
}
