
const root = document.querySelector(":root")

const setClipTransitionRadius = () => {
  const hyp = Math.sqrt((Math.pow(window.innerHeight, 2)) + (Math.pow(window.innerWidth, 2)))
  const duration = hyp * 0.6 / 380
  root.style.setProperty("--clip-transition-radius", `${hyp + 5}px`);
  root.style.setProperty("--clip-transition-duration", `${duration}s`)
}

setClipTransitionRadius()
window.addEventListener("resize", setClipTransitionRadius)
