import './App.css';
import axios from 'axios';
import {useEffect, useState } from 'react';
import Form2 from './components/form2';
import Frame from 'react-frame-component'

export const config = {
  baseUrl: `https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json`
}

const App = () => {

  const [message, setMessage] = useState(null)
  const [selectData, setSelectData] = useState([])

  const fetchSelectData = async () => {
      try {
          const res = await axios(`${config.baseUrl}`)
          console.log(res)
          setSelectData(res.data)
      } catch(err) {
          console.log(err)
          console.log(err.response)
      }
  }


  useEffect(() => {
      fetchSelectData()
  }, [])


  return (
    <div className='container'>
      <Frame width={500} height={500}>
        <Form2 message={message} setMessage={setMessage} selectData={selectData} />
      </Frame>
      <h3 className='validation-message'>
        {message ? (
          message?.key === 'success' ? (
            `Result: {"${message.info.includes('error') ? 'Info' :'Success'}": "${message.info}"}`
          ) : (
            `Result: {"${message.key}": { "error": "${message.error}"}}`
          )
        ) : ''}
      </h3>
    </div>
  );
}

export default App;
