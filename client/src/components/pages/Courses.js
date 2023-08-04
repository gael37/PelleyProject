import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import bigImage from '../../assets/images/accountant-main.webp'


const Courses = () => {

  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
  const [selected, setSelected] = useState('')
  const [errors, setErrors] = useState(false)

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
        <h4>Explore our educational course catalog and combine expanding your skills with
          earning continuing education credits
        </h4>
        <div className="flex">
          <input placeholder="🔎 Search for a course"></input>
          <select onChange={handleSelected} value={selected}>
            <option value='All courses'>All courses</option>
            <option value='Accounting'>Accounting</option>
            <option value='Financial accounting'>Financial accounting</option>
            <option value='Auditing'>Auditing</option>
            <option value='Balance sheet'>Balance sheet</option>
            <option value='Financial statement'>Financial statement</option>
          </select>
        </div>
      </section>

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