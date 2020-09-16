import React, {FunctionComponent} from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  iconName: string;
}
interface Styles {
  container: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    padding: 8,
    margin: 8,
    borderRadius: 20,
    width: 40,
    height: 40,
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
