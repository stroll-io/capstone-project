import { createStackNavigator } from 'react-navigation';

import LoginScreen from './Login';
import RegisterScreen from './Register';
import WelcomeScreen from './Welcome'

const WelcomeNav = createStackNavigator(
    {Home: {screen:WelcomeScreen},
      Login: {screen:LoginScreen},
      Register: {screen:RegisterScreen},
    },
    {
      initialRouteName: 'Home',
    }
  );
  
export default WelcomeNav;