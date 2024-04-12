
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import ErrorPage from './errorPage';
import SignIn from './SignIn';

import RegistrationForm from './Signup';

import PostList from './main/Home';
import Createblog from './routes/Createblog';

import Profile from './main/comp/Profile';
import Navbartop from './main/comp/Navbar';
import MyBlogs from './main/comp/MyBlogs';


function App() {
  return (
    <div>
      <BrowserRouter>
      {/* <Navbartop/> */}
      <Routes  >
        <Route  path="/signin" element={<SignIn/>}/>
        <Route path="/" element={<PostList/>}/>
        <Route path="/signup" element={<RegistrationForm/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/myblogs" element={<MyBlogs/>}/>
        <Route path="/createblog" element={<Createblog/>}/>
     
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
