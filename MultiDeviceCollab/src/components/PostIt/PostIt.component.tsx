import React, {FunctionComponent, useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  PanResponder,
  Dimensions,
  Animated,
  TextStyle,
} from 'react-native';
import {theme} from '../../../theme';
import {createResponder} from 'react-native-gesture-responder';

interface Props {
  textInit: string;
  id: number;
  color: string;
}
interface Styles {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: theme.colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  text: {
    fontWeight: 'bold',
  },
});

const {width, height} = Dimensions.get('window');

export const PostIt: FunctionComponent<Props> = ({textInit, id, color}) => {
  const [textValue, onChangeText] = useState(textInit);
  const [size, setSize] = useState(100);
  const [left, setLeft] = useState(100);
  const [top, setTop] = useState(100);
  const [gesture, setGesture] = useState({});

  const gestureResponder = createResponder({
    onStartShouldSetResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      return gestureState.dx != 0 && gestureState.dy != 0;
    },
    onMoveShouldSetResponder: (evt, gestureState) => true,
    onMoveShouldSetResponderCapture: (evt, gestureState) => true,

    onResponderGrant: (evt, gestureState) => {},
    onResponderMove: (evt, gestureState) => {
      if (gestureState.pinch && gestureState.previousPinch) {
        setSize(size * (gestureState.pinch / gestureState.previousPinch));
      }
      setLeft(left + (gestureState.moveX - gestureState.previousMoveX));
      setTop(top + (gestureState.moveY - gestureState.previousMoveY));

      setGesture({...gestureState});
    },
    onResponderTerminationRequest: (evt, gestureState) => true,
    onResponderRelease: (evt, gestureState) => {
      setGesture({...gestureState});
    },
    onResponderTerminate: (evt, gestureState) => {},
    onResponderSingleTapConfirmed: (evt, gestureState) => {},
    debug: false,
  });

  return (
    <View id={id} {...gestureResponder}>
      <TouchableOpacity
        style={[
          {
            width: size,
            height: size,
            left: left - size / 2,
            top: top - size / 2,
          },
          styles.container,
          {backgroundColor: color},
        ]}>
        <TextInput
          style={styles.text}
          onChangeText={(text) => onChangeText(text)}
          multiline={true}>
          {' '}
          {textInit}{' '}
        </TextInput>
      </TouchableOpacity>
    </View>
  );
};
