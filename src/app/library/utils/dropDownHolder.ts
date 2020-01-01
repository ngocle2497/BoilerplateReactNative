export default class DropDownHolder {
  static dropDown;

  static setDropDown(dropDown) {
    this.dropDown = dropDown;
  }
  static alert(type, title, message, callBack = null) {
    this.dropDown.alertWithType(type, title, message);
    callBack && callBack();
  }
  static showError(title, message, callBack = null) {
    this.dropDown.alertWithType('error', title, message);
    callBack && callBack();
  }
  static showSuccess(title, message, callBack = null) {
    this.dropDown.alertWithType('success', title, message);
    callBack && callBack();
  }
  static showWarning(title, message, callBack = null) {
    this.dropDown.alertWithType('warn', title, message);
    callBack && callBack();
  }
  static showInfo(title, message, callBack = null) {
    this.dropDown.alertWithType('info', title, message);
    callBack && callBack();
  }
}
