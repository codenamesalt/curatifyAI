import Login from './Login';
import Title from './Title';
import { Box } from '@mui/material';

function LandingPage() {
    
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <div className="LandingPage">

                <div className="Middle">
                    <Title variant="text"/>
                    <br/><br/>
                    <Login />
                </div>
            </div>
        </Box>
    )
}

export default LandingPage;