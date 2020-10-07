import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import {
  initialize,
  startDiscoveringPeers,
  stopDiscoveringPeers,
  getAvailablePeers,
  connect,
  sendMessage,
  createGroup,
} from 'react-native-wifi-p2p';
import {RootNavigatorRouteNames} from '../../App';

export interface Device {
  deviceAddress: string;
  deviceName: string;
  isGroupOwner: boolean;
  primaryDeviceType: string;
  secondaryDeviceType: string;
  status: number;
}

export const useWifiDirect = () => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [nearbyDevices, setNearbyDevices] = useState<Device[]>([]);
  const [connectedDevices, setConnectedDevices] = useState<Device[]>([]);
  const [isScanLoading, setIsScanLoading] = useState<boolean>(false);
  const {navigation} = useNavigation();

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
          stopDiscoveringPeers();
          setNearbyDevices(devices);
          setIsScanLoading(false);
        }),
      )
      .catch((err) =>
        console.error(
          `Something is gone wrong. Maybe your WiFi is disabled? Error details: ${err}`,
        ),
      );
  };
  const createGroup = async () => {
    await createGroup()
      .then(() => console.log('Group created successfully!'))
      .catch((err) => console.error('Something gone wrong. Details: ', err));
  };
  const connectToDevice = async (device: Device) => {
    await connect(device.deviceAddress)
      .then(setConnectedDevices(connectedDevices.concat([device])))
      .catch((error) => {
        console.warn(error);
      });
    await createGroup()
      .then(() => console.log('Group created successfully!'))
      .catch((err) => console.error('Something gone wrong. Details: ', err));

    navigation.navigate(RootNavigatorRouteNames.SwipeConfiguration);
  };
  const sendMessageToDevice = async () => {
    // await sendMessage('Hello world')
    //   .then((metaInfo) => console.log('Message sent successfully', metaInfo))
    //   .catch((err) => console.log('Error while message sending', err));
  };
  return {
    createGroup,
    init,
    scanDevices,
    nearbyDevices,
    isScanLoading,
    connectedDevices,
    connectToDevice,
    sendMessageToDevice,
  };
};
