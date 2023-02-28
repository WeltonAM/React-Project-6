import './Profile.css'

import { uploads } from '../../utils/config'

import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'

import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getUserDetails } from '../../slices/userSlice'
import { getUserPhotos, publishPhoto, deletePhoto, updatePhoto } from '../../slices/photoSlice'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

const Profile = () => {

  const { id } = useParams()

  const dispatch = useDispatch()

  const { user, loading } = useSelector((state) => state.user)
  const { user: userAuth } = useSelector((state) => state.auth)
  const { photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto } = useSelector((state) => state.photo)

  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")

  const [editId, setEditId] = useState("")
  const [editImage, setEditImage] = useState("")
  const [editTitle, setEditTitle] = useState("")

  const newPhotoForm = useRef()
  const editPhotoForm = useRef()

  useEffect(() => {

    dispatch(getUserDetails(id))
    dispatch(getUserPhotos(id))

  }, [dispatch, id])

  const submitHandel = (e) => {
    e.preventDefault()

    const photoData = {
      title,
      image
    }

    const formData = new FormData()
    const photoFormData = Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]))

    formData.append("photo", photoFormData)

    dispatch(publishPhoto(formData))

    setTitle("")

    resetMessage()
  }

  const resetMessage = useResetComponentMessage(dispatch)

  const handleFile = (e) => {

    const image = e.target.files[0]

    setImage(image)

  }

  const handleDelete = (id) => {

    dispatch(deletePhoto(id))

    resetMessage()
  }

  const hideOrShowForms = () => {
    newPhotoForm.current.classList.toggle("hide")
    editPhotoForm.current.classList.toggle("hide")
  }

  const handleUpdate = (e) => {
    e.preventDefault()

    const photoData = {
      title: editTitle,
      id: editId
    }

    dispatch(updatePhoto(photoData))

    resetMessage()
  }

  const handleEdit = (photo) => {
    if(editPhotoForm.current.classList.contains("hide")){
      hideOrShowForms()
    }

    setEditId(photo._id)
    setEditTitle(photo.title)
    setEditImage(photo.image)
  }

  const handleCancelEdit = () => {
    hideOrShowForms()
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div id='profile'>
      <div className='profile-header'>

        {user.profileImage && (
          <img
            src={`${uploads}/users/${user.profileImage}`}
            alt={user.name}
          />
        )}

        <div className='profile-description'>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>

      </div>

      {id === userAuth._id && (
        <>
          <div className='new-photo' ref={newPhotoForm}>
            <h3>Share a life moment:</h3>

            <form onSubmit={submitHandel}>

              <label>
                <span>Photo title:</span>
                <input
                  type="text"
                  placeholder='Enter a title'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ''}
                />
              </label>

              <label>
                <span>Image:</span>
                <input
                  type="file"
                  onChange={handleFile}
                />
              </label>

              {!loadingPhoto && <input type="submit" value="Post" />}

              {loadingPhoto && <input type="submit" value="Posting..." disabled />}

            </form>

          </div>

          <div className='edit-photo hide' ref={editPhotoForm}>
            <p>Editing...</p>
            {editImage && (
              <img
                src={`${uploads}/photos/${editImage}`}
                alt={editTitle}
              />
            )}

            <form onSubmit={handleUpdate}>

              <input
                type="text"
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle || ''}
              />

              <input type="submit" value="Update" />

              <button className='cancel-btn' onClick={handleCancelEdit}>Cancel</button>

            </form>

          </div>

          {errorPhoto && <Message msg={errorPhoto} type="error" />}

          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}

      <div className='user-photos'>
        <h2>Published photos</h2>

        <div className='photos-container'>

          {photos && photos.map((photo) => (
            <div className='photo' key={photo._id}>

              {photo.image && (
                <img
                  src={`${uploads}/photos/${photo.image}`}
                  alt={photo.title}
                />
              )}

              {id === userAuth._id ? (
                <div className='actions'>
                  <Link to={`/photos/${photo._id}`}>
                    <BsFillEyeFill />
                  </Link>

                  <BsPencilFill onClick={() => handleEdit(photo)} />
                  <BsXLg onClick={() => handleDelete(photo._id)} />
                </div>
              ) : (
                <Link className="btn see-btn" to={`/photos/${photos._id}`}>See</Link>
              )}

            </div>
          ))}

          {photos.length === 0 && <p>Any photos published...</p>}

        </div>
      </div>
    </div>
  )
}

export default Profile