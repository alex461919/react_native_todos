import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ShowScreen from './Show';
import StatusScreen from './Status';
import EditScreen from './Edit';
import DeleteScreen from './Delete';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Color from 'color';
import { RootStackParamList } from '../../RootStack';
import { CommonActions } from '@react-navigation/native';

export type DetailStackParams = {
  Show: { id: string };
  Edit: { id: string };
  Status: { id: string };
  Delete: { id: string };
};

const Tab = createMaterialBottomTabNavigator<DetailStackParams>();

export const DetailScreen: React.FC<StackScreenProps<RootStackParamList, 'Detail'>> = ({ route }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <Tab.Navigator
      initialRouteName="Show"
      activeColor={theme.colors.primary}
      inactiveColor={Color(theme.colors.text).alpha(0.5).rgb().string()}
      barStyle={styles.tabBar}
      shifting={false}
      screenListeners={({ navigation }) => ({
        tabPress: e => {
          setTimeout(() => {
            e.target &&
              navigation.dispatch(
                CommonActions.navigate({
                  key: e.target,
                  merge: true,
                }),
              );
          }, 0);
          e.target && e.preventDefault();
        },
      })}>
      <Tab.Screen
        name="Show"
        component={ShowScreen}
        initialParams={route.params}
        options={{
          tabBarLabel: 'Просмотр',
          tabBarIcon: ({ color }) => <Icon name="info" {...{ color }} size={24} />,
        }}
      />
      <Tab.Screen
        name="Edit"
        component={EditScreen}
        initialParams={route.params}
        options={{
          tabBarLabel: 'Изменить',
          tabBarIcon: ({ color }) => <Icon name="edit" {...{ color }} size={24} />,
        }}
      />
      <Tab.Screen
        name="Status"
        component={StatusScreen}
        initialParams={route.params}
        options={{
          tabBarLabel: 'Состояние',
          tabBarIcon: ({ color }) => <Icon name="playlist-add-check" {...{ color }} size={24} />,
        }}
      />
      <Tab.Screen
        name="Delete"
        component={DeleteScreen}
        initialParams={route.params}
        options={{
          tabBarLabel: 'Удалить',
          tabBarIcon: ({ color }) => <Icon name="delete-forever" {...{ color }} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};
