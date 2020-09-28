import React, {FunctionComponent} from 'react';
import {
  StyleProp,
  View,
  Text,
  ViewStyle,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Device} from 'react-native-ble-plx';
import ModalRN from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {theme} from '../../../theme/index';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (visibility: boolean) => void;
  style?: StyleProp<ViewStyle>;
  connectedDevices: Device[];
}

const renderDevices = ({item}: {item: Device}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('connect to ', item.id);
      }}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};

export const Modal: FunctionComponent<Props> = ({
  isModalVisible,
  setIsModalVisible,
  style,
  connectedDevices,
}) => {
  return (
    <ModalRN
      isVisible={isModalVisible}
      hasBackdrop={true}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}
      style={style}>
      <View>
        <View>
          <Icon name="reload" color={theme.colors.blue} />
          <Text>Connected devices</Text>
          <Icon name="close" color={theme.colors.blue} />
        </View>
        <FlatList
          data={connectedDevices}
          horizontal
          renderItem={renderDevices}
          keyExtractor={(device: Device): string => device.id}
        />
      </View>
    </ModalRN>
  );
};
