import React, {FunctionComponent, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  Dimensions,
  TextStyle,
} from 'react-native';
import {theme} from '../../../theme';
import {createResponder} from 'react-native-gesture-responder';
import {useDispatch} from 'react-redux';

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

export const PostIt: FunctionComponent<Props> = ({
  textInit,
  id,
  topPos,
  leftPos,
  squareSize,
  color,
  sendMessageToAll,
  transposeAndSendAction,
}) => {
  /***
    Component that represents a post-it
    ***/
  const [textValue, setTextValue] = useState(textInit); // State for the post-it text
  const [gesture, setGesture] = useState({}); // State for the detected gesture
  const dispatch = useDispatch(); // Used to dispatch action to the app's store

  const movePostIt = (newTopPos, newLeftPos) => {
    /***
    Function to move a post-it to the new position (newLeftPos, newTopPos)
    ***/
    const action = {
      type: 'MOVE_POSTIT',
      value: {id: id, topPos: newTopPos, leftPos: newLeftPos},
    }; // Create the corresponding action
    dispatch(action); // Dispatch the action
    if (
      newLeftPos + squareSize / 2 + 20 > width ||
      newLeftPos - squareSize / 2 - 20 < 0 ||
      newTopPos - squareSize / 2 - 20 < 0 ||
      newTopPos + squareSize / 2 + 20 > height - 80
    ) {
      if (
        Math.abs(newTopPos - topPos) > 7 ||
        Math.abs(newLeftPos - leftPos) > 7
      ) {
        // If the new position is close to the edges of the device and
        // if there is a significant change of position,
        // send this action to the connected devices
        transposeAndSendAction(action);
      }
    }
  };

  const resizePostIt = (newSquareSize) => {
    /***
    Function to resize a post-it, with the new size
    ***/
    const action = {
      type: 'RESIZE_POSTIT',
      value: {id: id, newSquareSize: newSquareSize},
    }; // Create the corresponding action
    dispatch(action); // Dispatch this action
    if (Math.abs(squareSize - newSquareSize) > 7) {
      // If there is significant size change,
      // send this action to the connected devices
      sendMessageToAll(JSON.stringify(action));
    }
  };

  const changeText = (newText) => {
    /***
    Function to change the text of the post-it
    ***/
    setTextValue(newText); // Change the text value
    const action = {type: 'CHANGE_TEXT', value: {id: id, newText: newText}}; // Create the corresponding action
    sendMessageToAll(JSON.stringify(action)); // Send this action to the connected devices
  };

  const gestureResponder = createResponder({
    /***
    Gesture detection
    ***/
    onStartShouldSetResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      return gestureState.dx != 0 && gestureState.dy != 0;
    },
    onMoveShouldSetResponder: (evt, gestureState) => true,
    onMoveShouldSetResponderCapture: (evt, gestureState) => true,

    onResponderGrant: (evt, gestureState) => {},
    onResponderMove: (evt, gestureState) => {
      if (gestureState.pinch && gestureState.previousPinch) {
        // Pinching gesture, resize the post-it
        resizePostIt(
          (squareSize * gestureState.pinch) / gestureState.previousPinch,
        );
      }
      // Dragging gesture, move the post-it
      movePostIt(
        topPos + gestureState.moveY - gestureState.previousMoveY,
        leftPos + gestureState.moveX - gestureState.previousMoveX,
      );

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
          onChangeText={(text) => {
            changeText(text);
          }}
          multiline={true}>
          {textValue}
          {}
        </TextInput>
      </TouchableOpacity>
    </View>
  );
};
