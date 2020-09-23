import React, {FunctionComponent} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DrawingZone} from './pages/DrawingZone/DrawingZone.component';

const App: FunctionComponent = () => {
  return (
    <SafeAreaProvider>
      <DrawingZone />
    </SafeAreaProvider>
  );
};

export default App;
