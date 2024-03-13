import { useParams,useNavigate } from 'react-router-dom'

export const useDeletePost = () => {
  const { postid } = useParams()
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  const deletePost = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    const data = await fetch(
      `${apiUrl}/api/post/delete/${postid}`,
      {
        method: 'DELETE',
        headers: {
          'CONTENT-TYPE': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const json = await data.json()
    // console.log(json)
  }

  return deletePost
}
