import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/store';
import { DateRangeProvider } from './src/screens/DateRange';
import { StyleSheet } from 'react-native';
import { AppThemeConsumer, AppThemeProvider } from './src/UI/Theme';

import RootStack from './src/RootStack';

const App = () => {
  //
  return (
    <StoreProvider store={store}>
      <DateRangeProvider>
        <AppThemeProvider>
          <AppThemeConsumer>
            {contextTheme => (
              <>
                {contextTheme.isReady ? (
                  <PaperProvider theme={contextTheme.theme}>
                    <SafeAreaProvider>
                      <RootStack />
                    </SafeAreaProvider>
                  </PaperProvider>
                ) : (
                  <ActivityIndicator size={128} style={styles.flex_1} />
                )}
              </>
            )}
          </AppThemeConsumer>
        </AppThemeProvider>
      </DateRangeProvider>
    </StoreProvider>
  );
};
const styles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
});

export default App;
