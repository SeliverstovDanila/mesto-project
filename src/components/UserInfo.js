export class UserInfo {
    constructor({ profileName, profileAbout, profileAvatar }) {
        this._title = document.querySelector(profileName);
        this._about = document.querySelector(profileAbout);
        this._avatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        return {
            title: this._title.textContent,
            about: this._about.textContent,
            avatar: this._avatar.style.backgroundImage,
        }
    }

    setUserInfo(data) {
        if (data.name) this._title.textContent = data.name;
        if (data.about) this._about.textContent = data.about;
        this.setUserAvatar(data)
    }

    setUserAvatar(data) {
        if (data.avatar) this._avatar.style.backgroundImage = `url("${data.avatar}")`;
    }
}
