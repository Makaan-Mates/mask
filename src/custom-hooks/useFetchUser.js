import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useFetchUser = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const token = localStorage.getItem('token')
    const data = await fetch('http://localhost:4000/api/home', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await data.json()
    setUserInfo(json)
    if (
      json?.message === 'invalid token' ||
      json?.message === 'token not found'
    ) {
      navigate('/login')
    }
  }

  return userInfo
}
