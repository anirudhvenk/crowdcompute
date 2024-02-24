import './navbar.css';
import logo from './assets/logo.svg';
import users from './assets/users.svg'
import upload from './assets/upload.svg'
import setting from './assets/setting.svg'

export default function Navbar() {
    return (
        <div className="side-nav">
        <img className="logo" alt="Logo" src={logo} />
        <a href="/Host">
            <div className="nav-item">
                <img src={users}/>
                <span class="nav-text">Host</span>
            </div>
        </a>
        <a href="/Upload">
            <div className="nav-item" href="/Upload">
                <img src={upload}/>
                <span class="nav-text">Upload</span>
            </div>
        </a>
        <a href="/Profile">
            <div className="nav-item" href="/Profile">
                <img src={setting}/>
                <span class="nav-text">Profile</span>
            </div>
        </a>
        
      </div>
    )
}