export class UserInfo {
    constructor(profileElement) {
        this._title = document.querySelector(profileElement.profileName);
        this._about = document.querySelector(profileElement.profileAbout);
        this._avatar = document.querySelector(profileElement.profileAvatar);
    }

    
    profileUserInfo() {
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