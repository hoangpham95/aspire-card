import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ColorValue,
  ImageStyle,
  View,
  StyleSheet,
} from 'react-native';
import Colors from '../colors';
import Strings from '../strings';
import Styles from '../styles';
import AppText from './Text';

type IconProp = {
  color?: ColorValue;
  size?: number;
  style?: ImageStyle;
};

type IconPropWithSource = IconProp & {
  source: ImageSourcePropType;
};

const styles = StyleSheet.create({
  currencyContainer: {
    width: 40,
    height: 22,
    backgroundColor: Colors.Secondary,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  currencyText: {
    fontWeight: 'bold',
    color: Colors.TextColorTitle,
  },
  visaIcon: {
    width: 60,
    height: 20,
  },
  companyIcon: {
    height: 20,
    width: 75,
  },
});

export default function AppIcon(props: IconPropWithSource) {
  return (
    <Image
      source={props.source}
      style={{
        width: props.size,
        height: props.size,
        tintColor: props.color,
        resizeMode: 'center',
        ...props.style,
      }}
    />
  );
}

export const HomeTabIcon = (props: IconProp) => (
  <AppIcon {...props} source={require('../../assets/app/Logo.png')} />
);

export const DebitTabIcon = (props: IconProp) => (
  <AppIcon {...props} source={require('../../assets/app/Card.png')} />
);

export const PaymentTabIcon = (props: IconProp) => (
  <AppIcon {...props} source={require('../../assets/app/Payments.png')} />
);

export const CreditTabIcon = (props: IconProp) => (
  <AppIcon {...props} source={require('../../assets/app/Credit.png')} />
);

export const ProfileTabIcon = (props: IconProp) => (
  <AppIcon {...props} source={require('../../assets/app/Account.png')} />
);

export const BackIcon = (props: IconProp) => (
  <AppIcon
    {...props}
    source={require('../../assets/app/chevron.png')}
    size={Styles.iconListSize}
    color={Colors.Background}
  />
);

export const DepositIcon = (props: IconProp) => (
  <AppIcon
    {...props}
    size={Styles.iconListSize}
    source={require('../../assets/app/insight.png')}
  />
);

export const SpendingLimitIcon = (props: IconProp) => (
  <AppIcon
    {...props}
    size={Styles.iconListSize}
    source={require('../../assets/app/Limit.png')}
  />
);

export const FreezeAccIcon = (props: IconProp) => (
  <AppIcon
    {...props}
    size={Styles.iconListSize}
    source={require('../../assets/app/Limit.png')}
  />
);

export const GetNewCardIcon = (props: IconProp) => (
  <AppIcon
    {...props}
    size={Styles.iconListSize}
    source={require('../../assets/app/Freeze.png')}
  />
);

export const DeactivateCardIcon = (props: IconProp) => (
  <AppIcon
    {...props}
    size={Styles.iconListSize}
    source={require('../../assets/app/Deactivate.png')}
  />
);

export const LogoIcon = (props: IconProp) => (
  <AppIcon
    {...props}
    color={Colors.Secondary}
    size={Styles.iconSize}
    source={require('../../assets/app/Logo.png')}
  />
);

export const VisaIcon = (props: IconProp) => (
  <AppIcon
    {...props}
    color={Colors.Background}
    source={require('../../assets/app/VisaLogo.png')}
    style={styles.visaIcon}
  />
);

export const CurrencyIcon = () => (
  <View style={styles.currencyContainer}>
    <AppText style={styles.currencyText}>{Strings.SGD}</AppText>
  </View>
);

export const HideCardIcon = (props: IconProp) => (
  <AppIcon
    {...props}
    color={Colors.Secondary}
    source={require('../../assets/app/hide.png')}
    size={Styles.iconSize}
  />
);

export const ShowCardIcon = (props: IconProp) => (
  <AppIcon
    {...props}
    color={Colors.Secondary}
    source={require('../../assets/app/Eye.png')}
    size={Styles.iconSize}
  />
);

export const CompanyCardIcon = (props: IconProp) => (
  <AppIcon
    {...props}
    color={'white'}
    style={styles.companyIcon}
    source={require('../../assets/app/AspireLogo.png')}
  />
);
