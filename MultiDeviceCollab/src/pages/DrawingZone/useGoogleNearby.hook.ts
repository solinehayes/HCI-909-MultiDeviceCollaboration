import {useState} from 'react';
import {ToastAndroid, Dimensions} from 'react-native';
import NearbyConnection, {
  Strategy,
} from 'react-native-google-nearby-connection';
import {theme} from '../../../theme';

export interface EndPoint {
  endpointId: string;
  endpointName: string;
  color: string;
}


export const useGoogleNearby = () => {
  const userviceId = '12';
  const [userName, setUserName] = useState<string>('');
  const [newPostit, setNewPostit] = useState<string>('');
  const [nearbyEndpoints, setNearbyEndpoints] = useState<EndPoint[]>([]);
  const [connectedEndPoints, setConnectedEndPoints] = useState<EndPoint[]>([]);

  const {width, height} = Dimensions.get('window');
  // A changer en fonction de la configuration
  const [deviceLeft, setDeviceLeft] = useState();
  const [deviceRight, setDeviceRight] = useState();
  const [deviceUp, setDeviceUp] = useState();
  const [deviceDown, setDeviceDown] = useState();

  const startDiscovering = () => {
    NearbyConnection.startDiscovering(
      userviceId, // A unique identifier for the service
    );
  };
  const startAdvertising = () => {
    NearbyConnection.startAdvertising(
      userName, // This nodes endpoint name
      userviceId, // A unique identifier for the service
      Strategy.P2P_POINT_TO_POINT, // The Strategy to be used when discovering or advertising to Nearby devices [See Strategy](https://developers.google.com/android/reference/com/google/android/gms/nearby/connection/Strategy)
    );
  };

  const sendMessage = (message: string, endpointName: string, endpointId) => {
    console.log('Send message to ' + endpointName);
    NearbyConnection.sendBytes(
      userviceId, // A unique identifier for the service
      endpointId, // ID of the endpoint wishing to stop playing audio from
      message, // A string of bytes to send
    );
  };

  const transposeAndSendAction = (action) => {
    // Transpose and send to left
    if (deviceLeft!=undefined){
      const actionLeft = JSON.parse(JSON.stringify(action));
      actionLeft.value.leftPos = action.value.leftPos + deviceLeft.width;
      sendMessage(JSON.stringify(actionLeft), deviceLeft.name, deviceLeft.id);
    }
    // Transpose and send to right
    if (deviceRight!=undefined){
      const actionRight = JSON.parse(JSON.stringify(action));
      actionRight.value.leftPos = action.value.leftPos - width;
      sendMessage(JSON.stringify(actionRight), deviceRight.name, deviceRight.id);
    }
    // Transpose and send to up
    if (deviceUp!=undefined){
      const actionUp = JSON.parse(JSON.stringify(action));
      // 80 : valeur arbitraire pour compenser la hauteur du bandeau
      actionUp.value.topPos = action.value.topPos + deviceUp.height -80;
      sendMessage(JSON.stringify(actionUp), deviceUp.name, deviceUp.id);
    }
    // Transpose and send down
    if (deviceDown!=undefined){
      const actionDown = JSON.parse(JSON.stringify(action));
      // 80 : valeur arbitraire pour compenser la hauteur du bandeau
      actionDown.value.topPos = action.value.topPos - height +80;
      sendMessage(JSON.stringify(actionDown), deviceDown.name, deviceDown.id);
    }
  };

  const connectToNearbyEndpoint = (endpoint: EndPoint) => {
    console.log('connect to nearby endpoint ' + endpoint.endpointId);
    NearbyConnection.connectToEndpoint(
      userviceId, // A unique identifier for the service
      endpoint.endpointId, // ID of the endpoint to connect to
    );
  };
  NearbyConnection.onEndpointDiscovered(
    ({endpointId, endpointName, serviceId}) => {
      setNearbyEndpoints(
        nearbyEndpoints.concat([{endpointId, endpointName, color: ''}]),
      );
    },
  );
  NearbyConnection.onConnectedToEndpoint(
    ({
      endpointId, // ID of the endpoint we connected to
      endpointName, // The name of the service
      serviceId, // A unique identifier for the service
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
      setDeviceUp({id: endpointId, name: endpointName, width: 360, height: 640});
    },
  );
  NearbyConnection.onConnectionInitiatedToEndpoint(
    ({
      endpointId, // ID of the endpoint wishing to connect
      endpointName, // The name of the remote device we're connecting to.
      authenticationToken, // A small symmetrical token that has been given to both devices.
      serviceId, // A unique identifier for the service
      incomingConnection, // True if the connection request was initated from a remote device.
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
      endpointName, // The name of the remote device we lost
      serviceId, // A unique identifier for the service
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
  NearbyConnection.onAdvertisingStarting(
    ({
      endpointName, // The name of the service thats starting to advertise
      serviceId, // A unique identifier for the service
    }) => {
      console.log('onStartAdvertising');
    },
  );

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
          type, // The Payload.Type represented by this payload
          bytes, // [Payload.Type.BYTES] The bytes string that was sent
        }) => {
          setNewPostit(bytes);
        },
      );
    },
  );

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
    newPostit,
  };
};
