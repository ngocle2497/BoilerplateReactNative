import {useDismissKeyboard} from '@common';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import isEqual from 'react-fast-compare';
import {Keyboard} from 'react-native';

import {Portal} from '../Portal';

import {ModalProps} from './Modal.props';
import {ModalContent} from './ModalContent';

const ModalComponent = (props: ModalProps) => {
  // state
  const [visible, setVisible] = useState<boolean>(props.isVisible);
  const modalContent = useRef<ModalContent>(null);

  // function
  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  // effect
  useDismissKeyboard(visible);

  useEffect(() => {
    if (props.isVisible) {
      setVisible(true);
    } else {
      Keyboard.dismiss();
      modalContent.current?.dismiss();
    }
  }, [props.isVisible]);

  // render
  return (
    <Portal hostName={'AppModal'}>
      {visible ? (
        <ModalContent onSetClose={closeModal} ref={modalContent} {...props} />
      ) : null}
    </Portal>
  );
};

export const Modal = memo(ModalComponent, isEqual);
