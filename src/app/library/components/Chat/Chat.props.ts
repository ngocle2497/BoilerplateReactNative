import React from 'react';
export type MessageType = 'text' | 'image';
export type SourceMessage = 'mine' | 'friend';

export interface TextMessageProps {
  /**
   * String message to display
   * @default undefined
   */
  text?: string;
}

export interface ImageMessageProps {
  /**
   * Source image for image message type
   * @default undefined
   */
  sourceImage?: string;
}

export interface MessageProps extends TextMessageProps, ImageMessageProps {
  /**
   * Unique key
   */
  id: string | number;

  /**
   * Type of message
   */
  type: MessageType;

  /**
   * Your message or your friend
   */
  sourceMessage: SourceMessage;

  /**
   * Sent date message
   * @default undefined
   */
  dateCreate?: string;

  /**
   * Seen date message
   * @default undefined
   */
  dateSeen?: string;
}

export interface ChatProps {
  /**
   * Data of chat
   */
  data: Array<MessageProps>;

  /**
   * Current status of user
   * @default true
   */
  status?: boolean;

  /**
   * Status text
   * @default Active
   */
  textStatus?: string;

  /**
   * Color of dot when user active
   * @default #5cb85c
   */
  colorDotActive?: string;

  /**
   * Color of dot when user un active
   * @default #99aab5
   */
  colorDotUnActive?: string;

  /**
   * Show date sent or not
   * @default false
   */
  showDateSent?: boolean;

  /**
   * Show date seen or not
   * @default false
   */
  showDateSeen?: boolean;

  /**
   * Your source avatar
   */
  yourAvatar?: string;

  /**
   * Show avatar your friend or not
   * @default true
   */
  showAvatar?: boolean;

  /**
   * Avatar of your friend
   */
  friendAvatar: string;

  /**
   * Name of your friend
   */
  nameFriend: string;

  /**
   * Render default header or not
   * @default true
   */
  useHeader?: boolean;

  /**
   * Function of button send press
   * @default undefined
   */
  onSendPress?: (val: string) => void;

  /**
   * On icon back press
   * @default undefined
   */
  onBackPress?: () => void;

  /**
   * Overwrite header chat
   * @default undefined
   */
  renderHeader?: () => React.ReactNode;

  /**
   * Overwrite footer chat
   * @default undefined
   */
  renderFooter?: () => React.ReactElement;
}

export interface BubbleProps {
  children?: React.ReactNode;
}
