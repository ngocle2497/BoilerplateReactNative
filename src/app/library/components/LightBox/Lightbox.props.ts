export interface LightBoxProps {
    children: any;

    renderHeader?: (onClose?: Function) => React.ReactNode;

    backgroundColor?: string;

    swipeToDismiss?: boolean;

    renderContent?: () => React.ReactNode;
}