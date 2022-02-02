import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Modal, Portal, useTheme, Title } from 'react-native-paper';

export const SimpleModal: React.FC<{
  visible: boolean;
  setVisible: (arg: boolean) => void;
  title?: string;
  footer?: ReactNode;
  body?: ReactNode;
}> = props => {
  const { title, body, footer, visible, setVisible } = props;
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={{ ...styles.container, backgroundColor: theme.colors.background }}>
        <View style={styles.layout}>
          {title && (
            <>
              <View style={styles.header}>
                <Title style={styles.title}>{title}</Title>
              </View>
              <Divider />
            </>
          )}
          {body && <View style={styles.body}>{body}</View>}
          {footer && <View style={styles.footer}>{footer}</View>}
        </View>
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 32,
    // width: '100%'
  },
  layout: {
    borderRadius: 6,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    margin: 8,
  },
  title: {
    fontSize: 18,
  },
  body: {
    justifyContent: 'flex-start',
    paddingVertical: 8,
  },
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 16,
  },
});
