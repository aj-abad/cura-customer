
const clipTransition = document.createElement("STYLE")
clipTransition.setAttribute("data-clip-transition", "")
//set to diagonal of screen plus 20px for padding
const clipRadius = Math.pow((Math.pow(window.innerHeight), 2) + Math.pow(window.innerWidth, 2), 0.5) + 20
clipTransition.innerHTML = `
:root {
  --clip-transition-radius: ${clipRadius}px;
}
`
document.head.appendChild(clipTransition)

//TODO window resize event