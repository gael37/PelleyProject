import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { getToken, getPayload } from '../../helpers/auth'


import bigImage from '../../assets/images/accountant-main.webp'
import loading from '../../assets/gifs/loading-gif.gif'


const CoursesWhenLogged = () => {

  const [userData, setUserData] = useState(null)
  const [courses, setCourses] = useState([])
  const [instructors, setInstructors] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [typed, setTyped] = useState('')
  const [filteredByTopic, setFilteredByTopic] = useState([])
  const [filteredByInstructor, setFilteredByInstructor] = useState([])
  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedInstructor, setSelectedInstructor] = useState('')
  const [errors, setErrors] = useState(false)

  let currentUserPayload
  let currentUserId


  // get all products
  const getCourses = async () => {
    try {
      const { data } = await axios.get('/api/courses/')
      console.log('courses at page render', data)
      setCourses(data)
      setFilteredCourses(data)
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }
  const getInstructors = async () => {
    try {
      const { data } = await axios.get('/api/instructors/')
      console.log('instructors at page render', data)
      setInstructors(data)
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
    getToken()
    currentUserPayload = getPayload()
    console.log('payload', currentUserPayload)
    currentUserId = currentUserPayload.sub
    console.log('user id', currentUserId)
    getCourses()
    getInstructors()
    getUserData()
  }, [])

  const handleSelectTopic = (e) => {
    setFilteredCourses(courses)
    setSelectedInstructor('All instructors')
    setTyped('')

    setSelectedTopic(e.target.value)
    const selection = courses.filter(course => {
      for (let i = 0; i < course.categories.length; i++) {
        if (course.categories[i].name === e.target.value) {
          return course
        } else if (e.target.value === 'All') {
          return course
        }
      }
    })
    setFilteredCourses(selection)
  }

  const handleSelectInstructor = (e) => {
    setFilteredCourses(courses)
    setSelectedTopic('All topics')
    setTyped('')
    setSelectedInstructor(e.target.value)
    console.log(e.target.value)
    const selection = courses.filter(course => {
      for (let i = 0; i < course.instructors.length; i++) {
        if (course.instructors[i].id === parseInt(e.target.value)) {
          console.log('id of instructor', course.instructors[i].id)
          console.log(typeof (e.target.value))
          return course
        } else if (e.target.value === 'All') {
          return course
        }
      }
    })
    setFilteredCourses(selection)
  }

  const handleType = (e) => {
    setSelectedInstructor('All instructors')
    setSelectedTopic('All topics')
    setTyped(e.target.value)
    const regex = new RegExp(e.target.value, 'i')
    const filteredTitle = courses.filter(course => {
      return regex.test(course.title)
    })
    const filteredDescription = courses.filter(course => {
      return regex.test(course.description)
    })
    const filteredInstructorFirst = courses.filter(course => {
      return regex.test(course.instructors[0].first_name)
    })
    const filteredInstructorLast = courses.filter(course => {
      return regex.test(course.instructors[0].last_name)
    })
    const filteredArray = Array.from(new Set(filteredDescription.concat(filteredTitle).concat(filteredInstructorFirst.concat(filteredInstructorLast))))
    setFilteredCourses(filteredArray)
  }

  const handleClear = () => {
    setSelectedInstructor('All instructors')
    setSelectedTopic('All topics')
    setFilteredCourses(courses)
  }


  return (
    <main className='home-container courses-container'>
      {userData && filteredCourses ?
        <>
          <section className='text-image-section not-bold'>
            <h4>Explore our educational course catalog and combine expanding your skills with
              earning continuing education credits.
            </h4>
          </section>

          <div className="flex">
            <input placeholder="🔎 Search" value={typed} onChange={handleType}></input>
            <select onChange={handleSelectTopic} value={selectedTopic}>
              <option value='All'>All topics</option>
              <option value='Financial accounting'>Financial accounting</option>
              <option value='Auditing'>Auditing</option>
              <option value='Balance sheet'>Balance sheet</option>
              <option value='Financial statement'>Financial statement</option>
            </select>
            <select onChange={handleSelectInstructor} value={selectedInstructor}>
              <option value='All'>All instructors</option>
              {instructors &&
                instructors.map(instructor => {
                  return (
                    <option key={instructor.id} value={instructor.id}>{instructor.first_name} {instructor.last_name}</option>
                  )
                })
              }
            </select>
            <button className='clear-btn' onClick={handleClear}>Clear search</button>
          </div>
          {filteredCourses.length === 0 &&
            <p className='p-centered'>No courses match your criteria!</p>
          }

          <section className='courses-list'>
            <div className='courses-row'>
              {filteredCourses.sort((a, b) => b.id - a.id).map(course => {
                return (
                  <div key={course.id} className='course-card'>
                    <Link className='link link-nav' to={`/courses/${course.id}`}>
                      {course.completed_by.length > 0 &&
                        !course.completed_by.includes(parseInt(currentUserId)) ?
                        <>
                          < div className="course-card-image blurred" style={{ backgroundImage: `url(${course.image})` }}></div>
                        </>
                        :
                        <div className="course-card-image" style={{ backgroundImage: `url(${course.image})` }}></div>
                      }
                      {course.completed_by.length > 0 && !course.completed_by.includes(parseInt(currentUserId)) ?
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
                      {course.completed_by.length > 0 && !course.completed_by.includes(parseInt(currentUserId)) &&
                        <button className='length course-completed'><i className="fa-solid fa-check"></i> Course completed</button>
                      }
                      {course.started_by.length > 0 && !course.started_by.includes(parseInt(currentUserId)) &&
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
        </>
        :
        <>
          <img src={loading}></img>
        </>
      }

    </main >


  )

}

export default CoursesWhenLogged