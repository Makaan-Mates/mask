import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useFetchUser = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true) 


  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const token = localStorage.getItem('token')
    const data = await fetch('https://mask-backend.up.railway.app/api/home', {
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
