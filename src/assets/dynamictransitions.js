
const clipTransition = document.createElement("STYLE")
clipTransition.setAttribute("data-clip-transition", "")
const clipRadius = Math.pow((Math.pow(window.innerHeight / 2), 2) + Math.pow(window.innerWidth / 2, 2), 0.5)
clipTransition.innerHTML = `
:root {
  --clip-transition-radius: ${clipRadius}px;
}
`
document.head.appendChild(clipTransition)

//TODO window resize event