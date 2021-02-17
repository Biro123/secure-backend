import { useState } from '@hookstate/core';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const MainPage = () => {

  const state = useState(axios.get('/api/users'));

  if (state.promised) {
    return <p>Loading...</p>
  }

  if (state.error) {
    console.error(state.error);
    return <p>Error...</p>
  }

  const { data, status } = state.get();

  console.log('status:' + status);

  return (
    <>
      <Typography variant="h4" color="primary" >
        Header goes here
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        And some subtext here
      </Typography>
      {data.map((entry, index) => 
        <p key={index}>{entry.name}</p>
      )}
    </>
  )
}
export default MainPage;