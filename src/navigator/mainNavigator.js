import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import SplashScreen from "../features/SplashScreen";
import SideMenu from './sideMenu';
//@BlueprintImportInsertion
import BlankScreen6202533Navigator from '../features/BlankScreen6202533/navigator';
import BlankScreen5202532Navigator from '../features/BlankScreen5202532/navigator';
import BlankScreen4202531Navigator from '../features/BlankScreen4202531/navigator';
import BlankScreen3202530Navigator from '../features/BlankScreen3202530/navigator';
import BlankScreen2202515Navigator from '../features/BlankScreen2202515/navigator';
import BlankScreen1202514Navigator from '../features/BlankScreen1202514/navigator';
import BlankScreen0202262Navigator from '../features/BlankScreen0202262/navigator';

/**
 * new navigators can be imported here
 */

const AppNavigator = {

    //@BlueprintNavigationInsertion
BlankScreen6202533: { screen: BlankScreen6202533Navigator },
BlankScreen5202532: { screen: BlankScreen5202532Navigator },
BlankScreen4202531: { screen: BlankScreen4202531Navigator },
BlankScreen3202530: { screen: BlankScreen3202530Navigator },
BlankScreen2202515: { screen: BlankScreen2202515Navigator },
BlankScreen1202514: { screen: BlankScreen1202514Navigator },
BlankScreen0202262: { screen: BlankScreen0202262Navigator },

    /** new navigators can be added here */
    SplashScreen: {
      screen: SplashScreen
    }
};

const DrawerAppNavigator = createDrawerNavigator(
  {
    ...AppNavigator,
  },
  {
    contentComponent: SideMenu
  },
);

const AppContainer = createAppContainer(DrawerAppNavigator);

export default AppContainer;
