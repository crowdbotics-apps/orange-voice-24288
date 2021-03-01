import { createStackNavigator } from "react-navigation-stack";

import Blank from "./screens/blank";

export default BlankBlueprintNavigator = createStackNavigator(
  {
    Blank: { screen: Blank }
  },
  {
    initialRouteName: "Blank"
  }
);
