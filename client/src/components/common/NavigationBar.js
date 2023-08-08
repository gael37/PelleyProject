import { Link, useNavigate } from 'react-router-dom'

import logo from '../../assets/images/logo-pelley-group.png'
import logo2 from '../../assets/images/logo2.png'

import { isAuthenticated, handleLogout, getToken, getPayload } from '../../helpers/auth'


const NavigationBar = () => {

  const navigate = useNavigate()
  const toggleBtn = document.querySelector('.toggle-btn')
  const toggleBtnIcon = document.querySelector('.toggle-btn i')
  const dropdownMenu = document.querySelector('.dropdown-menu')

  const logIn = () => {
    navigate('/login')
  }
  const goToRegister = () => {
    navigate('/register')
  }

  const toggle = () => {
    dropdownMenu.classList.toggle('open')
    const isOpen = dropdownMenu.classList.contains('open')
    toggleBtnIcon.classList = isOpen
      ? 'fa-solid fa-xmark'
      : 'fa-solid fa-bars'
  }

  return (

    <header>
      <div className="navbar">
        <div className="logo"><Link to='/'><img src={logo2} alt='Pelley Group'></img></Link></div>
        <ul className='links'>
          <Link className='link' to='/'>Home</Link>
          <Link className='link' to='/about'>About</Link>
          {isAuthenticated() ?
            <Link className='link' to='/courses-logged-in'>Courses</Link>
            :
            <Link className='link' to='/courses'>Courses</Link>
          }
          {isAuthenticated() ?
            <>
              <Link className='link' to='/dashboard'>Dashboard</Link>
              <button className='action-btn logout-btn' to='/' onClick={() => handleLogout(navigate)}>Sign Out <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
              {/* <button className='' onClick={() => handleLogout(navigate)}><i className="fa-solid fa-arrow-right-from-bracket"></i>Log Out</button> */}
            </>
            :
            <>
              <Link className='link colored-link' to='/login'>Sign In</Link>
              <button className='action-btn' onClick={goToRegister}>Join for Free</button>
            </>


          }
        </ul>
        <div className="toggle-btn">
          <i className="fa-solid fa-bars" onClick={toggle}></i>
        </div>
      </div>

      <div className="dropdown-menu">
        <Link className='link' to='/home'>About</Link>
        <Link className='link' to='/courses'>Courses</Link>
        <Link className='link colored-link' to='/login'>Login</Link>
        <button className='action-btn' onClick={logIn}>Join for Free</button>
      </div>
    </header>

  )

}

export default NavigationBar