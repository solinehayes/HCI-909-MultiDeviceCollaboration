import React, {FunctionComponent} from 'react';
import {View, ViewStyle, TouchableOpacity, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {shadow, theme} from '../../../theme/index';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (visibility: boolean) => void;
  createPostIt: (color: string) => void;
}
interface Styles {
  modal: ViewStyle;
  colorPin: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  modal: {
    ...theme.shadow,
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

export const ColorsModal: FunctionComponent<Props> = ({
  isModalVisible,
  setIsModalVisible,
  createPostIt,
}) => {
  const renderColors = ({item, index}: {item: string; index: any}) => {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.colorPin, {backgroundColor: item}]}
        onPress={() => {
          createPostIt(item);
          setIsModalVisible(false);
        }}
      />
    );
  };
  const inset = useSafeAreaInsets();
  return (
    <Modal
      isVisible={isModalVisible}
      hasBackdrop={true}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}
      backdropColor={theme.colors.white}
      style={{
        justifyContent: 'flex-start',
        marginTop: inset.top + 4 * theme.gridUnit,
      }}>
      <View style={styles.modal}>
        <FlatList
          data={theme.postItColors}
          horizontal
          renderItem={renderColors}
          keyExtractor={(color: string): string => color}
        />
      </View>
    </Modal>
  );
};
