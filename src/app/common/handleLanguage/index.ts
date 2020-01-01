import I18n from '../../library/utils/i18n';
import {VI_VN, EN_US} from '../../config/languageType';
export const HandleLanguage = type => {
  switch (type) {
    case VI_VN:
      return I18n.t('more:selectLanguage:lbVietnamese');
    case EN_US:
      return I18n.t('more:selectLanguage:lbEnglish');
    default:
      return I18n.t('more:selectLanguage:lbVietnamese');
  }
};
