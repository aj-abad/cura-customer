
const root = document.querySelector(":root")

const setClipTransitionRadius = () => {
  root.style.setProperty("--clip-transition-radius", `${Math.pow((Math.pow(window.innerHeight), 2) + Math.pow(window.innerWidth, 2), 0.5) + 20}px`);
}

setClipTransitionRadius()
window.addEventListener("resize", setClipTransitionRadius)
