import {profileElement} from '../components/utils.js'

export class UserInfo {
    constructor() { // Есть другой способ сделать конструктор(искать элементы напрямую в конструкторе)
        this._title = document.querySelector(profileElement.profileName);
        this._about = document.querySelector(profileElement.profileAbout);
        this._avatar = document.querySelector(profileElement.profileAvatar);
    }

    profileUserInfo() {
        return {
            id: this._id,
            title: this._title.textContent,
            about: this._about.textContent,
            avatar: this._avatar.style.backgroundImage // уточнить
        }
    }

    // setUserInfo({ title, about, avatar, _id }) {
    //     this._title.textContent = title;
    //     this._about.textContent = about;
    //     this._avatar.style.backgroundImage = avatar;
    //     this._id = _id;
    // }

    setUserInfo(userData) {
        this._title.textContent = userData.name;
        this._about.textContent = userData.about;
        this._avatar.style.backgroundImage = `url("${userData.avatar}")`;
    }
}