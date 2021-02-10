import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import SplashScreen from "../features/SplashScreen";
import SideMenu from './sideMenu';
//@BlueprintImportInsertion
import BlankScreen4203165Navigator from '../features/BlankScreen4203165/navigator';
import BlankScreen5203164Navigator from '../features/BlankScreen5203164/navigator';
import BlankScreen6203163Navigator from '../features/BlankScreen6203163/navigator';
import BlankScreen7203162Navigator from '../features/BlankScreen7203162/navigator';
import BlankScreen0203143Navigator from '../features/BlankScreen0203143/navigator';
import BlankScreen1203142Navigator from '../features/BlankScreen1203142/navigator';
import BlankScreen2203141Navigator from '../features/BlankScreen2203141/navigator';
import BlankScreen4203140Navigator from '../features/BlankScreen4203140/navigator';
import BlankScreen5203139Navigator from '../features/BlankScreen5203139/navigator';
import BlankScreen6203138Navigator from '../features/BlankScreen6203138/navigator';
import BlankScreen7203137Navigator from '../features/BlankScreen7203137/navigator';
import BlankScreen7202758Navigator from '../features/BlankScreen7202758/navigator';
import BlankScreen6202533Navigator from '../features/BlankScreen6202533/navigator';
import BlankScreen5202532Navigator from '../features/BlankScreen5202532/navigator';
import BlankScreen4202531Navigator from '../features/BlankScreen4202531/navigator';
import BlankScreen2202515Navigator from '../features/BlankScreen2202515/navigator';
import BlankScreen1202514Navigator from '../features/BlankScreen1202514/navigator';
import BlankScreen0202262Navigator from '../features/BlankScreen0202262/navigator';

/**
 * new navigators can be imported here
 */

const AppNavigator = {

    //@BlueprintNavigationInsertion
BlankScreen4203165: { screen: BlankScreen4203165Navigator },
BlankScreen5203164: { screen: BlankScreen5203164Navigator },
BlankScreen6203163: { screen: BlankScreen6203163Navigator },
BlankScreen7203162: { screen: BlankScreen7203162Navigator },
BlankScreen0203143: { screen: BlankScreen0203143Navigator },
BlankScreen1203142: { screen: BlankScreen1203142Navigator },
BlankScreen2203141: { screen: BlankScreen2203141Navigator },
BlankScreen4203140: { screen: BlankScreen4203140Navigator },
BlankScreen5203139: { screen: BlankScreen5203139Navigator },
BlankScreen6203138: { screen: BlankScreen6203138Navigator },
BlankScreen7203137: { screen: BlankScreen7203137Navigator },
BlankScreen7202758: { screen: BlankScreen7202758Navigator },
BlankScreen6202533: { screen: BlankScreen6202533Navigator },
BlankScreen5202532: { screen: BlankScreen5202532Navigator },
BlankScreen4202531: { screen: BlankScreen4202531Navigator },
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
