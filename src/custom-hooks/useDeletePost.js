import { useParams } from 'react-router-dom'

export const useDeletePost = () => {
  const { postid } = useParams()
  const apiUrl = import.meta.env.VITE_API_URL;

  const deletePost = async () => {
    const token = localStorage.getItem('token')
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
