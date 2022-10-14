import React from 'react';
import {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../colors';
import {AppState} from '../store';
import Strings from '../strings';
import Styles from '../styles';
import {CompanyCardIcon, HideCardIcon, ShowCardIcon, VisaIcon} from './AppIcon';
import AppText from './Text';

const styles = StyleSheet.create({
  cardContainer: {
    alignSelf: 'center',
    zIndex: 1,
  },
  hideCardContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    width: 160,
    height: 60,
    marginBottom: -25,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  hideCardInnerContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  debitCardContainer: {
    width: 360,
    height: 240,
    backgroundColor: Colors.Secondary,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'column',
  },
  userName: {
    fontSize: Styles.textSizeHeader,
    fontWeight: 'bold',
    color: Colors.TextColorTitle,
    marginTop: 24,
  },
  cardNumberText: {
    marginLeft: -6,
    fontSize: Styles.textSizeRegular,
    letterSpacing: 6,
    marginTop: 20,
    color: Colors.TextColorTitle,
  },
  expirationContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 140,
  },
  expirationText: {
    color: Colors.TextColorTitle,
    fontWeight: '500',
  },
  visaIconContainer: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

export default function DebitCard() {
  const {account} = useSelector((state: AppState) => state.accountState);
  const [cardHidden, setCardHidden] = useState(false);

  const displayCardNumber = () => {
    const cardNumber = account!.cardInfo.accountNumber;
    let displayedNumber = '';

    for (let i = 0; i < cardNumber.length; i++) {
      if (i % 4 == 0) displayedNumber += ' ';
      displayedNumber +=
        cardHidden && i < cardNumber.length - 4 ? '•' : cardNumber[i];
    }

    return displayedNumber;
  };

  if (!account) return <></>;

  return (
    <View style={styles.cardContainer}>
      {/*Hide card button*/}
      <View style={styles.hideCardContainer}>
        <TouchableOpacity onPress={() => setCardHidden(!cardHidden)}>
          <View style={styles.hideCardInnerContainer}>
            {cardHidden ? (
              <HideCardIcon style={{alignSelf: 'center'}} />
            ) : (
              <ShowCardIcon style={{alignSelf: 'center'}} />
            )}
            <AppText>
              {cardHidden ? Strings.ShowCard : Strings.HideCard}
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
      {/*Debit card*/}
      <View style={styles.debitCardContainer}>
        <View style={{alignSelf: 'flex-end'}}>
          <CompanyCardIcon />
        </View>
        <AppText style={styles.userName}>
          {account?.firstName} {account?.lastName}
        </AppText>
        <AppText style={styles.cardNumberText}>{displayCardNumber()}</AppText>
        <View style={styles.expirationContainer}>
          <AppText style={styles.expirationText}>
            Thru: {account?.cardInfo.expirationDate}
          </AppText>
          <AppText style={styles.expirationText}>
            CVV: {cardHidden ? '***' : account?.cardInfo.cvv}
          </AppText>
        </View>
        <View style={styles.visaIconContainer}>
          <VisaIcon />
        </View>
      </View>
    </View>
  );
}
