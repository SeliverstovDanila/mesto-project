export class UserInfo {
    constructor({ profileName, profileAbout, profileAvatar }) { // Есть другой способ сделать конструктор(искать элементы напрямую в конструкторе)
        this._title = document.querySelector(profileName);
        this._about = document.querySelector(profileAbout);
        this._avatar = document.querySelector(profileAvatar);
    }

    profileUserInfo() {
        return {
            id: this._id,
            title: this._title.textContent,
            about: this._about.textContent,
            avatar: this._avatar.style.backgroundImage // уточнить
        }
    }

    setUserInfo({ title, about, avatar, _id }) {
        this._title.textContent = title;
        this._about.textContent = about;
        this._avatar.style.backgroundImage = avatar;
        this._id = _id;
    }
}