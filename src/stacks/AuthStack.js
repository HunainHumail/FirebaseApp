import {LoginScreen, SignUpScreen} from '../containers';

export const AuthStack = [
  {
    name: 'LoginScreen',
    component: LoginScreen,
    key: 'LoginScreen',
  },
  {
    name: 'SignUpScreen',
    component: SignUpScreen,
    key: 'SignUpScreen',
  },
];
