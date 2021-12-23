/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import AccessTokenFromHttpCookie, {
  AccessTokenFromHttpCookieScreen,
} from './client/screens/AccessTokenFromHttpCookie';
import AccessTokenFromScriptCookie, {
  AccessTokenFromScriptCookieScreen,
} from './client/screens/AccessTokenFromScriptCookie';
import CommunicateToken, {
  CommunicateTokenScreen,
} from './client/screens/CommunicateTokenScreen';
import MechanismsList, {MechanismsListScreen} from './client/MechanismsList';

// Register Screens
Navigation.registerComponent(MechanismsListScreen, () => MechanismsList);
Navigation.registerComponent(
  AccessTokenFromHttpCookieScreen,
  () => AccessTokenFromHttpCookie,
);
Navigation.registerComponent(
  AccessTokenFromScriptCookieScreen,
  () => AccessTokenFromScriptCookie,
);
Navigation.registerComponent(CommunicateTokenScreen, () => CommunicateToken);

const root = {
  stack: {
    children: [
      {
        component: {
          name: MechanismsListScreen,
        },
      },
    ],
  },
};

// Initialize App Navigation
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({root});
});
