import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  View,
  Text,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextStyle,
  DeviceEventEmitter,
} from 'react-native';
import Modal from 'react-native-modal';
import {theme} from '../../../theme/index';
import {EventEmitKey} from '../../pages/DrawingZone/useGoogleNearby.hook';

interface Styles {
  modal: ViewStyle;
  title: ViewStyle;
  body: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  modal: {
    ...theme.shadow,
    backgroundColor: theme.colors.white,
    marginVertical: 5 * theme.gridUnit,
    borderRadius: 4 * theme.gridUnit,
    borderWidth: 0.5 * theme.gridUnit,
    borderColor: theme.colors.red,
    padding: 3 * theme.gridUnit,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.red,
    marginBottom: 3 * theme.gridUnit,
  },
  body: {
    marginHorizontal: 3 * theme.gridUnit,
    paddingVertical: 4 * theme.gridUnit,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: theme.colors.red,
    borderRadius: 4 * theme.gridUnit,
    marginTop: 3 * theme.gridUnit,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    marginHorizontal: 3 * theme.gridUnit,
    paddingVertical: 4 * theme.gridUnit,
    justifyContent: 'center',
    color: theme.colors.white,
  },
});

export const ErrorModal: FunctionComponent = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const setModalVisible = async (text: string) => {
    setErrorMessage(text);
    setIsModalVisible(true);
  };
  useEffect(() => {
    DeviceEventEmitter.addListener(EventEmitKey.ERROR, setModalVisible);
    return () => {
      DeviceEventEmitter.removeListener(EventEmitKey.ERROR, setModalVisible);
    };
  }, []);
  return (
    <Modal
      isVisible={isModalVisible}
      hasBackdrop={true}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}>
      <SafeAreaView style={styles.modal}>
        <View style={styles.body}>
          <Text style={styles.title}>Error</Text>
          <Text>An error has occured, please try again.</Text>
          <Text>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsModalVisible(false);
            }}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
