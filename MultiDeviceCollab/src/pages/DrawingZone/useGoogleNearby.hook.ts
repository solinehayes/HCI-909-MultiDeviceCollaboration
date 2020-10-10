import {useState} from 'react';
import {ToastAndroid} from 'react-native';
import NearbyConnection, {
  Strategy,
} from 'react-native-google-nearby-connection';

export interface EndPoint {
  endpointId: string;
  endpointName: string;
}

export const useGoogleNearby = () => {
  const userviceId = '12';
  const userviceName = 'ServiceName 2';

  const [nearbyEndpoints, setNearbyEndpoints] = useState<EndPoint[]>([]);
  const [connectedEndPoints, setConnectedEndPoints] = useState<EndPoint[]>([]);

  const startDiscovering = () => {
    NearbyConnection.startDiscovering(
      userviceId, // A unique identifier for the service
    );
  };
  const startAdvertising = () => {
    console.log("startAdvertising début");
    NearbyConnection.startAdvertising(
      userviceName, // This nodes endpoint name
      userviceId, // A unique identifier for the service
      Strategy.P2P_POINT_TO_POINT, // The Strategy to be used when discovering or advertising to Nearby devices [See Strategy](https://developers.google.com/android/reference/com/google/android/gms/nearby/connection/Strategy)
    );
    console.log("startAdvertising fin");
  }
  const sendMessage = (message: string, endpointName: string, endpointId) => {
    console.log("Send message to " + endpointName);
    NearbyConnection.sendBytes(
      userviceId, // A unique identifier for the service
      endpointId, // ID of the endpoint wishing to stop playing audio from
      message, // A string of bytes to send
    );
  };
  const connectToNearbyEndpoint = (endpoint: EndPoint) => {
    console.log("connect to nearby endpoint " + endpoint.endpointId);
    NearbyConnection.connectToEndpoint(
      userviceId, // A unique identifier for the service
      endpoint.endpointId, // ID of the endpoint to connect to
    );
  };
  NearbyConnection.onEndpointDiscovered(
    ({endpointId, endpointName, serviceId}) => {
      console.log(serviceId);
      setNearbyEndpoints(nearbyEndpoints.concat([{endpointId, endpointName}]));
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
        connectedEndPoints.concat([{endpointId, endpointName}]),
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
      console.log("onStartAdvertising");
        },
  );

  NearbyConnection.onReceivePayload(({
    serviceId,              // A unique identifier for the service
    endpointId,             // ID of the endpoint we got the payload from
    payloadType,            // The type of this payload (File or a Stream) [See Payload](https://developers.google.com/android/reference/com/google/android/gms/nearby/connection/Payload)
    payloadId               // Unique identifier of the payload
    }) => {
      NearbyConnection.readBytes(
        serviceId,               // A unique identifier for the service
        endpointId,              // ID of the endpoint wishing to stop playing audio from
        payloadId                // Unique identifier of the payload
        ).then(({
        type,                    // The Payload.Type represented by this payload
        bytes,                   // [Payload.Type.BYTES] The bytes string that was sent
        payloadId,               // [Payload.Type.FILE or Payload.Type.STREAM] The payloadId of the payload this payload is describing
        filename,                // [Payload.Type.FILE] The name of the file being sent
        metadata,                // [Payload.Type.FILE] The metadata sent along with the file
        streamType,              // [Payload.Type.STREAM] The type of stream this is [audio or video]
      }) => {
      ToastAndroid.showWithGravity("Message received : "+bytes, ToastAndroid.SHORT, ToastAndroid.CENTER);

      console.log("Message received: " + bytes);
    });
  });

  return {
    startDiscovering,
    startAdvertising,
    sendMessage,
    connectToNearbyEndpoint,
    nearbyEndpoints,
    connectedEndPoints,
  };
};
