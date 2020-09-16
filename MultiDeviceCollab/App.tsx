import React, {FunctionComponent} from 'react';
import {SafeAreaView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App: FunctionComponent = () => {
  return (
    <SafeAreaView>
      <Icon name={'rocket'} />
    </SafeAreaView>
  );
};

export default App;
