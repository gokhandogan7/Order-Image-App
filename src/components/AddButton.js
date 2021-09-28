import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const AddButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.touchableOpacity}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 35,
  },
  touchableOpacity: {
    margin: 20,
    borderRadius: 50,
    paddingRight: 13,
    paddingLeft: 13,
    alignSelf: 'flex-end',
    borderWidth: 2,
  },
});

export default AddButton;
