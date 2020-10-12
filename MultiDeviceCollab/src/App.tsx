import React, {FunctionComponent, useEffect} from 'react';
import {DrawingZone} from './pages/DrawingZone/DrawingZone.component';
import {SwipeConfiguration} from './pages/SwipeConfiguration/SwipeConfiguration.component';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {modifyPostit} from './Store/Reducers/modifyPostitReducer.tsx';

export type RootStackParamList = {
  DrawingZone: undefined;
  SwipeConfiguration: undefined;
};
export enum RootNavigatorRouteNames {
  SwipeConfiguration = 'SwipeConfiguration',
  DrawingZone = 'DrawingZone',
}
const Stack = createStackNavigator<RootStackParamList>();

const Store = createStore(modifyPostit);

const App: FunctionComponent = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Provider store={Store}>
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
    </Provider>
  );
};

export default App;
