import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, SafeAreaView, ViewStyle, StyleSheet} from 'react-native';
import {FloatingButton} from '../../components/FloatingButton/FloatingButton.component';
import {PostIt} from '../../components/PostIt/PostIt.component';
import {theme} from '../../../theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ConnectedDevice} from '../../components/ConnectedDevice/ConnectedDevice.component';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigatorRouteNames, RootStackParamList} from '../../App';
import {ConnectionModal} from '../../components/ConnectionModal/ConnectionModal.component';
import {ColorsModal} from '../../components/ColorsModal/ColorsModal.component';
import {EndPoint, useGoogleNearby} from './useGoogleNearby.hook';
import {connect, ConnectedProps, useDispatch} from 'react-redux';
import {UserNameModal} from '../../components/UserNameModal/UserNameModal.component';

type DrawingComponentNavigationProp = StackNavigationProp<
  RootStackParamList,
  RootNavigatorRouteNames.DRAWING_ZONE
>;

const mapStateToProps = (state) => {
  return {
    postits: state.postit.postits, // List of post-its to draw
    index: state.postit.index, // First available post-it id
    copied: state.postit.copied,
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
    /***
    Main page
    ***/
    const dispatch = useDispatch(); // Used to dispatch action to the app's store
    const [
      isConnectionModalDisplayed,
      setIsConnectionModalDisplayed,
    ] = useState<boolean>(false); // Boolean state for the connection modal visibility
    const [isColorsModalDisplayed, setIsColorsModalDisplayed] = useState<
      boolean
    >(false); // Boolean state for the color modal (used to device the post-it color) visibility
    const [isUserNameModalDisplayed, setIsUserNameModalDisplayed] = useState<
      boolean
    >(false); // Boolean state for the userName modal visibility

    const openColorChooser = () => {
      /***
      Function to open the color modal
      ***/
      setIsColorsModalDisplayed(true);
    };

    const sendMessageToAll = (message: string) => {
      /***
      Function that sends the message to all connected devices
      ***/
      connectedEndPoints.map((device: EndPoint) => {
        sendMessage(message, device.endpointId);
      });
    };

    const addPostIt = (color: string) => {
      /***
      Function that adds a post it to the phone's canvas and send the action to create a post it to the other connected devices
      ***/
      const action = {
        type: 'ADD_POSTIT',
        value: {
          id: props.index,
          text: 'post-it ' + props.index,
          leftPos: 100,
          topPos: 100,
          squareSize: 100,
          color: color,
        },
      }; // Create the corresponding action
      dispatch(action); // Dispatch this action
      transposeAndSendAction(action); // Send the action to the other devices
    };

    const copyPostits = () => {
      if (!props.copied) {
        console.log('Copy');
        props.postits.map((postit) => {
          const action = {
            type: 'ADD_POSTIT',
            value: {
              id: postit.id,
              text: postit.text,
              leftPos: postit.leftPos,
              topPos: postit.topPos,
              squareSize: postit.squareSize,
              color: postit.color,
            },
          };
          transposeAndSendAction(action);
        });
        dispatch({type: 'SET_COPIED_TRUE'});
      }
    };

    const removeLastPostIt = () => {
      /***
      Function that removes the last post it modified and send the action to remove the last post it to the other connected devices
      ***/
      const action = {
        type: 'REMOVE_LAST',
        value: {},
      };
      dispatch(action);
      sendMessageToAll(JSON.stringify(action));
    };

    const {
      startDiscovering,
      startAdvertising,
      sendMessage,
      transposeAndSendAction,
      connectToNearbyEndpoint,
      nearbyEndpoints,
      connectedEndPoints,
      userName,
      setUserName,
      newAction,
    } = useGoogleNearby({setIsConnectionModalDisplayed, copyPostits});

    useEffect(() => {
      /***
      useEffect function is launched everytime userName is modified
      Opens the userName modal when the username is not defined
      ***/
      if (!userName) {
        setIsUserNameModalDisplayed(true);
      }
    }, [userName]);

    useEffect(() => {
      /***
      useEffect function is launched everytime newAction and dispatch is modified
      Dispatches the new action received from the other devices to the app's store
      ***/
      if (dispatch && newAction) {
        dispatch(JSON.parse(newAction));
      }
    }, [newAction, dispatch]);

    const inset = useSafeAreaInsets(); // Size of the phone's inaccessible areas to the top, bottom, left and right (Eg. Iphone's notch)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topButtonContainer}>
          <ConnectedDevice
            device={{endpointName: userName, endpointId: 'me', color: ''}}
            onPress={() => {
              setIsUserNameModalDisplayed(true);
            }}
          />
          <FloatingButton iconName="file-o" onPress={openColorChooser} />
          <FloatingButton iconName="undo" onPress={removeLastPostIt} />
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
              sendMessageToAll={sendMessageToAll}
              transposeAndSendAction={transposeAndSendAction}
            />
          ))}
        </View>

        <View style={[styles.bottomButtonContainer, {bottom: inset.bottom}]}>
          {connectedEndPoints.map((device: EndPoint) => {
            return (
              <ConnectedDevice
                device={device}
                key={device.endpointId}
                onPress={() => {
                  props.navigation.navigate(
                    RootNavigatorRouteNames.SWIPE_CONFIGURATION,
                    {endPoint: device},
                  );
                }}
              />
            );
          })}
          <FloatingButton
            iconName="wifi"
            onPress={() => {
              setIsConnectionModalDisplayed(true);
              startDiscovering();
              startAdvertising();
            }}
          />
        </View>
        <ConnectionModal
          isModalVisible={isConnectionModalDisplayed}
          setIsModalVisible={setIsConnectionModalDisplayed}
          nearbyDevices={nearbyEndpoints}
          connectToDevice={connectToNearbyEndpoint}
        />
        <ColorsModal
          isModalVisible={isColorsModalDisplayed}
          setIsModalVisible={setIsColorsModalDisplayed}
          createPostIt={addPostIt}
        />
        <UserNameModal
          isModalVisible={isUserNameModalDisplayed}
          setIsModalVisible={setIsUserNameModalDisplayed}
          userName={userName}
          setUserName={setUserName}
        />
      </SafeAreaView>
    );
  },
);
