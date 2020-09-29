import React, {FunctionComponent} from 'react';
import {View, ViewStyle, TouchableOpacity, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {theme} from '../../../theme/index';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (visibility: boolean) => void;
}
interface Styles {
  modal: ViewStyle;
  colorPin: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  modal: {
    backgroundColor: theme.colors.white,
    marginVertical: 5 * theme.gridUnit,
    borderRadius: 4 * theme.gridUnit,
    flexDirection: 'row',
  },
  colorPin: {
    height: theme.dimensions.button,
    width: theme.dimensions.button,
    borderRadius: theme.dimensions.button / 2,
    margin: theme.gridUnit * 3,
  },
});

const renderColors = ({item, index}: {item: string; index: any}) => {
  return (
    <TouchableOpacity
      style={[styles.colorPin, {backgroundColor: item}]}
      key={index}
    />
  );
};

export const ColorsModal: FunctionComponent<Props> = ({
  isModalVisible,
  setIsModalVisible,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      hasBackdrop={true}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}>
      <View style={styles.modal}>
        <FlatList
          data={theme.postItColors}
          horizontal
          renderItem={renderColors}
        />
      </View>
    </Modal>
  );
};
