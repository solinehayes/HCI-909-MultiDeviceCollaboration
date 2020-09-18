import React from 'react';
import {View, TouchableOpacity, ViewStyle, StyleSheet, PanResponder, Dimensions, Animated} from 'react-native';
import {theme} from '../../../theme';

interface Props {
  //iconName: string;
}
interface Styles {
  container: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: theme.colors.blue,
    width: 100,
    height: 100
  },
});


export const PostIt: FunctionComponent<Props> = ({}) => {

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
        }
    })
  )[0]

  console.log(pan.getLayout())

  return (
    <Animated.View
      style={[styles.container, pan.getLayout()]}
      {...panResponder.panHandlers}
    />
  );
};
