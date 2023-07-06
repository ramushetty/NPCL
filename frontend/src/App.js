import React, {useEffect, useState} from 'react';

import axios from 'axios';


function App() {

  const [data,setData] = useState("")
  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data')
        setData(response.data)
      } catch(error) {
        console.log('Error fetching data:', error);
      }
      
    };
    fetchData();
  }, [])
  
  return (
    <div>{data.message}</div>      
  );
}

export default App;
