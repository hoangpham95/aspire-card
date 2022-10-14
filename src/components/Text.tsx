import React from 'react';
import {Text, TextProps} from 'react-native';
import Styles from '../styles';

export default function AppText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, {fontFamily: Styles.defaultFontFamily}]}
    />
  );
}
