import React, {FunctionComponent} from 'react';
import {
  TouchableWithoutFeedback,
  ViewStyle,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {theme} from '../../../theme';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {RootNavigatorRouteNames, RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';


interface Styles {
  container: ViewStyle;
  gestureRecognizeContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
  },
  gestureRecognizeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type SwipeConfigurationNavigationProp = StackNavigationProp<
  RootStackParamList,
  RootNavigatorRouteNames.SWIPE_CONFIGURATION
>;
interface Props {
  navigation: SwipeConfigurationNavigationProp;
  route: RouteProp<
    RootStackParamList,
    RootNavigatorRouteNames.SWIPE_CONFIGURATION
  >;
}

export const SwipeConfiguration: FunctionComponent<Props> =  ({
  route,
  navigation,
}) => {
  const endpoint = route.params.endPoint; // Endpoint to connect to
  const sendMessage = route.params.sendMessage;

  const config = {
    velocityThreshold: 0.5,
    directionalOffsetThreshold: 80,
  }; // Swipe gesture detection sensibility
  const dispatch = useDispatch(); // Used to dispatch actions to the app's store

  const onSwipe = (gestureName) => {
    /***
    Function that send the right configuration (height and width of this device) to the other device depending on the swipe direction
    and adds the endpoint to this device configuration device store
    ***/
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    let actionSizeName = '';
    let actionEndpointName = '';
    switch (gestureName) {
      case SWIPE_UP:
        actionSizeName = 'SET_TOP_DEVICE_SIZE';
        actionEndpointName = 'SET_BOTTOM_DEVICE_ENDPOINT';
        console.log('swipe up');
        break;
      case SWIPE_DOWN:
        actionSizeName = 'SET_BOTTOM_DEVICE_SIZE';
        actionEndpointName = 'SET_TOP_DEVICE_ENDPOINT';
        console.log('swipe down');
        break;
      case SWIPE_LEFT:
        actionSizeName = 'SET_LEFT_DEVICE_SIZE';
        actionEndpointName = 'SET_RIGHT_DEVICE_ENDPOINT';
        console.log('swipe left');
        break;
      case SWIPE_RIGHT:
        actionSizeName = 'SET_RIGHT_DEVICE_SIZE';
        actionEndpointName = 'SET_LEFT_DEVICE_ENDPOINT';
        console.log('swipe right');
        break;
    }
    const actionSize = {
      type: actionSizeName,
      payload: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
    };
    sendMessage(JSON.stringify(actionSize), endpoint.endpointId);
    const actionEndPoint = {
      type: actionEndpointName,
      payload: endpoint,
    };
    dispatch(actionEndPoint);
    navigation.navigate(RootNavigatorRouteNames.DRAWING_ZONE);
  };

  return (
    <TouchableWithoutFeedback>
      <GestureRecognizer
        onSwipe={onSwipe}
        config={config}
        style={styles.gestureRecognizeContainer}>
        <Text>
          {`Swipe to configure position of: ${endpoint.endpointName}`}
        </Text>
      </GestureRecognizer>
    </TouchableWithoutFeedback>
  );
};
