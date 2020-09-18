import React, {FunctionComponent} from 'react';
import {View, SafeAreaView, ViewStyle, StyleSheet} from 'react-native';
import {FloatingButton} from '../../components/FloatingButton/FloatingButton.component';
import {PostIt} from '../../components/PostIt/PostIt.component'
import {theme} from '../../../theme';

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
  bottomButtonContainer: {
    alignItems: 'flex-end',
  },
});

export const DrawingZone: FunctionComponent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FloatingButton iconName="file-o" onPress = {() => {
          console.log('test')}}/>
        <FloatingButton iconName="undo" />
        <FloatingButton iconName="pencil" />
      </View>
      <View style={styles.bottomButtonContainer}>
        <FloatingButton iconName="bluetooth-b" />
        <FloatingButton iconName="plus-circle" />
      </View>
      <PostIt />
    </SafeAreaView>
  );
};
