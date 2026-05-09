import React from 'react';
import { useFonts, Oswald_400Regular, Oswald_500Medium } from '@expo-google-fonts/oswald';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './mobile/src/navigation/AppNavigator';
import { colors } from './mobile/src/utils/theme';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Oswald: Oswald_400Regular,
    Oswald_500Medium,
    Inter: Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.dark }}>
        <ActivityIndicator color={colors.green} size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}
