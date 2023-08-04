import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import bigImage from '../../assets/images/accountant-main.webp'
import chris from '../../assets/images/instructor-chris-pelley.png'


const Home = () => {

  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])
  const [selected, setSelected] = useState('')
  const [errors, setErrors] = useState(false)

  const navigate = useNavigate()

  const goToCourses = () => {
    navigate('/courses')
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
          <button className='action-btn' onClick={goToCourses}>View Courses</button>

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

      <button className='action-btn btn-margin-top' onClick={goToCourses}>View All Courses</button>

    </main >

  )

}

export default Home