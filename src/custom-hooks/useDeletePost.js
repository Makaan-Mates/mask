import { useParams } from 'react-router-dom'

export const useDeletePost = () => {
  const { postid } = useParams()

  const deletePost = async () => {
    const token = localStorage.getItem('token')
    const data = await fetch(
      `https://mask-backend.up.railway.app/api/post/delete/${postid}`,
      {
        method: 'DELETE',
        headers: {
          'CONTENT-TYPE': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const json = await data.json()
    console.log(json)
  }

  return deletePost
}
