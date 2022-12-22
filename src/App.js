import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './Auth';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

import Navbar from './components/Navbar'

function App() {
  return (
    <AuthProvider>
      <Router>

        <Navbar />
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
          <Route path='/dashboard' element={
            <Dashboard/>
          }/>
          <Route path='*' element={
            <h1>Page not found 404</h1>
          }/>

        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
