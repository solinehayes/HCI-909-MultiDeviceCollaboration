import React, {FunctionComponent} from 'react';
import {
  StyleProp,
  View,
  Text,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {theme} from '../../../theme/index';
import {EndPoint} from '../../pages/DrawingZone/useGoogleNearby.hook';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (visibility: boolean) => void;
  style?: StyleProp<ViewStyle>;
  nearbyDevices: EndPoint[];
  connectToDevice: (endpoint: EndPoint) => void;
  onClose: () => void;
}
interface Styles {
  modal: ViewStyle;
  header: ViewStyle;
  title: ViewStyle;
  body: ViewStyle;
  deviceItem: ViewStyle;
  separator: ViewStyle;
}

const renderDevices = ({
  item,
  connectToDevice,
}: {
  item: EndPoint;
  connectToDevice: (endpoint: EndPoint) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        connectToDevice(item);
      }}
      style={styles.deviceItem}>
      <Text>{item.endpointName}</Text>
      <Icon name="wifi" color={theme.colors.blue} size={20} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create<Styles>({
  modal: {
    flex: 1,
    backgroundColor: theme.colors.white,
    marginVertical: 5 * theme.gridUnit,
    borderRadius: 4 * theme.gridUnit,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 3 * theme.gridUnit,
    paddingVertical: 4 * theme.gridUnit,
  },
  title: {fontSize: 20, fontWeight: 'bold'},
  body: {
    flex: 1,
    marginHorizontal: 3 * theme.gridUnit,
    paddingVertical: 4 * theme.gridUnit,
  },
  deviceItem: {
    marginVertical: 3 * theme.gridUnit,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    backgroundColor: '#EEEEEE',
    height: 1,
    width: '100%',
  },
});

export const BluetoothModal: FunctionComponent<Props> = ({
  isModalVisible,
  setIsModalVisible,
  nearbyDevices,
  connectToDevice,
  onClose,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      hasBackdrop={true}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}>
      <SafeAreaView style={styles.modal}>
        <View style={styles.header}>
          <Icon name="undo" color={theme.colors.blue} size={30} />
          <Text style={styles.title}>Nearby devices</Text>
          <TouchableOpacity
            onPress={() => {
              onClose();
              setIsModalVisible(false);
            }}>
            <Icon name="close" color={theme.colors.blue} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <FlatList
            data={nearbyDevices}
            renderItem={({item, index}: {item: EndPoint; index: number}) => {
              return renderDevices({item, connectToDevice});
            }}
            keyExtractor={(device: EndPoint): string => device.endpointId}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};
