import React, {FunctionComponent} from 'react';
import {View, ViewStyle, TouchableOpacity, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../../../theme/index';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (visibility: boolean) => void;
  createPostIt: (color: string) => void;
}
interface Styles {
  container: ViewStyle;
  colorPin: ViewStyle;
  modal: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
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
  modal: {
    justifyContent: 'flex-start',
  },
});

export const ColorsModal: FunctionComponent<Props> = ({
  isModalVisible,
  setIsModalVisible,
  createPostIt,
}) => {
  /***
  The Color Modal is displayed on the create post-it button and allows us to select the color we want the new post-it to be
  ***/

  const renderColors = ({item, index}: {item: string; index: any}) => {
    /***
    Displays one color as clickable on the modal color
    ***/
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
      style={[
        {
          marginTop: inset.top + 4 * theme.gridUnit,
        },
        styles.modal,
      ]}>
      <View style={styles.container}>
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
