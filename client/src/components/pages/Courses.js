import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import bigImage from '../../assets/images/accountant-main.webp'


const Courses = () => {

  const [courses, setCourses] = useState([])
  const [instructors, setInstructors] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [typed, setTyped] = useState('')
  const [filteredByTopic, setFilteredByTopic] = useState([])
  const [filteredByInstructor, setFilteredByInstructor] = useState([])
  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedInstructor, setSelectedInstructor] = useState('')
  const [errors, setErrors] = useState(false)

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

  useEffect(() => {
    getCourses()
    getInstructors()
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
    // setSelectSize('small')
    setSelectedInstructor('All instructors')
    setSelectedTopic('All topics')
    // setNoMatch(false)
    setFilteredCourses(courses)
  }
  //   useEffect(() => {
  // setFilteredCourses(filteredByTopic)
  //   }, filteredByTopic)

  return (
    <main className='home-container courses-container'>

      <section className='text-image-section not-bold'>
        <h4>Explore our educational course catalog and combine expanding your skills with
          earning continuing education credits.
        </h4>

      </section>
      <div className="flex">
        <input placeholder="🔎 Search by keyword" value={typed} onChange={handleType}></input>
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
                // <option key={instructor.id} value='${instructor.first_name} ${instructor.last_name}'>{instructor.first_name} {instructor.last_name}</option>
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
                  <div className="course-card-image" style={{ backgroundImage: `url(${course.image})` }}></div>
                  <div className='course-card-text'>
                    <div className='flex-title-length'>
                      <h4 className='course-card-title'>{course.title}</h4>
                      <button className='length'>{course.length}h</button>
                    </div>
                    {/* <div className='instructor-div'>
                      {course.instructors.map(instructor => {
                        return (
                          <div key={instructor.id} className='instructor-div'>
                            <img src={instructor.profile_picture} alt="instructor-thumbnail" />
                            <p>{instructor.first_name} {instructor.last_name}</p>
                          </div>
                        )
                      })}
                    </div> */}

                    {/* <div className='sized-div'>
                      <h4 className='course-card-certificate'><i className="fa-solid fa-certificate"></i> Earn {course.CE_credits} CE credits</h4>
                    </div> */}
                    <div className='sized-div'>
                      <h4 className='course-card-certificate'><i className="fa-solid fa-users-rectangle"></i> Includes a 1h live session</h4>
                    </div>
                    <div className='big-div'>
                      <p className='course-card-description'>{course.description}</p>
                    </div>
                    <div className='sized-div'>
                      <h4 className='course-card-certificate'><i className="fa-solid fa-graduation-cap"></i>  Earn a certificate / {course.CE_credits} CE credits</h4>
                    </div>
                    {/* <div className='small-div'>
                      <p className='course-card-topics'><i className="fa-regular fa-clipboard"></i> Topics covered:</p>
                    </div> */}
                    {/* <div className='big-div'>
                      {course.categories.map(category => {
                        return (
                          <div key={category.id} className='flex-categories'><i className="fa-solid fa-check green "></i> {category.name}</div>
                        )
                      })}
                    </div> */}
                    {/* <div className='small-div'>
                      <p className='course-card-topics'><i className="fa-solid fa-chalkboard-user"></i> Instructors:</p>
                    </div> */}
                    {/* <div className='sized-div'>
                      <p>Instructor</p>
                    </div> */}

                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </section >
    </main >

  )

}

export default Courses