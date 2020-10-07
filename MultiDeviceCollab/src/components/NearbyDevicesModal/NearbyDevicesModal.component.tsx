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
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {theme} from '../../../theme/index';
import {Device} from '../../pages/DrawingZone/useWifiDirect';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (visibility: boolean) => void;
  style?: StyleProp<ViewStyle>;
  nearbyDevices: Device[];
  scanDevices: () => void;
  isScanLoading: boolean;
  connectToDevice: (device: Device) => void;
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
  index,
  connectToDevice,
}: {
  item: Device;
  index: any;
  connectToDevice: (device: Device) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        connectToDevice(item);
      }}
      style={styles.deviceItem}>
      <Text>{item.deviceName}</Text>
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

export const NearbyDevicesModal: FunctionComponent<Props> = ({
  isModalVisible,
  setIsModalVisible,
  nearbyDevices,
  scanDevices,
  isScanLoading,
  connectToDevice,
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
          <TouchableOpacity onPress={scanDevices}>
            {isScanLoading ? (
              <ActivityIndicator color={theme.colors.blue} />
            ) : (
              <Icon name="undo" color={theme.colors.blue} size={30} />
            )}
          </TouchableOpacity>
          <Text style={styles.title}>Nearby devices</Text>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
            }}>
            <Icon name="close" color={theme.colors.blue} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          {isScanLoading ? (
            <ActivityIndicator color={theme.colors.blue} />
          ) : (
            <FlatList
              data={nearbyDevices}
              renderItem={({index, item}: {item: Device; index: any}) => {
                return renderDevices({index, item, connectToDevice});
              }}
              keyExtractor={(device: Device): string => device.deviceAddress}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};
