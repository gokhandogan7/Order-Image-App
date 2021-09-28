import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
uuid.v4(); // ⇨ '11edc52b-2918-4d71-9058-f7285e29d894'

// TODO: Handle delete all same images
// TODO: Filter the state (no need all parameters)

const PickerImage = props => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState(null);

  const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then(i => {
        const imageData = {
          id: uuid.v4(),
          uri: i.path,
          width: i.width,
          height: i.height,
          mime: i.mime,
        };
        props.setImageList(list => [...list, imageData]);
        props.onClose();
      })
      .catch(e => alert(e));
  };

  const pickMultiple = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    })
      .then(images => {
        const imageDataList = images.map(i => {
          console.log('received image', i.localIdentifier);
          return {
            id: uuid.v4(),
            uri: i.path,
            width: i.width,
            height: i.height,
            mime: i.mime,
          };
        });
        props.setImageList(list => [...list, ...imageDataList]);
        setImage(null);

        setImages(
          images.map(i => {
            console.log('received image', i);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          }),
        );
        props.onClose();
      })
      .catch(e => alert(e));
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginVertical: 10}}>
              <TouchableOpacity
                onPress={pickMultiple}
                style={styles.touchableView}>
                <Text style={styles.textStyle}>Choose From Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => pickSingleWithCamera(true)}
                style={styles.touchableView}>
                <Text style={styles.textStyle}>Take Photo With Camera</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => props.onClose()}
              style={styles.closeButton}>
              <Text style={[styles.textStyle, {color: 'white'}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fafafa',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: '#78909c',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  touchableView: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#b3e5fc',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 12,
    alignSelf: 'center',
    marginVertical: 5,
  },
  closeButton: {
    width: Dimensions.get('window').width * 0.3,
    backgroundColor: '#ec407a',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 7,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default PickerImage;
