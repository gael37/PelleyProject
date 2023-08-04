import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import bigImage from '../../assets/images/accountant-main.webp'


const CourseDetail = () => {

  const [course, setCourse] = useState(null)
  const [congrats, setCongrats] = useState('')
  const [userData, setUserData] = useState(null)
  const [errors, setErrors] = useState(false)

  const { courseId } = useParams()
  const navigate = useNavigate()

  const videoEnded = () => {
    setCongrats(true)
  }

  const startCourse = () => {
    navigate('/courseDetail')
  }

  const goToLogin = () => {
    navigate('/login')
  }

  const getCourse = async () => {
    try {
      const { data } = await axios.get(`/api/courses/${courseId}/`)
      setCourse(data)
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }

  useEffect(() => {
    getCourse()
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
              {/* <div className="flex-icon">
                <i className="fa-solid fa-graduation-cap"></i>
                <h4>Certificate of completion/ {course.CE_credits} CE credits</h4>
              </div>

              <div className="flex-icon">
                <i className="fa-solid fa-cloud-arrow-down"></i>
                <h4>Downloadable content</h4>
              </div> */}


            </div>
            <div className="container-video">
              <video width="500" height="350" controls onEnded={videoEnded}>
                <source src={course.trailer} type="video/mp4" />
              </video>

              {userData ?
                <button className='action-btn' onClick={startCourse}>Start Course</button>
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