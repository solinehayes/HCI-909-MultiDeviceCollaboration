import {useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {BleManager, Device} from 'react-native-ble-plx';

export const useBluetooth = () => {
  const [manager, setManager] = useState<BleManager>();
  const [connectedDevices, setConnectedDevices] = useState<Device[]>([]);

  const createBleManager = async () => {
    console.log('manager: ', manager);
    if (!manager) {
      setManager(new BleManager());
    }
  };
  const checkBluetoothState = async () => {
    await createBleManager();
    console.log('Scanning: Checking permissions...');
    const enabled = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );
    if (!enabled) {
      console.log('Scanning: Permissions disabled, showing...');
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Scanning: Permissions not granted, aborting...');
        // TODO: Show error message?
        return false;
      }
      return granted;
    }
    return enabled;
  };
  const scanDevices = async () => {
    checkBluetoothState();
    console.log('manager before function: ', manager);
    await manager.startDeviceScan(
      null,
      {allowDuplicates: false},
      (error, scannedDevice) => {
        if (error) {
          console.warn(error);
          return;
        }
        if (scannedDevice != null && scannedDevice.localName === 'SensorTag') {
          console.warn(error);
          return;
        }
        var joined = connectedDevices.concat(scannedDevice);
        setConnectedDevices(joined);
      },
    );
  };
  return {createBleManager, scanDevices, connectedDevices, checkBluetoothState};
};
