import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './hooks/useAuth';
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';
import Photo from './pages/Photo/Photo';
import Search from './pages/Search/Search';

function App() {

  const { auth, loading } = useAuth()

  if(loading){
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <div className="App">
      <BrowserRouter>

        <Navbar />

        <main id='container'>
          <Routes>
            
            <Route path='/' element={auth ? <Home /> : <Navigate to="/login" /> }/>
            
            <Route path='/login' element={ !auth ? <Login /> : <Navigate to="/" />} />
            
            <Route path='/register' element={ !auth ? <Register /> : <Navigate to="/" />} />
            
            <Route path='/users/:id' element={auth ? <Profile /> : <Navigate to="/" /> }/>
            
            <Route path='/profile' element={auth ? <EditProfile /> : <Navigate to="/" /> }/>

            <Route path='/search' element={auth ? <Search /> : <Navigate to="/login" /> }/>
            
            <Route path='/photos/:id' element={auth ? <Photo /> : <Navigate to="/login" /> }/>

          </Routes>
        </main>

        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
