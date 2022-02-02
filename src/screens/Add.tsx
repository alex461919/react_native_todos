import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStack';
import ScreenWrapper from '../UI/ScreenWrapper';
import { add, useAppDispatch } from '../store';
import { EditForm, EditTaskProps } from '../UI/EditForm';
import { Center } from '../UI/Layout';

const AddScreen: React.FC<StackScreenProps<RootStackParamList, 'Add'>> = ({ navigation, route }) => {
  console.log('AddScreen. route', route);
  const dispatch = useAppDispatch();

  const onSave = ({ date, topic }: EditTaskProps) => {
    dispatch(add({ date, topic }));
    navigation.navigate('List');
  };

  return (
    <ScreenWrapper>
      <Center flex={1} p={16}>
        <EditForm date={new Date()} topic="" {...{ onSave }} />
      </Center>
    </ScreenWrapper>
  );
};

export default AddScreen;
