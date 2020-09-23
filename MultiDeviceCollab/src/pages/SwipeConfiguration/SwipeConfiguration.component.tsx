import React, {FunctionComponent} from 'react';
import {View, SafeAreaView, ViewStyle, StyleSheet, Text} from 'react-native';
import {FloatingButton} from '../../components/FloatingButton/FloatingButton.component';
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
  textContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export const SwipeConfiguration: FunctionComponent = () => {

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.textContainer}>
        <Text> Swipe to configure </Text>
      </View>

    </SafeAreaView>
  );
};
