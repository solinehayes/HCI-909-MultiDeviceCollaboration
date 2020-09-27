import React, {FunctionComponent, useEffect} from 'react';
import {View, SafeAreaView, ViewStyle, StyleSheet} from 'react-native';
import {FloatingButton} from '../../components/FloatingButton/FloatingButton.component';
import {PostIt} from '../../components/PostIt/PostIt.component';
import {theme} from '../../../theme';
import {NavigationContainer} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useBluetooth} from './useBluetooth.hook';

interface Props {
  navigation;
}

interface Styles {
  container: ViewStyle;
  bottomButtonContainer: ViewStyle;
  topButtonContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
  },
  bottomButtonContainer: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  topButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
});

export const DrawingZone: FunctionComponent<Props> = ({navigation}) => {
  // List of post it to render
  const [postIts, setPostIts] = React.useState([{id: 1, text: 'post-it 1'}]);

  // Function to add a post it
  const addPostIt = () => {
    console.log('Add post it');
    const newId = postIts.length + 1;
    setPostIts(postIts.concat({id: newId, text: 'post-it ' + newId}));
  };
  const inset = useSafeAreaInsets();

  const {
    isBluetoothEnabled,
    listOfdevices,
    startBleManager,
    scanDevices,
  } = useBluetooth();

  useEffect(() => {
    startBleManager();
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topButtonContainer}>
        <FloatingButton iconName="file-o" onPress={addPostIt} />
        <FloatingButton iconName="undo" onPress={() => {}} />
        <FloatingButton iconName="pencil" onPress={() => {}} />
      </View>

      <View>
        {postIts.map((postit) => (
          <PostIt id={postit.id} text={postit.text} key={postit.id} />
        ))}
      </View>

      <View style={[styles.bottomButtonContainer, {bottom: inset.bottom}]}>
        <FloatingButton
          iconName="bluetooth-b"
          onPress={() => {
            scanDevices();
          }}
        />
        <FloatingButton iconName="plus-circle" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};
