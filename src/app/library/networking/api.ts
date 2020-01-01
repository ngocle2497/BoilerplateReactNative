export const BASE_API = __DEV__
  ? 'http://demo-food.sky-demo.net'
  : 'http://demo-food.sky-demo.net';
export const Login_APIs = '/api/app/login';
export const Register_APIs = '/api/app/sign_up';
export const Send_OTP_APIs = '/api/app/send_otp';
export const Log_Out_APIs = '/api/app/log_out';
// menu --> start
export const SELECT_FOOD = '/api/app/search_food_in_restaurant';
export const CREATE_CATEGORY_MENU = '/api/app/add_category';
export const CREATE_MENU = '/api/app/create_menu';
export const GET_CATEGORY_MENU = '/api/app/get_list_category';
export const GET_TAB_MENU = '/api/app/restaurant/get_list_menu';
export const GET_DETAIL_MENU = '/api/app/restaurant/get_detail_menu';
export const GET_ALL_FOOD_MENU = '/api/app/get_list_food_of_restaurant';
// menu <--- end

// dashboard --> start
export const GET_DATA_DASH_BOARD = '/api/app/restaurant/get_list_order';
// dashboard <--- end
