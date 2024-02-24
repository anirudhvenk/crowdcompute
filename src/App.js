import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className='main-container'>
      <div className='side-nav'>
        <div className='logo' />
        <div className='nav-list'>
          <div className='nav-item'>
            <div className='leading-icon-nav-link'>
              <div className='leading-icon'>
                <div className='user'>
                  <div className='iconly-bold-user' />
                </div>
              </div>
              <div className='nav-link'>
                <span className='dashboard'>Host</span>
              </div>
            </div>
          </div>
          <div className='nav-item-1'>
            <div className='leading-icon-nav-link-2'>
              <div className='leading-icon-3'>
                <div className='filter'>
                  <div className='iconly-bold-filter' />
                </div>
              </div>
              <div className='nav-link-4'>
                <span className='dashboard-5'>Upload</span>
              </div>
            </div>
          </div>
          <div className='nav-item-6'>
            <div className='leading-icon-nav-link-7'>
              <div className='leading-icon-8'>
                <div className='setting'>
                  <div className='iconly-bold-setting' />
                </div>
              </div>
              <div className='nav-link-9'>
                <span className='dashboard-a'>Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex-column-ec'>
        <button className='rectangle'>
          <div className='upload-logo' />
        </button>
        <div className='upload-files'>
          <span className='upload-files-b'>
            Upload Files
            <br />
          </span>
          <span className='upload-files-c'>
            <br />
          </span>
          <span className='upload-files-d'>
            Upload a zip file of your code and training data
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
