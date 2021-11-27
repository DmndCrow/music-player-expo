import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';

import useCachedResources from './src/utils/hooks/useCachedResources';
import useColorScheme from './src/utils/hooks/useColorScheme';
import Navigation from './src/navigation';
import { configureStore } from './src/store';

const store = configureStore();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <StoreProvider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </StoreProvider>
    );
  }
}
