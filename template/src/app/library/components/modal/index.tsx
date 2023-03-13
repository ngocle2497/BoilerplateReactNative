import React, { useEffect, useRef, useState } from 'react';

import { Portal } from '@gorhom/portal';
import { useDismissKeyboard } from '@hooks';

import { ModalContent } from './modal-content';
import { ModalProps } from './type';

export const Modal = (props: ModalProps) => {
  // state
  const [visible, setVisible] = useState<boolean>(props.isVisible);

  const modalContent = useRef<ModalContent>(null);

  // function
  const closeModal = () => {
    setVisible(false);
  };

  // effect
  useDismissKeyboard(visible);

  useEffect(() => {
    if (props.isVisible) {
      setVisible(true);
    } else {
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
