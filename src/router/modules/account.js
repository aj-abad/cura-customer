import Email from '../../views/Account/Email'
import SignUp from '../../views/Account/SignUp'
import VerifyEmail from '../../views/Account/VerifyEmail'
const routes = [
  {
    path: '/account/email',
    name: 'Email',
    component: Email,
    meta: {
      depth: 1
    }
  },
  {
    path: '/account/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      depth: 2
    }
  },
  {
    path: '/account/verifyemail',
    name: 'VerifyEmail',
    component: VerifyEmail,
    meta: {
      depth: 3
    }
  }
]

export default routes
