export default class UserInfo {
  constructor(name, description, avatar) {
    this._nameElement = name;
    this._descripElement = description;
    this._avatarElement = avatar;
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

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
    this._avatarElement.alt = this._nameElement.textContent;
  }
}
