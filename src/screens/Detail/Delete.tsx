import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { DetailStackParams } from './BottomTabNavigator';
import ScreenWrapper from '../../UI/ScreenWrapper';
import { Button, useTheme } from 'react-native-paper';
import { remove, store, useAppDispatch } from '../../store';
import { Box, Center, Row } from '../../UI/Layout';
import { ErrorBox, ErrorText } from './Error';

const DeleteScreen: React.FC<StackScreenProps<DetailStackParams, 'Delete'>> = ({ navigation, route }) => {
  console.log('DeleteScreen. route', route);
  const {
    params: { id },
  } = route;

  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const onConfirm = () => {
    dispatch(remove({ id }));
    navigation.getParent()?.navigate('List');
  };
  const [task] = React.useState(store.getState().todo.find(item => item.id === id));

  return (
    <ScreenWrapper>
      {task ? (
        <Center flex={1} p={16}>
          <Box>
            <ErrorText>Удалить задачу насовсем?</ErrorText>
            <Row justifyContent="flex-end" mt={32}>
              <Button mode="outlined" color={colors.text} uppercase={true} onPress={onConfirm}>
                Да
              </Button>
            </Row>
          </Box>
        </Center>
      ) : (
        <ErrorBox>Задача не найдена</ErrorBox>
      )}
    </ScreenWrapper>
  );
};

export default DeleteScreen;
