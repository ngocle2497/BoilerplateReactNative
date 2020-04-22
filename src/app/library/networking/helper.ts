import { ResponseBase } from './../../config/type';
import { AxiosError } from "axios";
import { translate, showError, remove } from '../utils';
import { navigateToLogin } from '../../navigation';
import { R } from '../../assets/value';
import { RESULT_CODE_PUSH_OUT, ERROR_NETWORK_CODE } from '../../config';
import { HandleErrorApi } from '../../common';
const responseDefault: ResponseBase<any> = {
    code: -500,
    status: false,
    msg: translate('error:errorData'),
    data: {},
};
const _onPushLogout = async () => {
    await remove(R.strings.TOKEN);
    showError(
        translate('dialog:lbTitleError'),
        translate('error:pushLogout'),
    );
    navigateToLogin();
};
export const handleResponseAxios = (res: any, header?: any): ResponseBase<any> | void => {
    if (res.data.code === RESULT_CODE_PUSH_OUT && header.token) {
        _onPushLogout();
    } else {
        if (res.data) {
            return res.data;
        }
        return responseDefault;
    }
}
export const handleErrorAxios = (error: AxiosError): ResponseBase<any> => {
    if(error){
        if (error.code === 'ECONNABORTED') { // timeout
            return HandleErrorApi(0)
        }
        if (error.response) {
            return HandleErrorApi(error.response.status);
        } else {
            return HandleErrorApi(ERROR_NETWORK_CODE);
        }
    }else{
         return HandleErrorApi(ERROR_NETWORK_CODE);
    }

}