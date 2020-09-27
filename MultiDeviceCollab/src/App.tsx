import React, {FunctionComponent, useEffect} from 'react';
import {DrawingZone} from './pages/DrawingZone/DrawingZone.component';
import {SwipeConfiguration} from './pages/SwipeConfiguration/SwipeConfiguration.component';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {BluetoothSerial} from 'react-native-bluetooth-serial';
const Stack = createStackNavigator();

const App: FunctionComponent = () => {
  useEffect(() => {
    Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
      (values) => {
        const [isEnabled, devices] = values;
        console.log(devices);
      },
    );

    BluetoothSerial.on('bluetoothEnabled', () =>
      console.log('Bluetooth enabled'),
    );
  });
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
