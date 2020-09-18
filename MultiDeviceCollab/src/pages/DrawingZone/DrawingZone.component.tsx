import React, {FunctionComponent} from 'react';
import {View, SafeAreaView, ViewStyle, StyleSheet} from 'react-native';
import {FloatingButton} from '../../components/FloatingButton/FloatingButton.component';
import {PostIt} from '../../components/PostIt/PostIt.component'
import {theme} from '../../../theme';

interface Styles {
  container: ViewStyle;
  bottomButtonContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
  },
  bottomButtonContainer: {
    alignItems: 'flex-end',
  },
});

export const DrawingZone: FunctionComponent = () => {

  // List of post it to render
  const [postIts, setPostIts] = React.useState([{id:1, text:"post-it 1"}])

  // Function to add a post it
  const addPostIt = () => {
    console.log("Add post it")
    const newId = postIts.length+1
    setPostIts(postIts.concat({id: newId, text:"post-it "+newId}))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FloatingButton iconName="file-o"
          onPress = {addPostIt}/>
        <FloatingButton iconName="undo" />
        <FloatingButton iconName="pencil" />
      </View>

      <View >
        {postIts.map((postit) => (
          <PostIt id={postit.id} text={postit.text} key={postit.id}/>
        ))}
      </View>

      <View style={styles.bottomButtonContainer}>
        <FloatingButton iconName="bluetooth-b" />
        <FloatingButton iconName="plus-circle" />
      </View>

    </SafeAreaView>
  );
};
