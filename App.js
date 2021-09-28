/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {LogBox} from 'react-native';
import AddButton from './src/components/AddButton';
import DeleteButton from './src/components/DeleteButton';
import PickerImage from './src/components/PickerImage';

//ignore a warning from react native reanimated library (stackoverflow)
LogBox.ignoreLogs([
  'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
]);

function App() {
  const [modalFlag, setModalFlag] = useState(false);

  const [imageList, setImageList] = useState([]);
  console.log('imagelist', imageList);

  const renderItem = useCallback(({item, drag, isActive}) => {
    const deleteHandler = () => {
      setImageList(current => {
        const filtered = current.filter(data => data?.id != item?.id);
        return filtered;
      });
    };
    //for isActive control external style is not possible
    return (
      <View style={{position: 'relative', margin: 10}}>
        <TouchableOpacity
          style={{
            borderWidth: isActive ? 2 : 0,
            borderColor: '#b1e6ba',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
            borderRadius: isActive ? 0 : 10,
          }}
          onLongPress={drag}>
          <Image
            style={{
              width: 180,
              height: isActive ? 280 : 240,
              resizeMode: 'cover',
              borderRadius: isActive ? 0 : 10,
            }}
            source={{uri: item?.uri}}
          />
        </TouchableOpacity>
        <DeleteButton title="╳" onPress={deleteHandler} />
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <PickerImage
          setImageList={setImageList}
          visible={modalFlag}
          onClose={() => setModalFlag(false)}
        />
        <Text style={styles.nameText}>Image App</Text>
      </View>
      <DraggableFlatList
        data={imageList}
        renderItem={renderItem}
        keyExtractor={item => `draggable-item-${item?.id}`}
        onDragEnd={({data}) => setImageList(data)}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <AddButton onPress={() => setModalFlag(true)} />
      <View style={styles.underline}>
        <Text
          style={styles.underlineText}>
          Your Last Dating App
        </Text>
      </View>
    </View>
  );
}
export default App;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nameContainer: {backgroundColor: '#b1e6ba', marginBottom: 10},
  nameText: {
    margin: 15,
    textAlign: 'center',
    fontSize: 35,
    color: 'white',
    fontFamily: 'Pacifico-Regular',
  },
  underline: {
    height: 40,
    width: Dimensions.get('window').width,
    backgroundColor: '#b1e6ba',
  },
  underlineText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    fontFamily: 'Pacifico-Regular',
    paddingTop:4
  },
});
