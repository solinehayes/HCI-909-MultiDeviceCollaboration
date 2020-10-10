import {useState} from 'react';
import NearbyConnection, {
  Strategy,
} from 'react-native-google-nearby-connection';

export interface EndPoint {
  endpointId: string;
  endpointName: string;
}

export const useGoogleNearby = () => {
  const userviceId = '239741ce-0985-11eb-adc1-0242ac120002';

  const [nearbyEndpoints, setNearbyEndpoints] = useState<EndPoint[]>([]);
  const [connectedEndPoints, setConnectedEndPoints] = useState<EndPoint[]>([]);

  const searchForDevices = async () => {
    await NearbyConnection.startDiscovering(
      userviceId, // A unique identifier for the service
    );
    NearbyConnection.startAdvertising('Soline', userviceId, Strategy.P2P_STAR);
  };
  const stopSearchingForDevices = async () => {
    await NearbyConnection.stopDiscovering(
      userviceId, // A unique identifier for the service
    );
    NearbyConnection.stopAdvertising(userviceId);
  };
  const startAdvertisingAndSend = (endpointName: string, endpointId) => {
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
      console.log('Endpoint found: ', endpointName);
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
      console.log('Lost connection of: ', endpointName, ' for ', serviceId);
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
  NearbyConnection.onDiscoveryStarting(
    ({
      serviceId, // A unique identifier for the service
    }) => {
      console.log('Discovery starting on', serviceId);
    },
  );

  NearbyConnection.onDiscoveryStarted(
    ({
      serviceId, // A unique identifier for the service
    }) => {
      console.log('Discovery started on', serviceId);
    },
  );

  NearbyConnection.onDiscoveryStartFailed(
    ({
      serviceId, // A unique identifier for the service
      statusCode, // The status of the response [See CommonStatusCodes](https://developers.google.com/android/reference/com/google/android/gms/common/api/CommonStatusCodes)
    }) => {
      console.log('Discovery failed on ', serviceId, ': ', statusCode);
    },
  );
  NearbyConnection.onAdvertisingStarted(
    ({
      endpointName, // The name of the service thats started to advertise
      serviceId, // A unique identifier for the service
    }) => {
      console.log(
        'Started to advertise as: ',
        endpointName,
        'for : ',
        serviceId,
      );
    },
  );
  NearbyConnection.onAdvertisingStartFailed(
    ({
      endpointName, // The name of the service thats failed to start to advertising
      serviceId, // A unique identifier for the service
      statusCode, // The status of the response [See CommonStatusCodes](https://developers.google.com/android/reference/com/google/android/gms/common/api/CommonStatusCodes)
    }) => {
      console.log('advertising failed on ', serviceId, ': ', statusCode);
    },
  );

  return {
    searchForDevices,
    startAdvertisingAndSend,
    connectToNearbyEndpoint,
    nearbyEndpoints,
    connectedEndPoints,
    stopSearchingForDevices,
  };
};
