import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Center } from '../../UI/Layout';

export const ErrorBox: React.FC<TextProps> = ({ children, ...props }) => {
  return (
    <Center p={16} flex={1}>
      <ErrorText {...props}>{children}</ErrorText>
    </Center>
  );
};
export const ErrorText: React.FC<TextProps> = ({ children, style, ...props }) => {
  const theme = useTheme();
  const _style = StyleSheet.compose({ color: theme.colors.error }, style);
  return (
    <Text style={_style} {...props}>
      {children}
    </Text>
  );
};
