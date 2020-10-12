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
import {connect, ConnectedProps, useDispatch} from 'react-redux';

interface Props {
  textInit: string;
  id: number;
  topPos: number;
  leftPos: number;
  squareSize: number;
  color: string;
  sendMessageToAll;
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

export const PostIt: FunctionComponent<Props> = ({textInit, id, topPos, leftPos, squareSize, color, sendMessageToAll}) => {
  const [textValue, onChangeText] = useState(textInit);
  //const [size, setSize] = useState(squareSize);
  //const [left, setLeft] = useState(topPos);
  //const [top, setTop] = useState(leftPos);
  const [gesture, setGesture] = useState({});
  const dispatch = useDispatch();

  const movePostIt = async (newTopPos, newLeftPos) => {
    const action = {type: 'MOVE_POSTIT', value: {id: id, newTopPos: newTopPos, newLeftPos: newLeftPos}};
    await dispatch(action);
    // Bouger le deuxieme post it, pour le test, mais ensuite, envoyer message
    //const action2 = {type: 'MOVE_POSTIT', value: {id: -id, newTopPos: newTopPos, newLeftPos: newLeftPos-360}};
    //await dispatch(action2);
    sendMessageToAll(JSON.stringify(action));
  };

  const resizePostIt = async (resizeFactor) => {
    const action = {type: 'RESIZE_POSTIT', value: {id: id, resizeFactor: resizeFactor}};
    await dispatch(action);
    // Resize le deuxieme post it, pour le test
    const action2 = {type: 'RESIZE_POSTIT', value: {id: -id, resizeFactor: resizeFactor}};
    await dispatch(action2);
  }

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
        resizePostIt(gestureState.pinch / gestureState.previousPinch);
        //setSize(size * (gestureState.pinch / gestureState.previousPinch));
      }
      movePostIt(topPos + gestureState.moveY - gestureState.previousMoveY, leftPos + gestureState.moveX - gestureState.previousMoveX);
      //setLeft(left + (gestureState.moveX - gestureState.previousMoveX));
      //setTop(top + (gestureState.moveY - gestureState.previousMoveY));

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
            width: squareSize,
            height: squareSize,
            left: leftPos - squareSize / 2,
            top: topPos - squareSize / 2,
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
