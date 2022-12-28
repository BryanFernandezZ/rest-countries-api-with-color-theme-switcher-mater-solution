import { Route, Routes, BrowserRouter, useParams } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import DetailsComponent from './components/DetailsComponent';
import './App.css';

function App() {

  const darkMode = () => {
    const darkModeIcon = document.getElementById("dark_mode_icon");
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      darkModeIcon.innerHTML = "<i class='fa-solid fa-moon'></i>";
    } else {
      darkModeIcon.innerHTML = "<i class='fa-regular fa-moon'></i>";
    }
  }

  return (
    <div className="main_container">
      <header className="header">
        <div className="logo">
          <p>Where in the world?</p>
        </div>

        <div className="dark_mode" onClick={() => { darkMode() }}>
          <div className="dark_mode_icon" id="dark_mode_icon">
            <i className="fa-regular fa-moon"></i>
          </div>
          <div className="dark_mode_content">
            <p>Dark Mode</p>
          </div>
        </div>
      </header>
      <article className='main_article'>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='details/:name' element={<Details />} />
          </Routes>
        </BrowserRouter>
      </article>
    </div>
  );
}

function Home() {
  return <HomeComponent />
}

function Details() {
  const { name } = useParams()
  return <DetailsComponent name={name} />
}

export default App;