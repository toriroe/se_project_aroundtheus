export default class UserInfo {
  constructor(name, description) {
    this._nameElement = name;
    this._descripElement = description;
  }

  getUserInfo() {
    const profileObject = {};
    profileObject["profileName"] = this._nameElement.textContent;
    profileObject["description"] = this._descripElement.textContent;
    return profileObject;
  }

  setUserInfo(name, description) {
    this._nameElement.textContent = name;
    this._descripElement.textContent = description;
  }
}
