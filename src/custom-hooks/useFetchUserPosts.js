import { useEffect, useState } from 'react'
import { useFetchUser } from '../custom-hooks/useFetchUser'
import { useNavigate } from 'react-router-dom'

export const useFetchUserPosts = () => {
  const {userInfo} = useFetchUser()
  const navigate = useNavigate()

  const [userPosts, setUserPosts] = useState([])
  const userId = userInfo?._id
//   console.log(userId)

  const fetchUserPosts = async () => {
    const token = localStorage.getItem('token')
    const data = await fetch(`http://localhost:4000/api/posts/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
        Connection: 'keep-alive',
      },
    })
    if (!data.ok) {
      console.error('Server error:', data.status)
      return
    }
    const json = await data.json()
    setUserPosts(json)
    // console.log(json)
    if (
      json?.message === 'invalid token' ||
      json?.message === 'token not found'
    ) {
      navigate('/login')
    }
  }

  useEffect(() => {
    if (userId) {
      fetchUserPosts()
    }
  }, [userId])

  return userPosts
  
}
