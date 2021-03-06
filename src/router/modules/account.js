import Email from '../../views/Account/Email'
import SignUp from '../../views/Account/SignUp'
import SignIn from '../../views/Account/SignIn'
import VerifyEmail from '../../views/Account/VerifyEmail'
import WelcomeNewUser from "../../views/Account/WelcomeNewUser";
import AccountSetup from "../../views/Account/Setup/Index";
import BasicInfo from "../../views/Account/Setup/BasicInfo";
import Mobile from "../../views/Account/Setup/Mobile"
import ProfilePhoto from "../../views/Account/Setup/ProfilePhoto";
import Confirmation from "../../views/Account/Setup/Confirmation";

const routes = [
  {
    path: '/account/email',
    name: 'Email',
    component: Email,
    meta: {
      depth: 1,
      requireGuest: true,
    }
  },
  {
    path: '/account/signin',
    name: 'SignIn',
    component: SignIn,
    meta: {
      depth: 2,
      requireGuest: true,
    }
  },
  {
    path: '/account/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      depth: 2,
      requireGuest: true,
    }
  },
  {
    path: '/account/verifyemail',
    name: 'VerifyEmail',
    component: VerifyEmail,
    meta: {
      depth: 3,
      requireGuest: true,
    }
  },
  {
    path: '/account/welcome',
    name: "WelcomeNewUser",
    component: WelcomeNewUser,
    meta: {
      depth: 4,
      userStatus: [2]
    }
  },
  {
    path: '/account/setup',
    component: AccountSetup,
    name: "AccountSetup",
    children: [{
      path: 'basicinfo',
      name: 'BasicInfo',
      component: BasicInfo,
      meta: {
        depth: 5,
        step: 1,
      },
    },
    {
      path: 'mobile',
      name: 'Mobile',
      component: Mobile,
      meta: {
        depth: 6,
        step: 2,
      }
    },
    {
      path: 'profilephoto',
      name: 'ProfilePhoto',
      component: ProfilePhoto,
      meta: {
        depth: 7,
        step: 3,
      }
    },
    {
      path: 'confirmation',
      name: 'Confirmation',
      component: Confirmation,
      meta: {
        depth: 8,
        step: 4,
      }
    }
    ],
  }
]

export default routes
