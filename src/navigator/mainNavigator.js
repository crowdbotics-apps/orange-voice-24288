import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import SplashScreen from "../features/SplashScreen";
import SideMenu from './sideMenu';
//@BlueprintImportInsertion
import CopyOfBlankScreen48210088Navigator from '../features/CopyOfBlankScreen48210088/navigator';
import CopyOfBlankScreen47210086Navigator from '../features/CopyOfBlankScreen47210086/navigator';
import CopyOfBlankScreen47210085Navigator from '../features/CopyOfBlankScreen47210085/navigator';
import CopyOfBlankScreen47210084Navigator from '../features/CopyOfBlankScreen47210084/navigator';
import CopyOfBlankScreen47210083Navigator from '../features/CopyOfBlankScreen47210083/navigator';
import BlankScreen48210082Navigator from '../features/BlankScreen48210082/navigator';
import BlankScreen47210081Navigator from '../features/BlankScreen47210081/navigator';
import CopyOfBlankScreen7210080Navigator from '../features/CopyOfBlankScreen7210080/navigator';
import BlankScreen0203168Navigator from '../features/BlankScreen0203168/navigator';
import BlankScreen1203167Navigator from '../features/BlankScreen1203167/navigator';
import BlankScreen2203166Navigator from '../features/BlankScreen2203166/navigator';
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
CopyOfBlankScreen48210088: { screen: CopyOfBlankScreen48210088Navigator },
CopyOfBlankScreen47210086: { screen: CopyOfBlankScreen47210086Navigator },
CopyOfBlankScreen47210085: { screen: CopyOfBlankScreen47210085Navigator },
CopyOfBlankScreen47210084: { screen: CopyOfBlankScreen47210084Navigator },
CopyOfBlankScreen47210083: { screen: CopyOfBlankScreen47210083Navigator },
BlankScreen48210082: { screen: BlankScreen48210082Navigator },
BlankScreen47210081: { screen: BlankScreen47210081Navigator },
CopyOfBlankScreen7210080: { screen: CopyOfBlankScreen7210080Navigator },
BlankScreen0203168: { screen: BlankScreen0203168Navigator },
BlankScreen1203167: { screen: BlankScreen1203167Navigator },
BlankScreen2203166: { screen: BlankScreen2203166Navigator },
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
