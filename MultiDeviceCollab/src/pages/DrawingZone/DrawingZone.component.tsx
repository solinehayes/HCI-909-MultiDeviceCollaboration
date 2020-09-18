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

  const addPostIt = () => {
    console.log("Add post it")

  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FloatingButton iconName="file-o"
          onPress = {addPostIt}/>
        <FloatingButton iconName="undo" />
        <FloatingButton iconName="pencil" />
      </View>

      <PostIt text="post it" id={1}/>

      <View style={styles.bottomButtonContainer}>
        <FloatingButton iconName="bluetooth-b" />
        <FloatingButton iconName="plus-circle" />
      </View>

    </SafeAreaView>
  );
};
