export class UserInfo {
    constructor({profileName, profileAbout, profileAvatar}) {
        this._title = document.querySelector(profileName);
        this._about = document.querySelector(profileAbout);
        this._avatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        return {
            // id: this._id,
            title: this._title.textContent,
            about: this._about.textContent,
            avatar: this._avatar.style.backgroundImage
        }
    }

    setUserInfo(userData) {
        if (userData.name) this._title.textContent = userData.name;
        if (userData.about) this._about.textContent = userData.about;
        this.setUserAvatar(userData)
    }

    setUserAvatar(userData) {
        if (userData.avatar) this._avatar.style.backgroundImage = userData.avatar;
        if (userData.name) this._avatar.style.backgroundImage = userData.name;
    }
}
