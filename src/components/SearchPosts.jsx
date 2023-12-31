import  { useState, useEffect } from 'react';
import axios from 'axios';

const SearchPosts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (searchQuery) {
        try {
          const response = await axios.get(`http://localhost:4000/api/searchposts/${searchQuery}`);
          setSearchResults(response.data.message);
        } catch (error) {
          console.error(error);
        }
      } else {
        setSearchResults([]);
      }
    };

    const timeoutId = setTimeout(fetchPosts, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

console.log(searchResults)

  return (
    <div className=''>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      {searchResults.map(post => (
        <div key={post._id} className='m-2 w-30 h-30 bg-red-600 '>
          <h2>{post.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default SearchPosts;