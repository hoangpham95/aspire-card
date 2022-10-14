import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../colors';
import AppHeader from '../components/AppHeader';
import {CurrencyIcon, SpendingLimitIcon} from '../components/AppIcon';
import Background from '../components/Background';
import AppText from '../components/Text';
import {
  Account,
  updateUserAccount,
} from '../reducers/accountReducer';
import {AppState} from '../store';
import Strings from '../strings';
import Styles from '../styles';

const styles = StyleSheet.create({
  spendingLimitText: {
    fontSize: Styles.textSizeHeader,
    margin: 24,
    fontWeight: 'bold',
    color: Colors.TextColorTitle,
    marginBottom: 40,
  },
  optionsContainer: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    textAlign: 'center',
    marginLeft: 12,
    fontSize: Styles.textSizeRegular,
    fontWeight: '500',
  },
  inputContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    borderBottomColor: Colors.Disabled,
    borderBottomWidth: 1,
  },
  input: {
    fontSize: Styles.textSizeHeader,
    fontWeight: 'bold',
    fontFamily: Styles.defaultFontFamily,
  },
  optionContainer: {
    borderRadius: 4,
    backgroundColor: Colors.Secondary,
    height: 40,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
    marginTop: 30,
  },
  optionsText: {
    fontSize: Styles.textSizeSubtitle,
    fontWeight: '500',
    color: Colors.TextColorTitle,
    opacity: 1,
  },
  bottomButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 56,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  bottomButtonTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    flex: 1,
    backgroundColor: Colors.Secondary,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: Styles.textSizeButton,
    color: Colors.TextColorTitle,
    fontWeight: '500',
  },
});

function BottomButton(props: {onPress: () => void; text: string}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bottomButtonContainer, {bottom: insets.bottom}]}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.bottomButtonTextContainer}>
          <AppText style={styles.buttonText}>{props.text}</AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function LimitOption(props: {option: number; onPress: () => void}) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
    >
      <View style={styles.optionContainer}>
        <AppText style={styles.optionsText}>
          S
          {new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'USD',
            signDisplay: 'never',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          }).format(props.option)}
        </AppText>
      </View>
    </TouchableOpacity>
  )
}

export default function SetLimitScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const accountState = useSelector((state: AppState) => state.accountState);
  const currentLimit = accountState.account?.cardInfo.spendingLimit || 0;
  const [limit, setLimit] = useState(currentLimit);

  const setAccountLimit = () => {
    dispatch(
      updateUserAccount({
        cardInfo: {
          ...accountState.account?.cardInfo,
          spendingLimit: limit,
        },
      } as Partial<Account>),
    );
  };

  const limitOptions = [5000, 10000, 20000];

  return (
    <Background>
      <AppHeader onBackPressed={() => navigation.goBack()} />
      <View style={{marginTop: Styles.headerHeight, flex: 1}}>
        <AppText style={styles.spendingLimitText}>
          {Strings.SpendingLimit}
        </AppText>
        <View style={styles.optionsContainer}>
          <View style={styles.titleContainer}>
            <SpendingLimitIcon size={Styles.iconSize} />
            <AppText style={styles.titleText}>
              {Strings.SpendingLimitExplanation}
            </AppText>
          </View>
          {/* input */}
          <View style={styles.inputContainer}>
            <CurrencyIcon />
            <TextInput
              defaultValue={limit.toString()}
              value={limit.toString()}
              style={styles.input}
            />
          </View>
          <AppText style={{fontSize: Styles.textSizeSubtitle, marginTop: 12}}>
            Weekly means the last 7 days - not the calendar week
          </AppText>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {limitOptions.map((opt, idx) => (
              <LimitOption key={idx.toString()}
                option={opt}
                onPress={() => setLimit(opt)} />
            ))}
          </View>
        </View>
      </View>
      <BottomButton
        text={Strings.Save}
        onPress={() => {
          setAccountLimit();
          navigation.goBack();
        }}
      />
    </Background>
  );
}
