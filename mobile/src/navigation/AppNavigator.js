import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, fonts } from '../utils/theme';

import HomeScreen from '../screens/HomeScreen';
import LocationsScreen from '../screens/LocationsScreen';
import GroupsScreen from '../screens/GroupsScreen';
import DirectoryScreen from '../screens/DirectoryScreen';
import MessageBoardScreen from '../screens/MessageBoardScreen';
import EventsScreen from '../screens/EventsScreen';
import JobsScreen from '../screens/JobsScreen';
import MeetUpsScreen from '../screens/MeetUpsScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabIcons = {
  Home: 'home',
  Locations: 'location-on',
  Groups: 'group',
  Directory: 'local-hospital',
  Board: 'forum',
  Events: 'event',
  Jobs: 'work',
  'Meet Ups': 'handshake',
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name={tabIcons[route.name] || 'circle'} size={size} color={color} />
        ),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.lightGray,
        tabBarStyle: {
          backgroundColor: colors.dark,
          borderTopColor: '#2a2a2a',
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.heading,
          fontSize: 10,
          letterSpacing: 0.5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Locations" component={LocationsScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name="Directory" component={DirectoryScreen} />
      <Tab.Screen name="Board" component={MessageBoardScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Jobs" component={JobsScreen} />
      <Tab.Screen name="Meet Ups" component={MeetUpsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
