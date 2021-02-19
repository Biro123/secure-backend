import { useState } from '@hookstate/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import DataForm from './DataForm';

const Data = () => {
  const state = useState(axios.get('/api/data'));

  if (state.promised) {
    return <p>Loading...</p>
  }
  if (state.error) {
    console.error(state.error);
    return <p>Error...</p>
  }

  const { data, status } = state.get();

  return (
    <>
      {data.map((entry, index) =>        
        <p key={index}>{entry.text}</p>
      )}
      <DataForm />
    </>
  )
}
export default Data;