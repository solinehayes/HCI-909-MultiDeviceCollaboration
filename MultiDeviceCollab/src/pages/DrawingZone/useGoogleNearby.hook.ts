import {useState} from 'react';
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
  const userviceName = 'ServiceName';

  const [nearbyEndpoints, setNearbyEndpoints] = useState<EndPoint[]>([]);
  const [connectedEndPoints, setConnectedEndPoints] = useState<EndPoint[]>([]);

  const startDiscovering = () => {
    NearbyConnection.startDiscovering(
      userviceId, // A unique identifier for the service
    );
  };
  const startAdvertising = () => {
    console.log('startAdvertising début');
    NearbyConnection.startAdvertising(
      userviceName, // This nodes endpoint name
      userviceId, // A unique identifier for the service
      Strategy.P2P_POINT_TO_POINT, // The Strategy to be used when discovering or advertising to Nearby devices [See Strategy](https://developers.google.com/android/reference/com/google/android/gms/nearby/connection/Strategy)
    );
    console.log('startAdvertising fin');
  };
  const sendMessage = (endpointName: string, endpointId) => {
    let string = 'Hello World';
    NearbyConnection.sendBytes(
      userviceId, // A unique identifier for the service
      endpointId, // ID of the endpoint wishing to stop playing audio from
      string, // A string of bytes to send
    );
  };
  const connectToNearbyEndpoint = (endpoint: EndPoint) => {
    NearbyConnection.connectToEndpoint(
      userviceId, // A unique identifier for the service
      endpoint.endpointId, // ID of the endpoint to connect to
    );
  };
  NearbyConnection.onEndpointDiscovered(
    ({endpointId, endpointName, serviceId}) => {
      console.log(serviceId);
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
      console.log('Successfully connected to ', endpointName);
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
      console.log('onStartAdvertising debut');
      /*NearbyConnection.readBytes(
        serviceId, // A unique identifier for the service
        connectedEndPoints.map((endpoint) => {
          if (endpoint.endpointName === endpointName) {
            return endpoint.endpointId;
          }
        }), // ID of the endpoint wishing to stop playing audio from
        'payloadId', // Unique identifier of the payload
      ).then(
        ({
          type, // The Payload.Type represented by this payload
          bytes, // [Payload.Type.BYTES] The bytes string that was sent
          payloadId, // [Payload.Type.FILE or Payload.Type.STREAM] The payloadId of the payload this payload is describing
          filename, // [Payload.Type.FILE] The name of the file being sent
          metadata, // [Payload.Type.FILE] The metadata sent along with the file
          streamType, // [Payload.Type.STREAM] The type of stream this is [audio or video]
        }) => {
          console.log('Received: ', bytes);
        },
      );
      console.log("onStartAdvertising fin");*/
    },
  );

  return {
    startDiscovering,
    startAdvertising,
    sendMessage,
    connectToNearbyEndpoint,
    nearbyEndpoints,
    connectedEndPoints,
  };
};
