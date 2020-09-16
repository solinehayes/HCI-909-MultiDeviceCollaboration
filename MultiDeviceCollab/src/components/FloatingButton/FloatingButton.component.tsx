import React, {FunctionComponent} from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {theme} from '../../../theme';

interface Props {
  iconName: string;
}
interface Styles {
  container: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    ...theme.shadow,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.grey,
    padding: 2 * theme.gridUnit,
    margin: 2 * theme.gridUnit,
    borderRadius: theme.dimensions.button / 2,
    width: theme.dimensions.button,
    height: theme.dimensions.button,
  },
});

export const FloatingButton: FunctionComponent<Props> = ({iconName}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        console.log('test');
      }}>
      <Icon name={iconName} size={20} />
    </TouchableOpacity>
  );
};
