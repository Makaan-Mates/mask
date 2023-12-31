import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useFetchUser = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true) // Add this line


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
    setLoading(false) // Add this line
    if (
      json?.message === 'invalid token' ||
      json?.message === 'token not found'
    ) {
      navigate('/login')
    }
  }

  return { userInfo, loading } // Modify this line
}
