export class CurrentUserInfo {
  private _id: Number;
  private _role: String;
  private _username: String;
  private _fullName: String;

  get id(): Number {
    return this._id;
  }

  set id(value: Number) {
    this._id = value;
  }

  get role(): String {
    return this._role;
  }

  set role(value: String) {
    this._role = value;
  }

  get username(): String {
    return this._username;
  }

  set username(value: String) {
    this._username = value;
  }

  get fullName(): String {
    return this._fullName;
  }

  set fullName(value: String) {
    this._fullName = value;
  }
}
