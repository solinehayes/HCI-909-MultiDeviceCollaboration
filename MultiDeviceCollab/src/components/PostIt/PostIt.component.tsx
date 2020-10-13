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
  transposeAndSendAction;
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

export const PostIt: FunctionComponent<Props> = ({textInit, id, topPos, leftPos, squareSize, color, sendMessageToAll, transposeAndSendAction}) => {
  const [textValue, onChangeText] = useState(textInit);
  const [gesture, setGesture] = useState({});
  const dispatch = useDispatch();

  const movePostIt = (newTopPos, newLeftPos) => {
    const action = {type: 'MOVE_POSTIT', value: {id: id, topPos: newTopPos, leftPos: newLeftPos}};
    dispatch(action);
    if (newLeftPos+squareSize/2+30>width || newLeftPos-squareSize-30/2<0 || newTopPos-squareSize/2-30<0 || newTopPos+squareSize/2+30>height){
      if (Math.abs(newTopPos-topPos)>7 || Math.abs(newLeftPos-leftPos)>7){
        transposeAndSendAction(action);
      }
    }
  };

  const resizePostIt = (newSquareSize) => {
    const action = {type: 'RESIZE_POSTIT', value: {id: id, newSquareSize: newSquareSize}};
    dispatch(action);
    if (Math.abs(squareSize-newSquareSize)>7){
      sendMessageToAll(JSON.stringify(action));
    }
  }

  const changeText = (newText) => {
    const action = {type: 'CHANGE_TEXT', value: {id: id, newText: newText}};
    sendMessageToAll(JSON.stringify(action));
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
        resizePostIt(squareSize * gestureState.pinch / gestureState.previousPinch);
      }
      movePostIt(topPos + gestureState.moveY - gestureState.previousMoveY, leftPos + gestureState.moveX - gestureState.previousMoveX);

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
          onChangeText={(text) => {onChangeText(text); changeText(text);}}
          multiline={true}>
          {' '}
          {textInit}{' '}
        </TextInput>
      </TouchableOpacity>
    </View>
  );
};
