import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { DetailStackParams } from './BottomTabNavigator';
import ScreenWrapper from '../../UI/ScreenWrapper';
import { Button, RadioButton, Text, useTheme } from 'react-native-paper';
import { setStatus, useAppDispatch, useTodoByIdSelector } from '../../store';
import { TaskStatusList } from '../List';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Box, Center, Row } from '../../UI/Layout';
import { ErrorBox } from './Error';

const StatusScreen: React.FC<StackScreenProps<DetailStackParams, 'Status'>> = ({ route }) => {
  console.log('StatusScreen. route', route);
  const {
    params: { id },
  } = route;
  const task = useTodoByIdSelector(id);
  const dispatch = useAppDispatch();
  const statusList = TaskStatusList();
  const initStatus = task ? task.status.toString() : '';
  const [toggleIsChange, setToggleIsChange] = React.useState(false);
  const [toggleValue, setToggleValue] = React.useState(initStatus);
  const { colors } = useTheme();
  const onToggleValueChange = (val: string) => {
    setToggleValue(val);
    setToggleIsChange(true);
  };

  const onSave = (status: string) => {
    dispatch(setStatus({ id, status: parseInt(status, 10) }));
    // setTimeout(() => navigation.dispatch(CommonActions.navigate({ name: 'Show', merge: true })), 0);
  };

  return (
    <ScreenWrapper>
      {task ? (
        <Center flex={1} p={16}>
          <Box width="100%" maxWidth={250}>
            <RadioButton.Group onValueChange={onToggleValueChange} value={toggleValue}>
              {Object.entries(statusList).map(item => (
                <Row my={2} key={item[0]}>
                  <Icon color={item[1].color} size={24} name={item[1].icon} />
                  <Box mx={16}>
                    <Text>{item[1].desc}</Text>
                  </Box>
                  <Box ml="auto">
                    <RadioButton value={item[0].toString()} />
                  </Box>
                </Row>
              ))}
            </RadioButton.Group>
            <Row justifyContent="flex-end" mt={32}>
              <Button
                disabled={!toggleIsChange}
                mode="outlined"
                color={colors.text}
                uppercase={true}
                onPress={() => onSave(toggleValue)}>
                Сохранить
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

export default StatusScreen;
