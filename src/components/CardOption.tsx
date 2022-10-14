import React from 'react';
import {View, Switch, StyleSheet, ViewProps, StyleProp} from 'react-native';
import Colors from '../colors';
import Styles from '../styles';
import AppText from './Text';

const styles = StyleSheet.create({
  childOptionContainer: {
    width: '100%',
    height: 41,
    marginVertical: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  optionIcon: {
    margin: 12,
  },
  optionDetailContainer: {
    alignSelf: 'flex-start',
    flex: 1,
  },
  optionTitle: {
    fontSize: Styles.textSizeRegular,
    fontWeight: '500',
  },
  optionSubtitle: {
    fontSize: Styles.textSizeSubtitle,
  },
});

export type Option = {
  title: string;
  detail: string;
  hasToggle: boolean;
  toggleValue?: boolean;
  icon: JSX.Element;
  onToggle?: () => void;
};

export type OptionProps = {
  option: Option;
  style?: StyleProp<ViewProps>;
};

export default function CardOption(props: OptionProps) {
  return (
    <View style={styles.childOptionContainer}>
      <View style={styles.optionIcon}>{props.option.icon}</View>
      <View style={styles.optionDetailContainer}>
        <AppText style={styles.optionTitle}>{props.option.title}</AppText>
        <AppText style={styles.optionSubtitle}>{props.option.detail}</AppText>
      </View>
      {props.option.hasToggle ? (
        <Switch
          trackColor={{false: Colors.Disabled, true: Colors.Secondary}}
          thumbColor={Colors.Disabled}
          value={props.option.toggleValue}
          onValueChange={() => {
            if (props.option.onToggle) props.option.onToggle();
          }}
        />
      ) : (
        <></>
      )}
    </View>
  );
}
