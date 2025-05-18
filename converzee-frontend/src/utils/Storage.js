export class Storage {
  static put(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  static remove(key) {
    localStorage.removeItem(key);
  }
  static removeAll() {
    localStorage.clear();
  }
  static getOneItem(key) {
    return localStorage.getItem(key);
  }
}
