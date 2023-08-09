export class UserInfo {
    constructor({profileName, profileAbout, profileAvatar}) {
        this._title = document.querySelector(profileName);
        this._about = document.querySelector(profileAbout);
        this._avatar = document.querySelector(profileAvatar);
    }

    getUserInfo() {
        return {
            id: this._id,
            title: this._title.textContent,
            about: this._about.textContent,
            avatar: this._avatar.style.backgroundImage
        }
    }

    setUserInfo(userData) {
        this._title.textContent = userData.name;
        this._about.textContent = userData.about;
        this._avatar.style.backgroundImage = `url("${userData.avatar}")`;
    }
}