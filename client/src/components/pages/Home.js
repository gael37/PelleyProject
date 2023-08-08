import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { isAuthenticated, getToken, getPayload } from '../../helpers/auth'

import bigImage from '../../assets/images/accountant-main.webp'
import chris from '../../assets/images/instructor-chris-pelley.png'



const Home = () => {

  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
  const [selected, setSelected] = useState('')
  const [errors, setErrors] = useState(false)

  const navigate = useNavigate()
  const currentUserPayload = getPayload()
  const currentUserId = parseInt(currentUserPayload.sub)
  console.log('user id', currentUserId)
  console.log('type of current user id', typeof (currentUserId))
  const goToCourses = () => {
    navigate('/courses')
  }
  const goToCoursesLoggedIn = () => {
    navigate('/courses-logged-in')
  }

  const goToAbout = () => {
    navigate('/about')
  }

  // get all products
  const getCourses = async () => {
    try {
      const { data } = await axios.get('/api/courses/')
      console.log('courses at page render', data)
      setCourses(data)
      setFilteredCourses(data)
      setSelectedCourses(data)
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }

  useEffect(() => {
    getCourses()
  }, [])

  const handleSelected = (e) => {
    setSelected(e.target.value)
    const selection = courses.filter(product => {
      for (let i = 0; i < product.categories.length; i++) {
        if (product.categories[i].name === e.target.value) {
          return product
        } else if (e.target.value === 'All') {
          return product
        }
      }
    })
    setFilteredCourses(selection)
  }

  return (
    <main className='home-container'>
      <section className='text-image-section'>
        <div className="big-image-container">
          <h1>Earn CE Credits while expanding your skills</h1>
          <h4>Explore our educational course catalog and combine expanding your skills with
            earning continuing education credits.
          </h4>
          {isAuthenticated() ?
            <button className='action-btn' onClick={goToCoursesLoggedIn}>View Courses</button>
            :
            <button className='action-btn' onClick={goToCourses}>View Courses</button>
          }
        </div>
        <div className="big-image-container">
          <img src={bigImage} alt='Accountant working' />
        </div>
      </section>

      <div>
        <h2>Why choosing Pelley Group lectures?</h2>
        <section className='text-image-section'>
          <div className="big-image-container">
            <img className='chris-image' src={chris} alt='Chris Pelley' />
          </div>
          <div className="big-image-container">
            <h4 className='chris-quote'>&quot; We believe in building your competency and confidence in your accounting knowledge whether you are studying for the CPA exams or taking accounting courses. <br /><br />

              Therefore, we emphasize the importance of understanding the material rather than memorizing it by offering in-depth explanations. Our resources are aligned with your CPA review course and accounting courses. &quot;</h4>
            <p className='chris-signature'>Christopher Pelley</p>

          </div>

        </section>

      </div>

      <div>
        <h2>Recently Viewed Courses</h2>
        {/* <h4 className='chris-quote'>Advance your accounting career from anywhere with our online courses</h4> */}
      </div>



      <section className='courses-list'>
        <div className='courses-row'>
          {filteredCourses.sort((a, b) => b.id - a.id).map(course => {
            return (
              <div key={course.id} className='course-card'>
                <Link className='link link-nav' to={`/courses/${course.id}`}>
                  {course.completed_by.length > 0 && isAuthenticated() &&
                    course.completed_by.includes(parseInt(currentUserId)) ?
                    <>
                      < div className="course-card-image blurred" style={{ backgroundImage: `url(${course.image})` }}></div>
                    </>
                    :
                    <div className="course-card-image" style={{ backgroundImage: `url(${course.image})` }}></div>
                  }
                  {course.completed_by.length > 0 && !course.completed_by.includes(parseInt(currentUserId)) && isAuthenticated() ?
                    <div className='course-card-text blurred'>
                      <div className='flex-title-length'>
                        <h4 className='course-card-title'>{course.title}</h4>
                        {course.completed_by.includes(course.id) &&
                          <button className='length'>{course.length}h</button>
                        }
                      </div>

                      <div className='sized-div'>
                        {course.id === 2 || course.id === 6 ?
                          <h4 className='course-card-certificate'><i className="fa-solid fa-tv"></i> Individual work only</h4>

                          :
                          <h4 className='course-card-certificate'><i className="fa-solid fa-users-rectangle"></i> Includes a 1h live session</h4>

                        }
                      </div>
                      <div className='big-div'>
                        <p className='course-card-description'>{course.description}</p>
                      </div>
                      <div className='sized-div'>
                        <h4 className='course-card-certificate'><i className="fa-solid fa-graduation-cap"></i>  Earn a certificate / {course.CE_credits} CE credits</h4>
                      </div>

                    </div>
                    :
                    <div className='course-card-text'>
                      <div className='flex-title-length'>
                        <h4 className='course-card-title'>{course.title}</h4>
                        {/* {course.completed_by.length > 0 && course.completed_by.includes(parseInt(currentUserId)) && */}
                        <button className='length'>{course.length}h</button>
                        {/* } */}
                      </div>

                      <div className='sized-div'>
                        {course.id === 2 || course.id === 6 ?
                          <h4 className='course-card-certificate'><i className="fa-solid fa-tv"></i> Individual work only</h4>

                          :
                          <h4 className='course-card-certificate'><i className="fa-solid fa-users-rectangle"></i> Includes a 1h live session</h4>

                        }
                      </div>
                      <div className='big-div'>
                        <p className='course-card-description'>{course.description}</p>
                      </div>
                      <div className='sized-div'>
                        <h4 className='course-card-certificate'><i className="fa-solid fa-graduation-cap"></i>  Earn a certificate / {course.CE_credits} CE credits</h4>
                      </div>

                    </div>

                  }
                  {course.completed_by.length > 0 && course.completed_by.includes(parseInt(currentUserId)) && isAuthenticated() &&
                    <button className='length course-completed'><i className="fa-solid fa-check"></i> Course completed</button>
                  }
                  {course.started_by.length > 0 && !course.started_by.includes(parseInt(currentUserId)) && isAuthenticated() &&
                    <button className='length course-completed course-started'><i className="fa-solid fa-check"></i> Course started</button>
                  }
                  {/* {userData.courses_completed.length > 0 && userData.courses_completed.includes(course.id) &&
                        <button className='length course-completed'><i className="fa-solid fa-check"></i> Course completed</button>
                      } */}
                </Link>
              </div>
            )
          })}
        </div>
      </section >

      {isAuthenticated() ?
        <button className='action-btn btn-margin-top' onClick={goToCoursesLoggedIn}>View All Courses</button>
        :
        <button className='action-btn btn-margin-top' onClick={goToCourses}>View All Courses</button>
      }


    </main >

  )

}

export default Home