export interface RadioButtonProps{

    /**
     * Current state of radio button
     */
    value:boolean;

    /**
     * On radio button press
     */
    onPress:()=>void;

    /**
     * Color when value equal true
     * @default #ff00a9
     */
    activeColor?:string;

    /**
     * Color when value equal false
     * @default #999999
     */
    unActiveColor?:string;

    /**
     * Size of radio button
     * @default 30
     */
    sizeDot?:number;

    /**
     * Stroke width of radio button
     * @default 3
     */
    strokeWidth?:number;
}