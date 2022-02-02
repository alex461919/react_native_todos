import React from 'react';
import { Keyboard, Platform, ScrollView, StyleSheet } from 'react-native';
import { Button, Chip, Colors, TextInput, useTheme } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Box, Row } from './Layout';

export interface EditTaskProps {
  date: Date;
  topic: string;
}
export const EditForm: React.FC<EditTaskProps & { onSave: (arg0: EditTaskProps) => void }> = ({
  date,
  topic,
  onSave,
}) => {
  const [_topic, setTopic] = React.useState(topic);
  const [datepickerShow, setDatepickerShow] = React.useState(false);
  const [_date, setDate] = React.useState(date);
  const [dateIsSelected, setDateIsSelected] = React.useState(false);
  const { colors } = useTheme();
  const onDateChange = (event: Event, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || _date;
    setDatepickerShow(Platform.OS === 'ios');
    setDate(currentDate);
    setDateIsSelected(true);
  };

  return (
    <Box width="100%">
      <Row my={16}>
        <Chip
          {...(dateIsSelected ? { icon: 'check' } : { icon: 'help' })}
          mode="flat"
          {...(dateIsSelected
            ? { selectedColor: 'white', style: { backgroundColor: Colors.teal800 }, selected: true }
            : null)}
          onPress={() => {
            setDatepickerShow(true);
          }}>
          {_date.toLocaleDateString()}
        </Chip>
      </Row>
      <ScrollView style={styles.scrollView}>
        <TextInput multiline={true} placeholder="Введите текст" value={_topic} onChangeText={setTopic} />
      </ScrollView>
      <Row justifyContent="flex-end" mt={32}>
        <Button
          disabled={!_topic.length}
          mode="outlined"
          color={colors.text}
          uppercase={true}
          onPress={() => {
            Keyboard.dismiss();
            onSave({ date: _date, topic: _topic });
          }}>
          Сохранить
        </Button>
      </Row>

      {datepickerShow && (
        <DateTimePicker value={_date} mode="date" display="calendar" is24Hour={true} onChange={onDateChange} />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 0,
  },
});
