import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const useFetchUser = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true) 
  const profileEdited = useSelector((state) => state.user.profileEdited)
  const apiUrl = import.meta.env.VITE_API_URL;
  // console.log(profileEdited)

  useEffect(() => {
    fetchUser()
  }, [profileEdited])

  const fetchUser = async () => {
    const token = localStorage.getItem('token')
    const data = await fetch(`${apiUrl}/api/home`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await data.json()
    setUserInfo(json)
    setLoading(false) 
    if (
      json?.message === 'invalid token' ||
      json?.message === 'token not found'
    ) {
      navigate('/login')
    }
  }

  return { userInfo, loading } 
}
