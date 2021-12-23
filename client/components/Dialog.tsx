import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export interface OverlayProps {
  title: string;
  content: string | JSX.Element;
  isConfirmation?: boolean;
  mainButtonText?: string;
  secondaryBtnText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  closeOverlay?: () => void;
  result?: (r: boolean) => void;
}

export const DialogComponent = 'DialogComponent';
export default function Dialog(props: OverlayProps) {
  let {
    title,
    content,
    isConfirmation = false,
    mainButtonText,
    secondaryBtnText,
    result,
    onConfirm,
    onCancel,
    closeOverlay,
  } = props;

  if (!mainButtonText) {
    mainButtonText = isConfirmation ? 'Confirm' : 'OK';
  }

  if (!secondaryBtnText && isConfirmation) {
    secondaryBtnText = 'Cancel';
  }

  const cancel = () => {
    onCancel && onCancel();
    result && result(false);
    closeOverlay && closeOverlay();
  };

  const confirm = () => {
    onConfirm && onConfirm();
    result && result(true);
    closeOverlay && closeOverlay();
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {typeof content === 'string' ? (
          <Text style={styles.textLang}>{content}</Text>
        ) : (
          content
        )}

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={confirm}>
            <Text style={styles.textStyle}>{mainButtonText}</Text>
          </TouchableOpacity>
          {isConfirmation && (
            <TouchableOpacity style={styles.button} onPress={cancel}>
              <Text style={styles.textStyle}>{secondaryBtnText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: '@backgroundColor',
    borderRadius: 20,
    shadowColor: '@invitationShadowColor',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleView: {
    backgroundColor: '@mainColor',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  title: {
    padding: 20,
    color: '@invitationTextColor',
    fontWeight: 'bold',
  },
  buttonView: {
    flexDirection: 'row',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'space-around',
    marginTop: 10,
    backgroundColor: '@mainColor',
  },
  button: {
    margin: 25,
  },

  textStyle: {
    color: '@invitationTextColor',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textLang: {
    fontWeight: 'bold',
    margin: 25,
  },
});
