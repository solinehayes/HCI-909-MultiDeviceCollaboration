import React, {FunctionComponent, useState} from 'react';
import {
  View,
  ViewStyle,
  Text,
  StyleSheet,
  SafeAreaView,
  TextStyle,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {theme} from '../../../theme/index';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (visibility: boolean) => void;
  setUserName: (userName: string) => void;
  userName: string;
}
interface Styles {
  modal: ViewStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  title: TextStyle;
  enabledButtonText: TextStyle;
  disabledButtonText: TextStyle;
  textInput: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  modal: {
    ...theme.shadow,
    backgroundColor: theme.colors.white,
    marginVertical: 5 * theme.gridUnit,
    borderRadius: 4 * theme.gridUnit,
    padding: 3 * theme.gridUnit,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3 * theme.gridUnit,
  },
  button: {
    borderColor: theme.colors.blue,
  },
  title: {
    padding: 3 * theme.gridUnit,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  enabledButtonText: {
    color: theme.colors.blue,
    fontWeight: 'bold',
  },
  disabledButtonText: {color: theme.colors.grey, fontWeight: 'bold'},
  textInput: {},
});

export const UserNameModal: FunctionComponent<Props> = ({
  isModalVisible,
  setIsModalVisible,
  setUserName,
  userName,
}) => {
  const [newUserName, setNewUserName] = useState<string>(userName);
  const isSaveDisabled = !newUserName;
  const isCancelDisabled = !userName;

  return (
    <Modal
      isVisible={isModalVisible}
      hasBackdrop={true}
      onBackdropPress={() => {
        if (!isCancelDisabled) {
          setIsModalVisible(false);
        }
      }}>
      <SafeAreaView style={styles.modal}>
        <Text style={styles.title}>Enter your device's name:</Text>
        <TextInput
          value={newUserName}
          onChangeText={setNewUserName}
          placeholder="Enter your device's username"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            disabled={isCancelDisabled}
            onPress={() => {
              setIsModalVisible(false);
            }}>
            <Text
              style={
                isCancelDisabled
                  ? styles.disabledButtonText
                  : styles.enabledButtonText
              }>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setUserName(newUserName);
              setIsModalVisible(false);
            }}
            disabled={isSaveDisabled}>
            <Text
              style={
                isSaveDisabled
                  ? styles.disabledButtonText
                  : styles.enabledButtonText
              }>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
