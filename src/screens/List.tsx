import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackHeaderProps, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStack';
import ScreenWrapper from '../UI/ScreenWrapper';
import { FAB, useTheme, List, Divider, Menu, Appbar } from 'react-native-paper';
import { useTodoDateRangeSelector } from '../store';
import { DateIntervalEnum, TaskStatusEnum } from '../model';
import { DateRangeList, useDateRange } from './DateRange';
import { MoreAction } from '../UI/MoreAction';
import { useEffect } from 'react';

const ListScreen: React.FC<StackScreenProps<RootStackParamList, 'List'>> = ({ navigation }) => {
  const theme = useTheme();
  const { range } = useDateRange();
  const taskList = useTodoDateRangeSelector(range.interval);
  const statusList = TaskStatusList();
  const listStyles = StyleSheet.create({
    dateTitle: {
      fontSize: 18,
      color: theme.colors.text,
      textAlign: 'center',
      paddingVertical: 8,
    },
  });
  console.log('ListScreen');
  useEffect(() => navigation.setOptions({ header: props => <ListScreenHeader {...props} /> }), [navigation]);

  return (
    <ScreenWrapper>
      <ScrollView style={styles.scrollView}>
        <>
          {taskList.map((day, idxSection) => (
            <List.Section title={day.date} titleStyle={listStyles.dateTitle} key={'section_' + idxSection}>
              {day.tasks.map((task, idxItem) => (
                <View key={'item_' + task.id}>
                  <List.Item
                    title={task.topic}
                    titleNumberOfLines={100}
                    titleStyle={styles.title}
                    description={statusList[task.status].desc}
                    descriptionStyle={styles.taskDesc}
                    style={{
                      ...styles.taskItem,
                      opacity: statusList[task.status].opacity,
                    }}
                    onPress={() => {
                      console.log('Press. id= ', task.id);
                      navigation.navigate('Detail', { id: task.id });
                    }}
                    right={props => (
                      <List.Icon
                        {...props}
                        style={styles.tastIcon}
                        color={statusList[task.status].color}
                        icon={statusList[task.status].icon}
                      />
                    )}
                  />
                  {1 + idxItem < day.tasks.length ? <Divider /> : null}
                </View>
              ))}
            </List.Section>
          ))}
        </>
      </ScrollView>

      <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate('Add')} />
    </ScreenWrapper>
  );
};
interface StatusItem {
  desc: string;
  icon: string;
  color: string;
  opacity: number;
}

export const TaskStatusList = (): { [key in TaskStatusEnum]: StatusItem } => {
  const theme = useTheme();
  return {
    [TaskStatusEnum.Wait]: {
      desc: 'Ждет выполнения',
      icon: 'clock-outline',
      color: theme.colors.primary,
      opacity: 1,
    },
    [TaskStatusEnum.Performed]: {
      desc: 'Выполнена',
      icon: 'check-all',
      color: 'green',
      opacity: 1,
    },
    [TaskStatusEnum.Canceled]: {
      desc: 'Отменена',
      icon: 'cancel',
      color: 'red',
      opacity: 0.4,
    },
  };
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginVertical: 16,
  },
  taskItem: {
    paddingVertical: 4,
  },
  title: {
    fontFamily: 'Roboto-Regular',
  },
  taskDesc: {
    opacity: 0.6,
  },
  tastIcon: {
    transform: [{ scale: 1.3 }],
    marginVertical: 6,
  },
  fab: {
    position: 'absolute',
    margin: 28,
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: 100,
    //padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1.4 }],
  },
});
export const ListScreenHeader: React.FC<StackHeaderProps> = () => {
  const { range } = useDateRange();
  return (
    <Appbar.Header>
      <HeaderMenu />
      <Appbar.Content title={range.name} />
      <MoreAction />
    </Appbar.Header>
  );
};

const HeaderMenu: React.FC<{}> = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { setRange } = useDateRange();
  const onRangeSelect = (id: any) => {
    setRange(DateRangeList[id as DateIntervalEnum]);
    setMenuVisible(false);
  };
  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={<Appbar.Action icon="menu" size={32} color="white" onPress={() => setMenuVisible(true)} />}>
      {Object.entries(DateRangeList).map(item => {
        return <Menu.Item key={item[0]} onPress={() => onRangeSelect(item[0])} title={item[1].name} />;
      })}
    </Menu>
  );
};

export default ListScreen;
