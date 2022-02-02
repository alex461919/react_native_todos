import React from 'react';
import { Platform } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { SimpleModal } from './SimpleModal';
import { ThemeSetting } from './Theme';

export const MoreAction: React.FC<{}> = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <Appbar.Action
        icon={Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'}
        size={32}
        color="white"
        onPress={() => setModalVisible(true)}
      />
      <SimpleModal
        visible={modalVisible}
        setVisible={setModalVisible}
        title="Дополнительно"
        body={<ThemeSetting />}
        footer={
          <Button mode="outlined" onPress={() => setModalVisible(false)}>
            OK
          </Button>
        }
      />
    </>
  );
};
