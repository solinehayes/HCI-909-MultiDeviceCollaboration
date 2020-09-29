import React from 'react';
import {View, Text, TouchableOpacity, ViewStyle, StyleSheet, PanResponder, Dimensions, Animated} from 'react-native';
import {theme} from '../../../theme';

interface Props {
  text : string
  id : int
}
interface Styles {
  container: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: theme.colors.blue,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    },
  text : {
    fontWeight: 'bold'
  }
});


export const PostIt: FunctionComponent<Props> = ({text, id}) => {

  const pan = React.useState(new Animated.ValueXY())[0]

  const panResponder = React.useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () =>{
        console.log("Pan responder")
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        })
      },
      onPanResponderMove: Animated.event([null, {
        dx: pan.x, dy: pan.y}], {useNativeDriver:false}),
        onPanResponderRelease: () => {
          pan.flattenOffset()
        },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },
    })
  )[0]


  return (
    <Animated.View
      id={id}
      style={pan.getLayout()}
      {...panResponder.panHandlers}>

      <TouchableOpacity style={styles.container} onPress={()=>console.log("Pressed")}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>

    </Animated.View>
  );
};
