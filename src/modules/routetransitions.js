const routeTransitions = new Map([
  ["Start-Email", "slide-parallax-push"],
  ["Email-Start", "slide-parallax-pop"],
  ["VerifyEmail-WelcomeNewUser", "clip-push"],
  ["SignIn-WelcomeNewUser", "clip-push"],
  ["WelcomeNewUser-BasicInfo", "slide-parallax-push"],
])

export default routeTransitions