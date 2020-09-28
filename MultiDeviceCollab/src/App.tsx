import React, {FunctionComponent} from 'react';
import {DrawingZone} from './pages/DrawingZone/DrawingZone.component';
import {SwipeConfiguration} from './pages/SwipeConfiguration/SwipeConfiguration.component';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParamList = {
  DrawingZone: undefined;
  SwipeConfiguration: undefined;
};
export enum RootNavigatorRouteNames {
  SwipeConfiguration = 'SwipeConfiguration',
  DrawingZone = 'DrawingZone',
}
const Stack = createStackNavigator<RootStackParamList>();

const App: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={RootNavigatorRouteNames.DrawingZone}
          component={DrawingZone}
        />
        <Stack.Screen
          name={RootNavigatorRouteNames.SwipeConfiguration}
          component={SwipeConfiguration}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
