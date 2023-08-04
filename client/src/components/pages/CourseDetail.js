import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import bigImage from '../../assets/images/accountant-main.webp'


const CourseDetail = () => {

  const [course, setCourse] = useState(null)
  const [congrats, setCongrats] = useState('')
  // const [userData, setUserData] = useState(null)
  const [errors, setErrors] = useState(false)

  const { courseId } = useParams()
  const navigate = useNavigate()
  const videoEnded = () => {
    setCongrats(true)
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
          <h1>Course: {course.title}</h1>
          <h2>What you will learn:</h2>
          <div>
            {course.categories.map(category => {
              return (
                <div className="flex-categories" key={category.id}>
                  <p>{category.name}</p>
                </div>
              )
            })}
          </div>

          <video width="750" height="500" controls onEnded={videoEnded}>
            <source src={course.video} type="video/mp4" />
          </video>
        </>
        :
        <h1>Loading</h1>
      }
      {congrats &&
        <h1>CONGRATS ON COMPLETING THE COURSE!</h1>
      }

    </main>
  )

}

export default CourseDetail