import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, SafeAreaView, ViewStyle, StyleSheet, Button} from 'react-native';
import {FloatingButton} from '../../components/FloatingButton/FloatingButton.component';
import {PostIt} from '../../components/PostIt/PostIt.component';
import {theme} from '../../../theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWifiDirect, Device} from './useWifiDirect';
import {ConnectedDevice} from '../../components/ConnectedDevice/ConnectedDevice.component';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigatorRouteNames, RootStackParamList} from '../../App';
import {NearbyDevicesModal} from '../../components/NearbyDevicesModal/NearbyDevicesModal.component';
import {ColorsModal} from '../../components/ColorsModal/ColorsModal.component';

type DrawingComponentNavigationProp = StackNavigationProp<
  RootStackParamList,
  RootNavigatorRouteNames.DrawingZone
>;
interface Props {
  navigation: DrawingComponentNavigationProp;
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
  const [postIts, setPostIts] = useState([
    {id: 1, text: 'post-it 1', color: theme.postItColors[0]},
  ]);
  const [isBluetoothModalDisplayed, setIsBluetoothModalDisplayed] = useState<
    boolean
  >(false);
  const [isColorsModalDisplayed, setIsColorsModalDisplayed] = useState<boolean>(
    false,
  );
  const openColorChooser = () => {
    setIsColorsModalDisplayed(true);
  };
  // Function to add a post it
  const addPostIt = (color: string) => {
    const newId = postIts.length + 1;
    setPostIts(postIts.concat({id: newId, text: 'post-it ' + newId, color}));
  };
  const removeLastPostIt = () => {
    if (postIts.length !== 0) {
      setPostIts(postIts.slice(0, postIts.length - 1));
    }
  };
  const inset = useSafeAreaInsets();

  const {
    init,
    scanDevices,
    nearbyDevices,
    isScanLoading,
    connectedDevices,
    connectToDevice,
    sendMessageToDevice,
    createGroupOnDevice,
    getConnectionInfoFromDevice,
    receivedMessageFromOthers,
  } = useWifiDirect();

  useEffect(() => {
    init();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topButtonContainer}>
        <FloatingButton iconName="file-o" onPress={openColorChooser} />
        <FloatingButton iconName="undo" onPress={removeLastPostIt} />
        <FloatingButton iconName="pencil" onPress={() => {}} />
      </View>

      <View>
        {postIts.map((postit) => (
          <PostIt
            id={postit.id}
            textInit={postit.text}
            key={postit.id}
            color={postit.color}
          />
        ))}
      </View>

      <View style={[styles.bottomButtonContainer, {bottom: inset.bottom}]}>
        {connectedDevices.map((device: Device) => {
          return (
            <ConnectedDevice
              device={device}
              color={
                theme.postItColors[
                  Math.floor(Math.random() * (theme.postItColors.length - 1))
                ]
              }
              key={device.deviceAddress}
              onPress={() => {
                sendMessageToDevice();
                navigation.navigate(RootNavigatorRouteNames.SwipeConfiguration);
              }}
            />
          );
        })}
        <FloatingButton
          iconName="bluetooth-b"
          onPress={() => {
            setIsBluetoothModalDisplayed(true);
            scanDevices();
          }}
        />
        <Button onPress={createGroupOnDevice} title="create group" />
        <Button
          onPress={getConnectionInfoFromDevice}
          title="getConnectionInfo"
        />
        <Button onPress={receivedMessageFromOthers} title="receive message" />
        <Button onPress={sendMessageToDevice} title="send message" />
      </View>
      <NearbyDevicesModal
        isModalVisible={isBluetoothModalDisplayed}
        setIsModalVisible={setIsBluetoothModalDisplayed}
        nearbyDevices={nearbyDevices}
        scanDevices={scanDevices}
        isScanLoading={isScanLoading}
        connectToDevice={connectToDevice}
      />
      <ColorsModal
        isModalVisible={isColorsModalDisplayed}
        setIsModalVisible={setIsColorsModalDisplayed}
        createPostIt={addPostIt}
      />
    </SafeAreaView>
  );
};
