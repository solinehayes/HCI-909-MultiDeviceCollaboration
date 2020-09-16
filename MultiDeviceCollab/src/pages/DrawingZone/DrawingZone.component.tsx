import React, {FunctionComponent} from 'react';
import {Text, SafeAreaView, ViewStyle, StyleSheet} from 'react-native';
import {FloatingButton} from '../../components/FloatingButton/FloatingButton.component';

interface Styles {
  container: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export const DrawingZone: FunctionComponent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FloatingButton iconName="rocket" />
    </SafeAreaView>
  );
};
