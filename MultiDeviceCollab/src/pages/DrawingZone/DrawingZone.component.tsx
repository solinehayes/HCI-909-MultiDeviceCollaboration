import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, SafeAreaView, ViewStyle, StyleSheet} from 'react-native';
import {FloatingButton} from '../../components/FloatingButton/FloatingButton.component';
import {PostIt} from '../../components/PostIt/PostIt.component';
import {theme} from '../../../theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useBluetooth} from './useBluetooth.hook';
import {Device} from 'react-native-ble-plx';
import {ConnectedDevice} from '../../components/ConnectedDevice/ConnectedDevice.component';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigatorRouteNames, RootStackParamList} from '../../App';
import {BluetoothModal} from '../../components/BluetoothModal/BluetoothModal.component';

type DrawingComponentNavigationProp = StackNavigationProp<
  RootStackParamList,
  RootNavigatorRouteNames.DrawingZone
>;
interface Props {
  navigation: DrawingComponentNavigationProp;
}

interface Styles {
  container: ViewStyle;
  bottomButtonContainer: ViewStyle;
  topButtonContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
  },
  bottomButtonContainer: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  topButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
});
const mockDevices: Partial<Device>[] = [
  {
    id: 'EC:81:93:2A:25:57',
    isConnectable: null,
    localName: '',
    manufacturerData: 'AwABGE4AAAyUe+eykVbsgZMqJVci',
    mtu: 23,
    name: 'MEGABOOM 3 RAPH',
    overflowServiceUUIDs: null,
    rssi: -65,
    serviceData: null,
    serviceUUIDs: ['0000fe61-0000-1000-8000-00805f9b34fb'],
    solicitedServiceUUIDs: null,
    txPowerLevel: null,
  },
  {
    id: 'EC:81:93:2A:25:58',
    isConnectable: null,
    localName: '',
    manufacturerData: 'AwABGE4AAAyUe+eykVbsgZMqJVci',
    mtu: 23,
    name: 'EB',
    overflowServiceUUIDs: null,
    rssi: -65,
    serviceData: null,
    serviceUUIDs: ['0000fe61-0000-1000-8000-00805f9b34fb'],
    solicitedServiceUUIDs: null,
    txPowerLevel: null,
  },
];
const bluetoothColors = [
  '#FFB484',
  '#FFF484',
  '#BAFF84',
  '#84FFD8',
  '#84E1FF',
  '#849CFF',
  '#C384FF',
  '#FF84F9',
  '#FF8484',
];

export const DrawingZone: FunctionComponent<Props> = ({navigation}) => {
  // List of post it to render
  const [postIts, setPostIts] = useState([{id: 1, text: 'post-it 1'}]);
  const [isBluetoothModalDisplayed, setIsBluetoothModalDisplayed] = useState<
    boolean
  >(false);

  // Function to add a post it
  const addPostIt = () => {
    console.log('Add post it');
    const newId = postIts.length + 1;
    setPostIts(postIts.concat({id: newId, text: 'post-it ' + newId}));
  };
  const inset = useSafeAreaInsets();

  const {
    createBleManager,
    scanDevices,
    connectedDevices,
    checkBluetoothState,
  } = useBluetooth();

  useEffect(() => {
    createBleManager();
  });
  useEffect(() => {
    console.log('CONNECTED DEVICES');
    console.log(connectedDevices);
  }, [connectedDevices]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topButtonContainer}>
        <FloatingButton iconName="file-o" onPress={addPostIt} />
        <FloatingButton iconName="undo" onPress={() => {}} />
        <FloatingButton iconName="pencil" onPress={() => {}} />
      </View>

      <View>
        {postIts.map((postit) => (
          <PostIt id={postit.id} text={postit.text} key={postit.id} />
        ))}
      </View>

      <View style={[styles.bottomButtonContainer, {bottom: inset.bottom}]}>
        {mockDevices.map((device: Partial<Device>) => {
          return (
            <ConnectedDevice
              device={device}
              color={
                bluetoothColors[
                  Math.floor(Math.random() * (bluetoothColors.length - 1))
                ]
              }
              key={device.id}
              onPress={() => {
                navigation.navigate(RootNavigatorRouteNames.SwipeConfiguration);
              }}
            />
          );
        })}
        <FloatingButton
          iconName="bluetooth-b"
          onPress={() => {
            setIsBluetoothModalDisplayed(true);
            //let permissionGranted = checkBluetoothState();
             //if (permissionGranted) {
               //console.log('permission granted');
               scanDevices();
            //}
          }}
        />
      </View>
      <BluetoothModal
        isModalVisible={isBluetoothModalDisplayed}
        setIsModalVisible={setIsBluetoothModalDisplayed}
        connectedDevices={connectedDevices}
      />
    </SafeAreaView>
  );
};
