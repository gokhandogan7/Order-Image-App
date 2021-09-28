import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';

const DeleteButton = ({title,onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}>
      <Text
        style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default DeleteButton;

const styles = StyleSheet.create ({


container:{
    borderRadius: 30,
    paddingRight: 8,
    paddingLeft: 8,
    borderWidth: 1,
    position: 'absolute',
    right: 14,
    bottom:14,
    backgroundColor:'#b1e6ba' 
  },
  text:{
    color: 'black',
    fontSize: 24,
  }
})