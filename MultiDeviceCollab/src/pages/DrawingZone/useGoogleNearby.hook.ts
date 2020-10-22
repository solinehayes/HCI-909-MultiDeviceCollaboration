import {useEffect, useState} from 'react';
import {DeviceEventEmitter, Dimensions} from 'react-native';
import NearbyConnection, {
  Strategy,
} from 'react-native-google-nearby-connection';
import {theme} from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {RootNavigatorRouteNames} from '../../App';
import {useSelector, useDispatch} from 'react-redux';
import {
  bottomDeviceSelector,
  leftDeviceSelector,
  rightDeviceSelector,
  topDeviceSelector,
} from '../../Store/Devices/deviceSelectors';
import {
  finishLoading,
  LoadingStatusKey,
} from '../../Store/Loader/LoaderActions';

export interface EndPoint {
  endpointId: string;
  endpointName: string;
  color: string;
}
export const EventEmitKey = {
  ERROR: 'ERROR',
};
const HEADER_SIZE = 80; // Arbitrary size for the phone header

export const useGoogleNearby = ({
  setIsConnectionModalDisplayed,
  copyPostits,
}: {
  setIsConnectionModalDisplayed: (visibility: boolean) => void;
  copyPostits;
}) => {
  const dispatch = useDispatch(); // Used to launch actions to the store
  const userviceId = '12';
  const [userName, setUserName] = useState<string>('');
  const [newAction, setNewAction] = useState<string>(''); // New action to be dispatched (in the drawingZone page)
  const navigation = useNavigation(); // Used to navigate between screens

  const [nearbyEndpoints, setNearbyEndpoints] = useState<EndPoint[]>([]); // Nearby devices list
  const [connectedEndPoints, setConnectedEndPoints] = useState<EndPoint[]>([]); // Connected devices list

  const {width, height} = Dimensions.get('window'); // Configuration of the device
  const deviceLeft = useSelector(leftDeviceSelector); // left device Id, name and configuration
  const deviceRight = useSelector(rightDeviceSelector); // right device Id, name and configuration
  const deviceTop = useSelector(topDeviceSelector); // top device Id, name and configuration
  const deviceBottom = useSelector(bottomDeviceSelector); // bottom device Id, name and configuration

  const [isAdvertising, setIsAdvertising] = useState<boolean>(false);
  const [isDiscovering, setIsDiscovering] = useState<boolean>(false);

  useEffect(() => {
    if (
      (deviceLeft.endPoint !== null && deviceLeft.size !== undefined) ||
      (deviceRight.endPoint !== null && deviceRight.size !== undefined) ||
      (deviceTop.endPoint !== null && deviceTop.size !== undefined) ||
      (deviceBottom.endPoint !== null && deviceBottom.size !== undefined)
    ) {
      copyPostits();
    }
  }, [deviceLeft, deviceRight, deviceTop, deviceBottom, copyPostits]);

  const startDiscovering = () => {
    /***
    Function to start searching for nearby devices
    ***/
    if (!isDiscovering) {
      NearbyConnection.startDiscovering(userviceId);
    }
  };
  const startAdvertising = () => {
    /***
    Function to be seen by other devices
    ***/
    if (!isAdvertising) {
      console.log('we advertize');
      NearbyConnection.startAdvertising(
        userName,
        userviceId,
        Strategy.P2P_POINT_TO_POINT,
      );
    }
  };

  const sendMessage = (message: string, endpointId: string) => {
    /***
    Function to send message to another device
    ***/
    NearbyConnection.sendBytes(userviceId, endpointId, message);
  };

  const transposeAndSendAction = (action) => {
    /***
    Function to transpose the postit to the right place on the multidevice canvas and send message
    ***/

    if (deviceLeft.endPoint !== null) {
      // If there is a left device, shift the post-it of the action to the
      // right and send the new action to this device
      const actionLeft = JSON.parse(JSON.stringify(action));
      actionLeft.value.leftPos = action.value.leftPos + deviceLeft.size.width;
      sendMessage(JSON.stringify(actionLeft), deviceLeft.endPoint.endpointId);
    }
    if (deviceRight.endPoint !== null) {
      // If there is a right device, shift the post-it of the action to the
      // left and send the new action to this device
      const actionRight = JSON.parse(JSON.stringify(action));
      actionRight.value.leftPos = action.value.leftPos - width;
      sendMessage(JSON.stringify(actionRight), deviceRight.endPoint.endpointId);
    }
    if (deviceTop.endPoint !== null) {
      // If there is a top device, shift the post-it of the action down
      // and send the new action to this device
      const actionUp = JSON.parse(JSON.stringify(action));
      actionUp.value.topPos =
        action.value.topPos + deviceTop.size.height - HEADER_SIZE;
      sendMessage(JSON.stringify(actionUp), deviceTop.endPoint.endpointId);
    }
    if (deviceBottom.endPoint !== null) {
      // If there is a bottom device, shift the post-it of the action up
      // and send the new action to this device
      const actionDown = JSON.parse(JSON.stringify(action));
      actionDown.value.topPos = action.value.topPos - height + HEADER_SIZE;
      sendMessage(JSON.stringify(actionDown), deviceBottom.endPoint.endpointId);
    }
  };

  const connectToNearbyEndpoint = (endpoint: EndPoint) => {
    /***
    Function to connect to one device nearby
    ***/
    NearbyConnection.connectToEndpoint(userviceId, endpoint.endpointId);
  };

  // CALLBACKS
  NearbyConnection.onEndpointDiscovered(({endpointId, endpointName}) => {
    /***
    Function to be launch when a new nearby device is found
    Adds the device to the nearby devices list in order to display it on the nearby devices modal
    ***/
    setNearbyEndpoints(
      nearbyEndpoints.concat([{endpointId, endpointName, color: ''}]),
    );
  });
  NearbyConnection.onConnectedToEndpoint(({endpointId, endpointName}) => {
    /***
    Function to be launch a connection with a device is established
    Adds the device to the connected device list in order to display it on the drawingZone page
    Navigates to the SwipeConfiguration page in order to configurate the connection layout
    ***/
    setConnectedEndPoints(
      connectedEndPoints.concat([
        {
          endpointId,
          endpointName,
          color:
            theme.postItColors[
              Math.floor(Math.random() * (theme.postItColors.length - 1))
            ],
        },
      ]),
    );
    dispatch(finishLoading(LoadingStatusKey.CONNECT_TO_DEVICE));
    setIsConnectionModalDisplayed(false);
    navigation.navigate(RootNavigatorRouteNames.SWIPE_CONFIGURATION, {
      endPoint: {endpointId, endpointName},
      sendMessage,
    });
  });
  NearbyConnection.onConnectionInitiatedToEndpoint(
    /***
    Function to be launch when a new nearby device wants to establush a connection
    Accepts automatically the connection
    ***/
    ({endpointId, serviceId}) => {
      NearbyConnection.acceptConnection(serviceId, endpointId);
    },
  );
  NearbyConnection.onEndpointLost(({endpointId}) => {
    /***
    Function to be launch when the connection with a device is lost
    Removes the device from the connected devices list
    ***/
    for (let i = 0; i < connectedEndPoints.length; i++) {
      if (connectedEndPoints[0].endpointId === endpointId) {
        setConnectedEndPoints(
          connectedEndPoints.filter(
            (endpoint) => endpoint.endpointId !== endpointId,
          ),
        );
      }
    }
  });

  NearbyConnection.onReceivePayload(({serviceId, endpointId, payloadId}) => {
    /***
    Function to be launch when the device receives an action from a connected device (eg. create a new post it action)
    Sets up the action received in the state
    ***/
    NearbyConnection.readBytes(serviceId, endpointId, payloadId).then(
      ({bytes}) => {
        setNewAction(bytes);
      },
    );
  });
  NearbyConnection.onAdvertisingStarted(() => {
    /***
    Function to be launch when the advertising to other devices started
    Sets the state to true in order to launch the device advertising only once
    ***/
    setIsAdvertising(true);
  });
  NearbyConnection.onDiscoveryStarted(() => {
    /***
    Function to be launch when the device discovery started
    Sets the state to true in order to launch the device discovery only once
    ***/
    setIsDiscovering(true);
  });
  NearbyConnection.onEndpointConnectionFailed(() => {
    /***
    Function to be launch when the connection to a nearby device fails
    Lauches the error modal
    ***/
    dispatch(finishLoading(LoadingStatusKey.CONNECT_TO_DEVICE));
    DeviceEventEmitter.emit(EventEmitKey.ERROR, 'Could not connect to device');
  });
  NearbyConnection.onSendPayloadFailed(() => {
    /***
    Function to be launch when sending an action to other devices fails
    Lauches the error modal
    ***/
    DeviceEventEmitter.emit(
      EventEmitKey.ERROR,
      'Could not send message to device',
    );
  });
  NearbyConnection.onAdvertisingStartFailed(() => {
    /***
    Function to be launch when the advertising fails
    Lauches the error modal
    ***/
    DeviceEventEmitter.emit(
      EventEmitKey.ERROR,
      'Could not advertise to other devices',
    );
  });
  NearbyConnection.onDiscoveryStartFailed(() => {
    /***
    Function to be launch when the discovery fails
    Lauches the error modal
    ***/
    DeviceEventEmitter.emit(
      EventEmitKey.ERROR,
      'Could not search for ther devices',
    );
  });

  return {
    startDiscovering,
    startAdvertising,
    sendMessage,
    transposeAndSendAction,
    connectToNearbyEndpoint,
    nearbyEndpoints,
    connectedEndPoints,
    userName,
    setUserName,
    newAction,
  };
};
