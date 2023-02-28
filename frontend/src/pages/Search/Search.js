import './Search.css'

import LikeContainer from '../../components/LikeContainer'
import PhotoItem from '../../components/PhotoItem'
import { Link } from 'react-router-dom'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

import { useQuery } from '../../hooks/useQuery'
import { searchPhotos, like } from '../../slices/photoSlice'

const Search = () => {

    const query = useQuery()

    const search = query.get("q")

    const dispatch = useDispatch()

    const resetMessage = useResetComponentMessage(dispatch)

    const { user } = useSelector((state) => state.auth)
    const { photos, loading } = useSelector((state) => state.photo)

    useEffect(() => {
        dispatch(searchPhotos(search))
    }, [dispatch, search])

    const handleLike = (photo = null) => {
        dispatch(like(photo._id))

        resetMessage()
    }

    // if (loading) {
    //     return <p>Loading...</p>
    // }

    return (
        <div id='search'>
            <h2>Searching for: {search}</h2>
            {console.log(photos)}
            {photos && photos.map((photo) => (
                <div key={photo._id}>
                    <PhotoItem photo={photo} />
                    <LikeContainer
                        photo={photo}
                        user={user}
                        handleLike={handleLike}
                    />
                    <Link className='btn' to={`/photos/${photo._id}`}>See
                    </Link>
                </div>
            ))}

            {photos && photos.length === 0 && (
                <h2 className='no-photos'>
                    No photos found for the search...
                </h2>
            )}
        </div>
    )
}

export default Search