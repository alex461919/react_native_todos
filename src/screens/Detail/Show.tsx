import React from 'react';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { DetailStackParams } from './BottomTabNavigator';
import ScreenWrapper from '../../UI/ScreenWrapper';
import { Text } from 'react-native-paper';
import { useTodoByIdSelector } from '../../store';
import { TaskStatusList } from '../List';
import { Center } from '../../UI/Layout';
import { ErrorBox } from './Error';

const ShowScreen: React.FC<StackScreenProps<DetailStackParams, 'Show'>> = ({ route }) => {
  console.log('ShowScreen. route', route);
  const task = useTodoByIdSelector(route.params.id);
  const statusList = TaskStatusList();
  const styles = StyleSheet.create({
    topic: { marginVertical: 16, fontFamily: 'Roboto-Medium' },
    status: { ...(task ? { color: statusList[task.status].color } : null) },
  });
  return (
    <ScreenWrapper>
      {task ? (
        <Center flex={1} p={16}>
          <Text style={styles.topic}>{task.topic}</Text>
          <Text>Назначена на {task.date.toLocaleDateString()}</Text>
          <Text>
            <Text style={styles.status}>{statusList[task.status].desc}</Text>
          </Text>
        </Center>
      ) : (
        <ErrorBox>Задача не найдена</ErrorBox>
      )}
    </ScreenWrapper>
  );
};

export default ShowScreen;
