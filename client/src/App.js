import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NavigationBar from './components/common/NavigationBar'
import Home from './components/pages/Home'
import Courses from './components/pages/Courses'
import CourseDetail from './components/pages/CourseDetail'
import Login from './components/pages/auth/Login'
import LoginAfterRegister from './components/pages/auth/LoginAfterRegister'
import Register from './components/pages/auth/Register'
import NotFound from './components/pages/NotFound'
import Footer from './components/common/Footer'

const App = () => {



  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-after-register" element={<LoginAfterRegister />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  )

}

export default App
