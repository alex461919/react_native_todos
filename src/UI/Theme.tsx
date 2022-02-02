import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, DarkTheme, DefaultTheme, Switch, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface _AppThemeContext {
  theme: typeof DefaultTheme;
  code: 'light' | 'dark';
  name: string;
  setTheme: (arg: 'light' | 'dark') => void;
  isReady: boolean;
}
const fonts = {
  thin: {
    fontFamily: 'Roboto-Thin',
    fontWeight: 'normal',
  },
  light: {
    fontFamily: 'Roboto-Light',
    fontWeight: 'normal',
  },
  regular: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'Roboto-Medium',
    fontWeight: 'normal',
  },
};
const customThemes: { [key in 'light' | 'dark']: any } = {
  light: {
    theme: {
      ...DefaultTheme,
      colors: { ...DefaultTheme.colors, accent: Colors.greenA700, primary: Colors.deepPurpleA700 },
      space: {},
      fonts,
    },
    code: 'light',
    name: 'Светлая',
  },
  dark: {
    theme: {
      ...DarkTheme,
      colors: { ...DarkTheme.colors, accent: Colors.greenA400 },
      space: {},
      fonts,
    },
    code: 'dark',
    name: 'Темная',
  },
};
const Context = React.createContext<_AppThemeContext>({
  ...customThemes.light,
  setTheme: () => {},
  isReady: false,
});
Context.displayName = 'AppThemeContext';

export const AppThemeProvider: React.FC<{}> = ({ children }) => {
  const [appTheme, setAppTheme] = useState(customThemes.light);
  const [isReady, setReady] = useState(false);
  const _setAppTheme = (code: 'light' | 'dark') => {
    setAppTheme(customThemes[code]);
  };
  useEffect(() => {
    (async () => {
      try {
        const val = await AsyncStorage.getItem('theme');
        setAppTheme(customThemes[val === 'dark' ? 'dark' : 'light']);
        setTimeout(() => setReady(true), 300);
      } catch (e) {
        // error reading value
      }
    })();
  }, []);
  console.log(customThemes);
  return <Context.Provider value={{ ...appTheme, setTheme: _setAppTheme, isReady }}>{children}</Context.Provider>;
};
export const AppThemeConsumer = Context.Consumer;

export const useAppTheme = () => useContext(Context);

export const ThemeSetting = () => {
  const { theme, setTheme } = useAppTheme();
  const onToggleSwitch = (props: boolean) => {
    const newThemeCode = props ? 'dark' : 'light';

    setTheme(newThemeCode);
    (async (val: string) => {
      try {
        await AsyncStorage.setItem('theme', val);
      } catch (e) {
        // saving error
      }
    })(newThemeCode);
  };
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: 8,
    },
    icon: {
      color: theme.dark ? Colors.grey700 : Colors.yellow700,
      marginRight: 16,
    },
    switch: {
      marginLeft: 'auto',
    },
  });

  return (
    <View style={styles.container}>
      <Icon style={styles.icon} name="lightbulb-on-outline" size={24} />
      <Text>Тема</Text>
      <Switch style={styles.switch} value={theme.dark} onValueChange={onToggleSwitch} />
    </View>
  );
};
