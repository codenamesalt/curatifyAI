import { Box, Typography } from '@mui/material'
import './App.css'

function Title(props) {
    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
            
            <Box>
                <Typography variant="h2">
                    Curatify
                </Typography>

                <Box m={-2}>
                    <Typography variant="caption">
                        playlist generator
                    </Typography>
                </Box>
            </Box>

        </Box>
    )
}

export default Title;