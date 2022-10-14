import React from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors from '../colors';
import {LogoIcon} from './AppIcon';

export default function Background(props: React.PropsWithChildren & ViewProps) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[
        StyleSheet.absoluteFill,
        {backgroundColor: Colors.Primary},
        props.style,
      ]}
    >
      <LogoIcon
        style={{position: 'absolute', right: 24, top: insets.top + 16}}
      />
      {props.children}
    </SafeAreaView>
  );
}
