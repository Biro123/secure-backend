import Typography from '@material-ui/core/Typography';
import Data from './Data';

const MainPage = () => {

  return (
    <>
      <Typography variant="h4" color="primary" >
        Header goes here
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        And some subtext here
      </Typography>
      <Data />
    </>
  )
}
export default MainPage;