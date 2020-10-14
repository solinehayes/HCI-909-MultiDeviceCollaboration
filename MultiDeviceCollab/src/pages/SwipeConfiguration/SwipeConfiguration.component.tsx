import React, {FunctionComponent} from 'react';
import {
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  ViewStyle,
  StyleSheet,
  Text,, Dimensions
} from 'react-native';
import {useDispatch} from 'react-redux';
import {theme} from '../../../theme';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {RootNavigatorRouteNames, RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {addDeviceActionCreator} from '../../Store/Devices/deviceActions';

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
interface Props {
  route: RouteProp<
    RootStackParamList,
    RootNavigatorRouteNames.SwipeConfiguration
  >;
}

export const SwipeConfiguration: FunctionComponent<Props> = ({route}) => {
  const endpoint = route.params.endPoint;
  const sendMessage = route.params.sendMessage;
  const config = {
    velocityThreshold: 0.5,
    directionalOffsetThreshold: 80,
  };
  const dispatch = useDispatch();

  const onSwipe = (gestureName) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    let actionName= "";
    switch (gestureName) {
      case SWIPE_UP:
        dispatch(
          addDeviceActionCreator({
            bottomDevice: {endPoint: endpoint, size: undefined},
          }),
        );
        actionName = "SET_TOP_DEVICE_SIZE";
        console.log('swipe up');
        break;
      case SWIPE_DOWN:
        dispatch(
          addDeviceActionCreator({
            topDevice: {endPoint: endpoint, size: undefined},
          }),
        );
        actionName = "SET_BOTTOM_DEVICE_SIZE";
        console.log('swipe down');
        break;
      case SWIPE_LEFT:
        dispatch(
          addDeviceActionCreator({
            rightDevice: {endPoint: endpoint, size: undefined},
          }),
        );
        actionName = "SET_LEFT_DEVICE_SIZE";
        console.log('swipe left');
        break;
        
      case SWIPE_RIGHT:
        dispatch(
          addDeviceActionCreator({
            leftDevice: {endPoint: endpoint, size: undefined},
          }),
        );
        actionName = "SET_RIGHT_DEVICE_SIZE";
        console.log('swipe right');
        break;
    }
    const action = {
      type: actionName,
      value: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }
    }
    sendMessage(JSON.stringify(action), endpoint.endpointName, endpoint.endpointId);
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
