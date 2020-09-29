import React from 'react';
import {View, Text, TextInput, TouchableOpacity, ViewStyle, StyleSheet, PanResponder, Dimensions, Animated} from 'react-native';
import {theme} from '../../../theme';

interface Props {
  textInit : string
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


export const PostIt: FunctionComponent<Props> = ({textInit, id}) => {

  const pan = React.useState(new Animated.ValueXY())[0]
  const [textValue, onChangeText] = React.useState(textInit);

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
        <TextInput style={styles.text} onChangeText={text=>onChangeText(text)}>{textInit}</TextInput>
      </TouchableOpacity>

    </Animated.View>
  );
};
