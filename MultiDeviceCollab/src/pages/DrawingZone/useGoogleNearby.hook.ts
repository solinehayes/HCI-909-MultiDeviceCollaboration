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

export const useGoogleNearby = ({
  setIsConnectionModalDisplayed,
  copyPostits,
}: {
  setIsConnectionModalDisplayed: (visibility: boolean) => void;
  copyPostits;
}) => {
  const dispatch = useDispatch();
  const userviceId = '12';
  const [userName, setUserName] = useState<string>('');
  const [newAction, setNewAction] = useState<string>('');
  const navigation = useNavigation();

  const [nearbyEndpoints, setNearbyEndpoints] = useState<EndPoint[]>([]);
  const [connectedEndPoints, setConnectedEndPoints] = useState<EndPoint[]>([]);

  const {width, height} = Dimensions.get('window');
  // A changer en fonction de la configuration
  const deviceLeft = useSelector(leftDeviceSelector);
  const deviceRight = useSelector(rightDeviceSelector);
  const deviceTop = useSelector(topDeviceSelector);
  const deviceBottom = useSelector(bottomDeviceSelector);

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
    if (!isDiscovering) {
      NearbyConnection.startDiscovering(
        userviceId, // A unique identifier for the service
      );
    }
  };
  const startAdvertising = () => {
    if (!isAdvertising) {
      console.log('we advertize');
      NearbyConnection.startAdvertising(
        userName, // This nodes endpoint name
        userviceId, // A unique identifier for the service
        Strategy.P2P_POINT_TO_POINT, // The Strategy to be used when discovering or advertising to Nearby devices [See Strategy](https://developers.google.com/android/reference/com/google/android/gms/nearby/connection/Strategy)
      );
    }
  };
  const sendMessage = (message: string, endpointName: string, endpointId) => {
    NearbyConnection.sendBytes(
      userviceId, // A unique identifier for the service
      endpointId, // ID of the endpoint wishing to stop playing audio from
      message, // A string of bytes to send
    );
  };

  const transposeAndSendAction = (action) => {
    // Transpose and send to left
    if (deviceLeft.endPoint !== null) {
      const actionLeft = JSON.parse(JSON.stringify(action));
      actionLeft.value.leftPos = action.value.leftPos + deviceLeft.size.width;
      sendMessage(
        JSON.stringify(actionLeft),
        deviceLeft.endPoint.endpointName,
        deviceLeft.endPoint.endpointId,
      );
    }
    // Transpose and send to right
    if (deviceRight.endPoint !== null) {
      const actionRight = JSON.parse(JSON.stringify(action));
      actionRight.value.leftPos = action.value.leftPos - width;
      sendMessage(
        JSON.stringify(actionRight),
        deviceRight.endPoint.endpointName,
        deviceRight.endPoint.endpointId,
      );
    }
    // Transpose and send to up
    if (deviceTop.endPoint !== null) {
      const actionUp = JSON.parse(JSON.stringify(action));
      // 80 : valeur arbitraire pour compenser la hauteur du bandeau
      actionUp.value.topPos = action.value.topPos + deviceTop.size.height - 80;
      sendMessage(
        JSON.stringify(actionUp),
        deviceTop.endPoint.endpointName,
        deviceTop.endPoint.endpointId,
      );
    }
    // Transpose and send down
    if (deviceBottom.endPoint !== null) {
      const actionDown = JSON.parse(JSON.stringify(action));
      // 80 : valeur arbitraire pour compenser la hauteur du bandeau
      actionDown.value.topPos = action.value.topPos - height + 80;
      sendMessage(
        JSON.stringify(actionDown),
        deviceBottom.endPoint.endpointName,
        deviceBottom.endPoint.endpointId,
      );
    }
  };

  const connectToNearbyEndpoint = (endpoint: EndPoint) => {
    console.log('connect to nearby endpoint ' + endpoint.endpointId);
    NearbyConnection.connectToEndpoint(
      userviceId, // A unique identifier for the service
      endpoint.endpointId, // ID of the endpoint to connect to
    );
  };
  NearbyConnection.onEndpointDiscovered(({endpointId, endpointName}) => {
    setNearbyEndpoints(
      nearbyEndpoints.concat([{endpointId, endpointName, color: ''}]),
    );
  });
  NearbyConnection.onConnectedToEndpoint(
    ({
      endpointId, // ID of the endpoint we connected to
      endpointName, // The name of the service
    }) => {
      //console.log('Successfully connected to ', endpointName);
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
      // Par défaut pour le test mais à changer avec la configuration
      dispatch(finishLoading(LoadingStatusKey.CONNECT_TO_DEVICE));
      setIsConnectionModalDisplayed(false);
      navigation.navigate(RootNavigatorRouteNames.SwipeConfiguration, {
        endPoint: {endpointId, endpointName},
        sendMessage,
      });
    },
  );
  NearbyConnection.onConnectionInitiatedToEndpoint(
    ({
      endpointId, // ID of the endpoint wishing to connect
      endpointName, // The name of the remote device we're connecting to.
      serviceId, // A unique identifier for the service
    }) => {
      console.log('Connexion initiated by ', endpointName);
      console.log('Accepting connexion');
      NearbyConnection.acceptConnection(
        serviceId, // A unique identifier for the service
        endpointId, // ID of the endpoint wishing to accept the connection from
      );
    },
  );
  NearbyConnection.onEndpointLost(
    ({
      endpointId, // ID of the endpoint we lost
    }) => {
      for (let i = 0; i < connectedEndPoints.length; i++) {
        if (connectedEndPoints[0].endpointId === endpointId) {
          setConnectedEndPoints(
            connectedEndPoints.filter(
              (endpoint) => endpoint.endpointId !== endpointId,
            ),
          );
        }
      }
    },
  );
  NearbyConnection.onAdvertisingStarting(() => {
    console.log('onStartAdvertising');
  });
  NearbyConnection.onAdvertisingStarted(() => {
    setIsAdvertising(true);
  });
  NearbyConnection.onDiscoveryStarted(() => {
    setIsDiscovering(true);
  });
  NearbyConnection.onReceivePayload(
    ({
      serviceId, // A unique identifier for the service
      endpointId, // ID of the endpoint we got the payload from
      payloadId, // Unique identifier of the payload
    }) => {
      NearbyConnection.readBytes(
        serviceId, // A unique identifier for the service
        endpointId, // ID of the endpoint wishing to stop playing audio from
        payloadId, // Unique identifier of the payload
      ).then(
        ({
          bytes, // [Payload.Type.BYTES] The bytes string that was sent
        }) => {
          setNewAction(bytes);
        },
      );
    },
  );
  NearbyConnection.onEndpointConnectionFailed(() => {
    dispatch(finishLoading(LoadingStatusKey.CONNECT_TO_DEVICE));
    DeviceEventEmitter.emit(EventEmitKey.ERROR);
  });
  NearbyConnection.onSendPayloadFailed(() => {
    DeviceEventEmitter.emit(EventEmitKey.ERROR);
  });
  NearbyConnection.onAdvertisingStartFailed(() => {
    DeviceEventEmitter.emit(EventEmitKey.ERROR);
  });
  NearbyConnection.onDiscoveryStartFailed(() => {
    DeviceEventEmitter.emit(EventEmitKey.ERROR);
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
