import React, {FunctionComponent, useEffect} from 'react';
import {DrawingZone} from './pages/DrawingZone/DrawingZone.component';
import {SwipeConfiguration} from './pages/SwipeConfiguration/SwipeConfiguration.component';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {modifyPostit} from './Store/Reducers/modifyPostitReducer';
import {EndPoint} from './pages/DrawingZone/useGoogleNearby.hook';
import {deviceReducer} from './Store/Devices/devicesReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {loaderReducer} from './Store/Loader/LoaderReducer';
import {ErrorModal} from './components/ErrorModal/ErrorModal.component';

export type RootStackParamList = {
  DrawingZone: undefined;
  SwipeConfiguration: {
    endPoint: EndPoint;
    sendMessage: (message: string, endpointName: string, endpointId) => void;
  };
};
export enum RootNavigatorRouteNames {
  SwipeConfiguration = 'SwipeConfiguration',
  DrawingZone = 'DrawingZone',
}
const Stack = createStackNavigator<RootStackParamList>();

const Store = createStore(
  combineReducers({
    devices: deviceReducer,
    postit: modifyPostit,
    loader: loaderReducer,
  }),
  composeWithDevTools(),
);

const App: FunctionComponent = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  console.disableYellowBox = true;
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
            options={{headerLeft: null}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <ErrorModal />
    </Provider>
  );
};

export default App;
