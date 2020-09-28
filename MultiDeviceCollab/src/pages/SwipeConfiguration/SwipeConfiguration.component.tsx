import React, {FunctionComponent} from 'react';
import {TouchableWithoutFeedback, View, SafeAreaView, ViewStyle, StyleSheet, Text} from 'react-native';
import {FloatingButton} from '../../components/FloatingButton/FloatingButton.component';
import {theme} from '../../../theme';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

interface Styles {
  container: ViewStyle;
  bottomButtonContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
  },
  gestureRecognizeContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export const SwipeConfiguration: FunctionComponent = () => {

  const config = {
      velocityThreshold: 0.5,
      directionalOffsetThreshold: 80
    };

  const [swipeText, setSwipeText] = React.useState("")

  const onSwipeUp = (gestureState) => {
    setSwipeText('You swiped up!');
    console.log('swipe up');
  }

  const onSwipeDown = (gestureState) => {
    setSwipeText('You swiped down!');
    console.log('swipe down');
  }

  const onSwipeLeft = (gestureState) => {
    setSwipeText('You swiped left!');
    console.log('swipe left');
  }

  const onSwipeRight = (gestureState) => {
    setSwipeText('You swiped right!');
    console.log('swipe right');
  }

  const onSwipe = (gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        setSwipeText('You swiped up!');
        console.log('swipe up');
        break;
      case SWIPE_DOWN:
        setSwipeText('You swiped down!');
        console.log('swipe down');
        break;
      case SWIPE_LEFT:
        setSwipeText('You swiped left!');
        console.log('swipe left');
        break;
      case SWIPE_RIGHT:
        setSwipeText('You swiped right!');
        console.log('swipe right');
        break;
    }
  }

  return (
    <TouchableWithoutFeedback>
      <GestureRecognizer
        onSwipe={onSwipe}
        onPress={(state) => onSwipeUp(state)}
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={config}
        style={styles.gestureRecognizeContainer}
      >
        <Text> Swipe to configure </Text>
        <Text> {swipeText} </Text>
      </GestureRecognizer>

    </TouchableWithoutFeedback>

  );
};
