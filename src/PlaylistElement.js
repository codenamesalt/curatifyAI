import { IoPlayCircleOutline } from 'react-icons/io5';
import { Typography, IconButton, Box } from '@mui/material';
import './App.css'

function PlaylistElement(props) {

    const option = props.track

    return(
        <div className="PlaylistElement" style={{backgroundColor:props.color, borderRadius:5, paddingLeft:10}}>
            <Box key={option.title} display="flex" style={{alignItems:"center"}}>

                <img src={option.img} width={40} height={40} alt="album cover"></img>
                <Typography>
                    &nbsp;
                    {option.artist} - {option.title}
                    &nbsp;
                    {option.explicit && <span style={{fontSize:'.75em', fontWeight:'bold', color:'red'}}>E</span>}
                </Typography>
                <div className="Right" style={{paddingRight:10}}>
                    <IconButton href={`spotify:track:${option.id}`}>
                        <IoPlayCircleOutline/>
                    </IconButton>
                </div>
            </Box>
        </div>
    )
}

export default PlaylistElement;