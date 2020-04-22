export interface RadioButtonProps{
    value:boolean;

    onPress:()=>void;

    activeColor?:string;

    unActiveColor?:string;

    sizeDot?:number;

    strokeWidth?:number;
}