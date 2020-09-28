import React, {FunctionComponent} from 'react';
import {DrawingZone} from './pages/DrawingZone/DrawingZone.component';
import {SwipeConfiguration} from './pages/SwipeConfiguration/SwipeConfiguration.component';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const App: FunctionComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="DrawingZone" component={DrawingZone} />
        <Stack.Screen
          name="SwipeConfiguration"
          component={SwipeConfiguration}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
