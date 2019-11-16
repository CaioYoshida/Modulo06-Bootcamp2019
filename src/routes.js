import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import Webpage from './pages/Webpage';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      Webpage,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          flex: 1,
        },
      },
    }
  )
);

export default Routes;
