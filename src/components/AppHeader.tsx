import React, {PropsWithChildren} from 'react';
import {TouchableHighlight, View, ViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Styles from '../styles';
import {BackIcon} from './AppIcon';

type HeaderProps = {
  onBackPressed: () => void;
};

export default function AppHeader(
  props: PropsWithChildren & ViewProps & HeaderProps,
) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        position: 'absolute',
        top: insets.top,
        left: 0,
        right: 0,
        height: Styles.headerHeight,
        flexDirection: 'row',
      }}
    >
      <TouchableHighlight
        onPress={props.onBackPressed}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 12,
        }}
      >
        <BackIcon />
      </TouchableHighlight>
      {props.children}
    </View>
  );
}
