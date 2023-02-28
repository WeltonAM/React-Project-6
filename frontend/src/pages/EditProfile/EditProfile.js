import './EditProfile.css'

import { uploads } from '../../utils/config'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { profile, updateProfile } from '../../slices/userSlice'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

import Message from '../../components/Message'

const EditProfile = () => {
    const dispatch = useDispatch()
    
    const resetMessage = useResetComponentMessage(dispatch)

    const { user, message, error, loading } = useSelector((state) => state.user)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [bio, setBio] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setBio(user.bio)
        }
    }, [user])

    const handelSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            name
        }

        if(profileImage){
            userData.profileImage = profileImage
        }

        if(bio){
            userData.bio = bio
        }

        if(password){
            userData.password = password
        }

        const formData = new FormData()

        const userFormData = Object.keys(userData).forEach((key) => formData.append(key, userData[key]))

        formData.append("user", userFormData)

        await dispatch(updateProfile(formData))

        resetMessage()

    }

    const handleFile = (e) => {

        const image = e.target.files[0]

        setPreviewImage(image)

        setProfileImage(image)

    }

    return (
        <div id='edit-profile'>
            <h2>Edit your profile</h2>
            <p className='subtitle'>Add an image and tell more about you...</p>

            {(user.profileImage || previewImage) && (
                <img
                    className='profile-image'
                    src={
                        previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`
                    }
                    alt={user.name}
                />
            )}

            <form onSubmit={handelSubmit}>

                <input
                    type="text"
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}
                    value={name || ''}
                />

                <input
                    type="email"
                    placeholder='Email'
                    value={email || ''}
                    disabled
                />

                <label>
                    <span>Profile Image</span>
                    <input
                        type="file"
                        onChange={handleFile}
                    />
                </label>

                <label>
                    <span>Bio:</span>
                    <input
                        type="text"
                        placeholder='Profile description'
                        onChange={(e) => setBio(e.target.value)}
                        value={bio || ''}
                    />
                </label>


                <label>
                    <span>Change password:</span>
                    <input
                        type="password"
                        placeholder='Enter a new password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password || ''}
                    />
                </label>

                {!loading && <input type="submit" value="Update" />}

                {loading && <input type="submit" value="Updating..." disabled />}

                {error && <Message msg={error} type="error" />}

                {message && <Message msg={message} type="success" />}

            </form>
        </div>
    )
}

export default EditProfile