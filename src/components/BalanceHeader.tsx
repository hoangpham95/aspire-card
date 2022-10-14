import {useSelector} from 'react-redux';
import Colors from '../colors';
import Styles from '../styles';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import React from 'react';
import AppText from './Text';
import Strings from '../strings';
import {CurrencyIcon} from './AppIcon';
import {AppState} from '../store';

const styles = StyleSheet.create({
  headerDebitCard: {
    fontWeight: 'bold',
    fontSize: Styles.textSizeHeader,
    color: Colors.TextColorTitle,
  },
  headerAvailableBalanceText: {
    fontSize: Styles.textSizeRegular,
    color: Colors.TextColorTitle,
    marginTop: 24,
  },
  headerBalanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  headerBalance: {
    fontWeight: 'bold',
    color: Colors.TextColorTitle,
    fontSize: Styles.textSizeHeader,
  },
});

type BalanceHeaderProps = {
  onLayoutHeaderHeight: (height: number) => void;
};

export default function BalanceHeader(props: BalanceHeaderProps) {
  const accountState = useSelector(
    (appState: AppState) => appState.accountState,
  );
  const {account} = accountState;

  const onLayout = (event: LayoutChangeEvent) => {
    props.onLayoutHeaderHeight(event.nativeEvent.layout.height);
  };

  return (
    <View style={{padding: 24}} onLayout={onLayout}>
      <AppText style={styles.headerDebitCard}>{Strings.DebitCard}</AppText>
      <AppText style={styles.headerAvailableBalanceText}>
        {Strings.Balance}
      </AppText>
      <View style={styles.headerBalanceContainer}>
        <CurrencyIcon />
        <AppText style={styles.headerBalance}>{account?.balance}</AppText>
      </View>
    </View>
  );
}
