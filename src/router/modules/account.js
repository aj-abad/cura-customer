import Email from '../../views/Account/Email'
import SignUp from '../../views/Account/SignUp'
import SignIn from '../../views/Account/SignIn'
import VerifyEmail from '../../views/Account/VerifyEmail'
import AccountSetup from "../../views/Account/Setup/Index";
import WelcomeNewUser from "../../views/Account/WelcomeNewUser";

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
    path: '/account/signin',
    name: 'SignIn',
    component: SignIn,
    meta: {
      depth: 2
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
  },
  {
    path: '/account/welcome',
    name: "WelcomeNewUser",
    component: WelcomeNewUser,
    meta: {
      depth: 4
    }
  },
  {
    path: '/account/setup',
    component: AccountSetup,
    children: [
      {
        path: '',
        name: 'AccountSetup',
        meta: {
          depth: 4
        }
      }
    ],
  }
]

export default routes
