import React, {FunctionComponent} from 'react';
import {SafeAreaView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App: FunctionComponent = () => {
  return (
    <SafeAreaView>
      <Icon name={'rocket'} size={30} />
    </SafeAreaView>
  );
};

export default App;
