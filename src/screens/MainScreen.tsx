import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../colors';
import {
  CreditTabIcon,
  DebitTabIcon,
  HomeTabIcon,
  PaymentTabIcon,
  ProfileTabIcon,
} from '../components/AppIcon';
import Strings from '../strings';
import EmptyScreen from './Empty';
import DebitTab from './DebitTab';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          switch (route.name) {
            case Strings.Home:
              return <HomeTabIcon color={color} size={size} />;
            case Strings.DebitCard:
              return <DebitTabIcon color={color} size={size} />;
            case Strings.Payment:
              return <PaymentTabIcon color={color} size={size} />;
            case Strings.Credit:
              return <CreditTabIcon color={color} size={size} />;
            case Strings.Profile:
              return <ProfileTabIcon color={color} size={size} />;
            default:
              return <></>;
          }
        },
        tabBarActiveTintColor: Colors.Secondary,
        tabBarInactiveTintColor: Colors.Disabled,
        headerShown: false,
      })}
    >
      <Tab.Screen name={Strings.Home} component={EmptyScreen} />
      <Tab.Screen name={Strings.DebitCard} component={DebitTab} />
      <Tab.Screen name={Strings.Payment} component={EmptyScreen} />
      <Tab.Screen name={Strings.Credit} component={EmptyScreen} />
      <Tab.Screen name={Strings.Profile} component={EmptyScreen} />
    </Tab.Navigator>
  );
}
