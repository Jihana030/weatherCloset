import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";

function App() {

    const [hello, setHello] = useState('');
    useEffect(() => {
        axios.get('/api/test')
            .then((response) => {
                setHello(response.data);
            })
    }, []);

  return (
    <div className="App">
      backend data: {hello}
    </div>
  )
}

export default App
