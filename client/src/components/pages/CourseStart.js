import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { isAuthenticated, getToken, getPayload } from '../../helpers/auth'

import certificate from '../../assets/images/certificate.png'
import chris from '../../assets/images/chris-working.png'
import confetti from '../../assets/gifs/confetti.gif'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'




const CourseStart = () => {

  // STATE

  const [course, setCourse] = useState(null)
  const [errors, setErrors] = useState(false)
  const [index, setIndex] = useState(0)
  const [videos, setVideos] = useState([])
  const [count, setCount] = useState(0)
  const [courseCompleted, setCourseCompleted] = useState(false)
  const [show, setShow] = useState(false)
  const [sessionBooked, setSessionBooked] = useState(false)

  // VARIABLES

  const currentUserPayload = getPayload()
  const currentUserId = parseInt(currentUserPayload.sub)
  console.log('user id', currentUserId)
  console.log('type of current user id', typeof (currentUserId))
  const { courseId } = useParams()
  const navigate = useNavigate()
  let counter = 0
  let usersArray = []
  let completed = false


  // CALLBACKS

  const partActive = (index, part) => {
    if (index === part) {
      return true
    } else {
      return false
    }
  }

  const handleClose = () => {
    setShow(false)
    console.log('show', show)
  }

  const handleShow = async () => {
    setShow(true)
  }

  const goToHome = () => {
    navigate('/')
  }
  const goToCourses = () => {
    navigate('/courses-logged-in')
  }

  const bookSession = () => {
    setSessionBooked(true)
  }

  const videoEnded = (index) => {
    const pk = videos[index].id

    if (index < videos.length - 1) {
      setIndex(index + 1)
    }
    updateVideoViewers(pk, index)
  }

  const selectPart = (i) => {
    setIndex(i)
  }

  const updateVideoViewers = async (videoPK, index) => {
    console.log('video pk', videoPK)
    let viewersArray = course.videos[index].video_viewed_by
    console.log('viewers array', viewersArray)
    viewersArray.push(currentUserId)
    console.log('viewers array after push', viewersArray)
    viewersArray = Array.from(new Set(viewersArray))
    console.log('viewers array after removing duplicates', viewersArray)
    try {
      await axios.put(`/api/videos/${videoPK}/`, { video_viewed_by: viewersArray }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('User updated ✅')
      getCourse()
    } catch (err) {
      console.log(err.response)
      setErrors(err.response)
    }
  }

  const getCourse = async () => {
    try {
      const { data } = await axios.get(`/api/courses/${courseId}/`)
      console.log('course', data)
      setCourse(data)
      const videosArrayInOrder = data.videos.sort((a, b) => a.order - b.order)
      for (let i = 0; i < data.videos.length; i++) {
        if (!videosArrayInOrder[i].video_viewed_by.includes(currentUserId)) {
          setIndex(i)
          break
        }
        console.log('INDEX SET', i)
      }
      setVideos(videosArrayInOrder)
      console.log('videos', videosArrayInOrder)
      for (let i = 0; i < data.videos.length; i++) {
        if (data.videos[i].video_viewed_by.includes(currentUserId)) {
          counter++
        }
      }
      setCount(counter)
      if (data.completed_by.includes(currentUserId)) {
        setCourseCompleted(true)
        completed = true
      } else {
        setCourseCompleted(false)
      }
      usersArray = data.completed_by
      if (data.videos.every(video => video.video_viewed_by.includes(currentUserId)) && courseCompleted === false && !completed) {
        setCourseCompleted(true)
        addUserToCourseCompleted()
        handleShow()
      }
    } catch (err) {
      console.log(err)
      setErrors(true)
    }
  }

  const addUserToCourseCompleted = async () => {
    usersArray.push(currentUserId)
    const usersArrayNoDup = Array.from(new Set(usersArray))
    console.log('viewers array after removing duplicates', usersArrayNoDup)
    try {
      await axios.put(`/api/courses/${course.id}/`, { completed_by: usersArrayNoDup }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('Course updated ✅')
      // getCourse()
      // setShow(true)
    } catch (err) {
      console.log(err.response)
      setErrors(err.response)
    }
  }

  // USE EFFECTS

  useEffect(() => {
    getCourse()
  }, [courseId])


  // JSX

  return (

    <main className='start-about-container'>

      <div key={index} className='div-main'>
        <Modal show={show} onHide={handleClose} className='modal'>
          <Modal.Header>
            <Modal.Title> <h2>Congrats on finishing the course &quot;Taxes and Income&quot;!</h2></Modal.Title>
          </Modal.Header>
          <div className="congrats">
            <img src={certificate}></img>
          </div >
          <Button className='action-btn centered' onClick={handleClose}>
            Close
          </Button>
        </Modal>
      </div>

      {
        course && videos &&
        <>
          <div className="flex-start-course">
            <h2 >{course.title}</h2>
            <div className="flex-space-between">
              <p><span className='bold-p'>{videos[index].order}. {videos[index].name}</span></p>
              {count === videos.length ?
                <p><span className='marg-p green-p completed-p'>Course completed! <i className="fa-solid fa-check"></i></span></p>
                :
                <p><span className='marg-p'>Completed: {count} / {videos.length}</span></p>
              }
            </div>
            {/* <p className='green-p'><i className="fa-solid fa-display"></i> {course.videos[index - 1].length} min</p> */}
          </div>

          <section className='start-container'>

            <section className='small-text-image-section'>
              {/* <h4>Course content</h4> */}
              {videos.map((video, i) => {
                return (
                  partActive(index, i) ?
                    <button key={video.id} onClick={() => selectPart(i)} className='active-part'>
                      <div className="flex-section">

                        {/* {partsSeen.includes(video.order) ?
    <p><i className="fa-regular fa-square-check green"></i></p>
    :
    <p><i className="fa-regular fa-square"></i></p>
  } */}
                        {video.video_viewed_by.includes(parseInt(currentUserId)) ?
                          <i className="fa-regular fa-square-check green"></i>
                          :
                          <p><i className="fa-regular fa-square"></i></p>
                        }

                        <p>{video.order}.</p>
                        <div className="flex-vert">
                          <p>{video.name}</p>
                          <p className='green-p'><i className="fa-solid fa-display"></i> {video.length} min</p>
                        </div>

                      </div>
                    </button>
                    :
                    <button key={video.id} onClick={() => selectPart(i)} className='part-btn'>
                      <div className="flex-section">

                        {/* {partsSeen.includes(video.order) ?
    <p><i className="fa-regular fa-square-check green"></i></p>
    :
    <p><i className="fa-regular fa-square"></i></p>
  } */}
                        {video.video_viewed_by.includes(parseInt(currentUserId)) ?
                          <i className="fa-regular fa-square-check green"></i>
                          :
                          <p><i className="fa-regular fa-square"></i></p>
                        }
                        <p>{video.order}.</p>
                        <div className="flex-vert">
                          <p>{video.name}</p>
                          <p className='green-p'><i className="fa-solid fa-display"></i> {video.length} min</p>
                        </div>

                      </div>
                    </button>






                )
              })}


            </section>
            <section className='big-container-video'>
              {videos && videos[index].url === 'live' ?
                <div className='appointment-div'>
                  {/* <h2>Please schedule your live-session:</h2> */}
                  {sessionBooked ?
                    <>

                      <p className='chris-p'><i className="fa-solid fa-check green"></i> Live session booking request sent!</p><br /><p className='chris-p2'>You will receive an email shortly for scheduling a live session with your instructor.</p>

                    </>
                    :
                    <button className='action-btn' onClick={bookSession}>Book live session</button>

                  }
                </div>

                :
                < video key={index} width="750" height="450" controls className='video-course' onEnded={() => videoEnded(index)}>
                  <source src={videos[index].url} type="video/mp4" />
                </video>

              }

            </section>

          </section>
          <div className="detail-container">
            <div>
              <h2>About this course</h2>

              <p>{course.description}</p>
            </div>

            <div>
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
            </div>
            <div>
              <h2>What you will get</h2>
              <div className="flex-categories">
                <p><i className="fa-solid fa-check green"></i> Certificate of completion/ {course.CE_credits} CE credits</p><br />
                <p><i className="fa-solid fa-check green"></i> Downloadable content</p>
              </div>
            </div>


            <div>
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

          </div>
        </>
      }
      {/* <Modal className='basket-modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change your delivery adress </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>Congrats on finishing the course!</h1>
        </Modal.Body>
      </Modal> */}
    </main >

  )





}

export default CourseStart