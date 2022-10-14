import React from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Animated, StyleSheet, View} from 'react-native';
import {useRef} from 'react';
import {
  DeactivateCardIcon,
  DepositIcon,
  FreezeAccIcon,
  GetNewCardIcon,
  SpendingLimitIcon,
} from './AppIcon';
import {useDispatch, useSelector} from 'react-redux';
import {AccountState, setAccountState} from '../reducers/accountReducer';
import {useNavigation} from '@react-navigation/native';
import Strings from '../strings';
import DebitCard from './DebitCard';
import CardOption, {Option} from './CardOption';
import {AppState} from '../store';

type CardDetailsProps = {
  headerOffset: number;
};

const styles = StyleSheet.create({
  screenContainer: {
    ...(StyleSheet.absoluteFill as any),
    zIndex: 1,
    backgroundColor: 'transparent',
    flex: 1,
  },
  emptyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  cardDetailContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  optionsContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 150,
    top: -150,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});

export default function CardDetails(props: CardDetailsProps) {
  const accountState = useSelector(
    (state: AppState) => state.accountState as AccountState,
  );
  const {account} = accountState;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const insets = useSafeAreaInsets();
  const offset = useRef(new Animated.Value(0)).current;
  const headerHeight = offset.interpolate({
    inputRange: [0, props.headerOffset + insets.top],
    outputRange: [props.headerOffset + insets.top, 0],
    extrapolate: 'clamp',
  });

  const freezeCard = () => {
    dispatch(
      setAccountState({
        ...accountState,
        account: {
          ...account!,
          cardInfo: {
            ...account!.cardInfo,
            cardFrozen: !account?.cardInfo.cardFrozen,
          },
        },
      }),
    );
  };

  const toggleSpendingLimit = () => {
    if (account?.cardInfo.spendingLimit === 0) {
      navigation.navigate(Strings.SetLimit as never);
    } else {
      dispatch(
        setAccountState({
          ...accountState,
          account: {
            ...account!,
            cardInfo: {
              ...account!.cardInfo,
              spendingLimit: 0,
            },
          },
        }),
      );
    }
  };

  const options: Array<Option> = [
    {
      title: Strings.DepositTitle,
      detail: Strings.DepositSubtitle,
      hasToggle: false,
      icon: <DepositIcon />,
    },
    {
      title: Strings.SpendingLimitTitle,
      detail: Strings.SpendingLimitSubtitle,
      hasToggle: true,
      toggleValue: account?.cardInfo.spendingLimit === 0 ? false : true,
      onToggle: toggleSpendingLimit,
      icon: <SpendingLimitIcon />,
    },
    {
      title: Strings.FreezeCardTitle,
      detail: Strings.FreezeCardSubtitle,
      hasToggle: true,
      toggleValue: account?.cardInfo.cardFrozen,
      icon: <FreezeAccIcon />,
      onToggle: freezeCard,
    },
    {
      title: Strings.FreezeCardTitle,
      detail: Strings.FreezeCardSubtitle,
      hasToggle: false,
      icon: <GetNewCardIcon />,
    },
    {
      title: Strings.DeactivateCardTitle,
      detail: Strings.DeactivateCardSubtitle,
      hasToggle: false,
      icon: <DeactivateCardIcon />,
    },
  ];

  return (
    <SafeAreaView
      edges={['right', 'left', 'top']}
      style={styles.screenContainer}
    >
      <Animated.View
        pointerEvents={'none'}
        style={[styles.emptyHeader, {height: headerHeight}]}
      />
      <Animated.ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={[styles.scrollView, {paddingTop: props.headerOffset}]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: offset},
              },
            },
          ],
          {useNativeDriver: false},
        )}
      >
        <View style={styles.cardDetailContainer}>
          <DebitCard />
          <View style={styles.optionsContainer}>
            {options.map((opt, idx) => (
              <CardOption option={opt} key={idx.toString()} />
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}
