import React, {FunctionComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';
import {theme} from '../../../theme';
import {EndPoint} from '../../pages/DrawingZone/useGoogleNearby.hook';

interface Props {
  device: EndPoint;
  onPress: () => void;
}
interface Styles {
  container: ViewStyle;
  deviceName: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    ...theme.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2 * theme.gridUnit,
    margin: 2 * theme.gridUnit,
    borderRadius: theme.dimensions.button / 2,
    width: theme.dimensions.button,
    height: theme.dimensions.button,
  },
  deviceName: {
    flex: 1,
    color: theme.colors.black,
    fontSize: 10,
  },
});

export const ConnectedDevice: FunctionComponent<Props> = ({
  device,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: device.color || theme.colors.grey},
      ]}
      onPress={onPress}>
      <Text>{device.endpointName.slice(0, 2).toUpperCase()}</Text>
    </TouchableOpacity>
  );
};
