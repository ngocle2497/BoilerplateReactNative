export interface LightBoxProps {
    /**
     * Children of light box
     */
    children: any;

    /**
     * Header when light open
     */
    renderHeader?: (onClose?: Function) => React.ReactNode;

    /**
     * Background color when light box open
     * @default black
     */
    backgroundColor?: string;

    /**
     * Enable swipe to dismiss
     * @default true
     */
    swipeToDismiss?: boolean;

    /**
     * Over write content 
     * @default undefined
     */
    renderContent?: () => React.ReactNode;
}