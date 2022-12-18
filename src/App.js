import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';


function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path='/' element={
            <Landing/>
          }/>
          <Route path='/signin' element={
            <SignIn/>
          }/>
          <Route path='/signup' element={
            <SignUp/>
          }/>
          <Route path='/profile' element={
            <Profile/>
          }/>
          <Route path='*' element={
            <h1>Page not found 404</h1>
          }/>

        </Routes>
      </Router>
    </>

  );
}

export default App;
