import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { isAuthenticated, getToken, getPayload } from '../../helpers/auth'



const CourseDetail = () => {

  const [course, setCourse] = useState(null)
  const [congrats, setCongrats] = useState('')
  const [userData, setUserData] = useState(null)
  const [errors, setErrors] = useState(false)

  const { courseId } = useParams()
  const navigate = useNavigate()

  const currentUserPayload = getPayload()
  const currentUserId = parseInt(currentUserPayload.sub)
  console.log('user id', currentUserId)
  console.log('type of current user id', typeof (currentUserId))

  const videoEnded = () => {
    setCongrats(true)
  }

  // const startCourse = () => {
  //   navigate(`/courses-start/${course.id}/`)
  // }

  const goToLogin = () => {
    navigate('/login')
  }

  const getCourse = async () => {
    try {
      const { data } = await axios.get(`/api/courses/${courseId}/`)
      setCourse(data)
      console.log('course', data)
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`/api/auth/${currentUserId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setUserData(data)
      console.log('user data', data)
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }

  useEffect(() => {
    getCourse()
    getUserData()
  }, [courseId])

  return (

    <main className='home-container'>

      {course ?
        <>


          <section className='text-image-section'>
            <div className="detail-container">
              <h1>{course.title}</h1>
              <h4>{course.description}</h4>
              <h2>What this course covers</h2>

              <div className='flex-categories-detail'>

                {course.categories.map(category => {
                  return (
                    <div className="flex-categories" key={category.id}>
                      <p><i className="fa-solid fa-check green"></i> {category.name}</p>
                    </div>
                  )
                })}
              </div>
              <h2>What you will get</h2>
              <div className="flex-categories">
                <p><i className="fa-solid fa-check green"></i> Certificate of completion/ {course.CE_credits} CE credits</p><br />
                <p><i className="fa-solid fa-check green"></i> Downloadable content</p>
              </div>
              <h2>Instructors</h2>
              <div className='instructor-div'>
                {course.instructors.map(instructor => {
                  return (
                    <div key={instructor.id} className='instructor-flex'>
                      <img src={instructor.profile_picture} alt="instructor-thumbnail" />
                      <div className='bio-flex'>
                        <h4>{instructor.first_name} {instructor.last_name}</h4>
                        <p>{instructor.bio}</p>
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>
            <div className="container-video">
              <video width="500" height="350" controls onEnded={videoEnded}>
                <source src={course.trailer} type="video/mp4" />
              </video>

              {isAuthenticated() && userData ?
                <>
                  {
                    userData.courses_started.includes(course.id) ?
                      < Link className='link action-btn center continue-btn' to={`/courses-start/${course.id}/`}>Continue Course</Link>
                      :
                      < Link className='link action-btn center' to={`/courses-start/${course.id}/`}>Start Course</Link>
                  }
                </>


                :
                <button className='action-btn' onClick={goToLogin}>Login to Start</button>
              }
            </div>


          </section>


        </>

        :
        <h1>Loading</h1>
      }
      {
        congrats &&
        <h1>CONGRATS ON COMPLETING THE COURSE!</h1>
      }




    </main >
  )

}

export default CourseDetail