import {useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {
  initialize,
  startDiscoveringPeers,
  getAvailablePeers,
} from 'react-native-wifi-p2p';

export interface Device {
  deviceAddress: string;
  deviceName: string;
  isGroupOwner: boolean;
  primaryDeviceType: string;
  secondaryDeviceType: string;
  status: number;
}

export const useBluetooth = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [connectedDevices, setConnectedDevices] = useState<Device[]>([]);
  const [isScanLoading, setIsScanLoading] = useState<boolean>(false);

  const init = async () => {
    if (!isInitialized) {
      await initialize()
        .then((isInitializedSuccessfully) => {
          setIsInitialized(isInitializedSuccessfully);
        })
        .catch((err) => console.log('initialization was failed. Err: ', err));
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );

      setIsInitialized(!!granted);
    }
  };
  const scanDevices = async () => {
    setIsScanLoading(true);
    if (!isInitialized) {
      init();
    }

    await startDiscoveringPeers()
      .then(
        getAvailablePeers().then(({devices}) => {
          console.log('devices', devices);
          setConnectedDevices(devices);
          setIsScanLoading(false);
        }),
      )
      .catch((err) =>
        console.error(
          `Something is gone wrong. Maybe your WiFi is disabled? Error details: ${err}`,
        ),
      );
  };
  return {init, scanDevices, connectedDevices, isScanLoading};
};
