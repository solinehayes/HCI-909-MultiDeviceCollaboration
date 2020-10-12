import React, {FunctionComponent, useState} from 'react';
import {View, SafeAreaView, ViewStyle, StyleSheet, Button} from 'react-native';
import {FloatingButton} from '../../components/FloatingButton/FloatingButton.component';
import {PostIt} from '../../components/PostIt/PostIt.component';
import {theme} from '../../../theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ConnectedDevice} from '../../components/ConnectedDevice/ConnectedDevice.component';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigatorRouteNames, RootStackParamList} from '../../App';
import {BluetoothModal} from '../../components/BluetoothModal/BluetoothModal.component';
import {ColorsModal} from '../../components/ColorsModal/ColorsModal.component';
import {EndPoint, useGoogleNearby} from './useGoogleNearby.hook';
import {connect, ConnectedProps, useDispatch} from 'react-redux';

type DrawingComponentNavigationProp = StackNavigationProp<
  RootStackParamList,
  RootNavigatorRouteNames.DrawingZone
>;

const mapStateToProps = (state) => {
  return {
    postits: state.postits,
  };
};

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

type Props = ReduxProps & {
  navigation: DrawingComponentNavigationProp;
};

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

export const DrawingZone: FunctionComponent<Props> = connector(
  (props: Props) => {
    // List of post it to render
    //const [postIts, setPostIts] = useState([
    //  {id: 1, text: 'post-it 1', color: theme.postItColors[0]},
    //]);
    const dispatch = useDispatch();
    const [isBluetoothModalDisplayed, setIsBluetoothModalDisplayed] = useState<
      boolean
    >(false);
    const [isColorsModalDisplayed, setIsColorsModalDisplayed] = useState<
      boolean
    >(false);
    const openColorChooser = () => {
      setIsColorsModalDisplayed(true);
    };
    // Function to add a post it
    const addPostIt = (color: string) => {
      //const newId = postIts.length + 1;
      //setPostIts(postIts.concat({id: newId, text: 'post-it ' + newId, color}));
      const newId = props.postits.length / 2 + 1;
      const action = {
        type: 'ADD_POSTIT',
        value: {
          id: newId,
          text: 'post-it ' + newId,
          leftPos: 100,
          topPos: 100,
          squareSize: 100,
          color: color,
        },
      };
      // Ajouter post it bis pour test
      const action2 = {
        type: 'ADD_POSTIT',
        value: {
          id: -newId,
          text: 'post-it ' + newId + ' bis',
          leftPos: 100 - 360,
          topPos: 100,
          squareSize: 100,
          color: color,
        },
      };
      dispatch(action);
      dispatch(action2);
    };
    const removeLastPostIt = () => {
      //if (postIts.length !== 0) {
      //setPostIts(postIts.slice(0, postIts.length - 1));
      //}
    };
    const inset = useSafeAreaInsets();

    const {
      startDiscovering,
      startAdvertising,
      sendMessage,
      connectToNearbyEndpoint,
      nearbyEndpoints,
      connectedEndPoints,
    } = useGoogleNearby();

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topButtonContainer}>
          <FloatingButton iconName="file-o" onPress={openColorChooser} />
          <FloatingButton iconName="undo" onPress={removeLastPostIt} />
          <FloatingButton iconName="pencil" onPress={() => {}} />
        </View>

        <View>
          {props.postits.map((postit) => (
            <PostIt
              id={postit.id}
              textInit={postit.text}
              topPos={postit.topPos}
              leftPos={postit.leftPos}
              squareSize={postit.squareSize}
              key={postit.id}
              color={postit.color}
            />
          ))}
        </View>

        <View style={[styles.bottomButtonContainer, {bottom: inset.bottom}]}>
          {connectedEndPoints.map((device: EndPoint) => {
            return (
              <ConnectedDevice
                device={device}
                color={
                  theme.postItColors[
                    Math.floor(Math.random() * (theme.postItColors.length - 1))
                  ]
                }
                key={device.endpointId}
                onPress={() => {
                  props.navigation.navigate(
                    RootNavigatorRouteNames.SwipeConfiguration,
                  );
                }}
              />
            );
          })}
          <FloatingButton
            iconName="bluetooth-b"
            onPress={() => {
              setIsBluetoothModalDisplayed(true);
              startDiscovering();
              startAdvertising();
            }}
          />
          <Button
            title="Send Hello world"
            onPress={() => {
              connectedEndPoints.map((device: EndPoint) => {
                sendMessage(
                  'Hello World',
                  device.endpointName,
                  device.endpointId,
                );
              });
            }}
          />
        </View>
        <BluetoothModal
          isModalVisible={isBluetoothModalDisplayed}
          setIsModalVisible={setIsBluetoothModalDisplayed}
          nearbyDevices={nearbyEndpoints}
          connectToDevice={connectToNearbyEndpoint}
        />
        <ColorsModal
          isModalVisible={isColorsModalDisplayed}
          setIsModalVisible={setIsColorsModalDisplayed}
          createPostIt={addPostIt}
        />
      </SafeAreaView>
    );
  },
);
