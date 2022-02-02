import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackHeaderProps, TransitionPresets } from '@react-navigation/stack';
import { Keyboard } from 'react-native';
import ListScreen from './screens/List';
import AddScreen from './screens/Add';
import { DetailScreen } from './screens/Detail/BottomTabNavigator';
import { Appbar } from 'react-native-paper';
import { MoreAction } from './UI/MoreAction';

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  List: undefined;
  Detail: { id: string };
  Add: undefined;
};

const RootStack = () => {
  //
  console.log('RootStack. ');
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="List"
        screenOptions={{
          headerMode: 'float',
          ...TransitionPresets.SlideFromRightIOS,
        }}
        screenListeners={{
          state: () => Keyboard.dismiss(),
        }}>
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{
            header: props => <DefaultHeader {...props} />,
            title: 'Новая задача',
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            header: props => <DefaultHeader {...props} />,
            title: 'Подробно',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const DefaultHeader: React.FC<StackHeaderProps> = props => {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => props.navigation.goBack()} />
      <Appbar.Content title={props.options.title} />
      <MoreAction />
    </Appbar.Header>
  );
};

export default RootStack;
