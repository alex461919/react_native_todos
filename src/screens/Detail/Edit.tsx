import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { DetailStackParams } from './BottomTabNavigator';
import ScreenWrapper from '../../UI/ScreenWrapper';
import { save, useAppDispatch, useTodoByIdSelector } from '../../store';
import { EditForm } from '../../UI/EditForm';
import { Task } from '../../model';
import { Center } from '../../UI/Layout';
import { ErrorBox } from './Error';

const EditScreen: React.FC<StackScreenProps<DetailStackParams, 'Edit'>> = ({ route }) => {
  console.log('EditScreen. route', route);
  const {
    params: { id },
  } = route;
  const task = useTodoByIdSelector(id);
  const dispatch = useAppDispatch();
  const onSave = ({ date, topic }: Pick<Task, 'date' | 'topic'>) => {
    console.log('EditScreen. click save');
    dispatch(save({ id, date, topic }));
    // setTimeout(() => navigation.dispatch(CommonActions.navigate({ name: 'Show', merge: true })), 0);
  };

  return (
    <ScreenWrapper>
      {task ? (
        <Center flex={1} p={16}>
          <EditForm {...{ topic: task.topic, date: task.date, onSave }} />
        </Center>
      ) : (
        <ErrorBox>Задача не найдена</ErrorBox>
      )}
    </ScreenWrapper>
  );
};

export default EditScreen;
