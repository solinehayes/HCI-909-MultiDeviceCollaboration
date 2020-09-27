import {useState} from 'react';
import BleManager from 'react-native-ble-manager';

export const useBluetooth = () => {
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);

  const startBleManager = async () => {
    await BleManager.start({showAlert: false});
    console.log('started');
  };
  const scanDevices = async () => {
    await BleManager.scan([], 10, true);
    BleManager.getDiscoveredPeripherals().then((peripheralsArray) => {
      setConnectedDevices(peripheralsArray);
    });
  };
  return {startBleManager, scanDevices, isBluetoothEnabled, connectedDevices};
};
