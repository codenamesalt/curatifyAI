import { Fragment, useContext, useState } from 'react';
import { SearchContext } from './SearchContext';
import { Button, Box, IconButton, Tooltip, Snackbar } from '@mui/material';
import { Skeleton } from '@mui/material';
import PlaylistElement from './PlaylistElement';
import { MdOutlineSaveAlt } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import './App.css';

const sayings = [
    "Generate playlist"
]

function Playlist() {
    const headers = {
        "Content-Type": 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${document.cookie.split('access-token=')[1].split(';')[0]}`
    }

    const { params } = useContext(SearchContext)
    const [playlist, setPlaylist] = useState()
    const [buttonText, setButtonText] = useState(sayings[Math.floor(Math.random() * sayings.length)])
    const colors = ['#e6e6e6a0', '#ffffff00']
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function fetchPlaylist() {
        
        setButtonText(sayings[Math.floor(Math.random() * sayings.length)])

        if (params.seed_albums || params.seed_artists || params.seed_tracks) {
            const requestUri = `https://api.spotify.com/v1/recommendations?market=US` +
            `${params.seed_tracks ? `&seed_tracks=${params.seed_tracks}` : ''}` +
            `${params.seed_artists ? `&seed_artists=${params.seed_artists}` : ''}` +
            `${params.acousticness ? `&target_acousticness=${params.acousticness}` : ''}` +
            `${params.danceability ? `&target_danceablitity=${params.danceability}` : ''}` +
            `${params.energy ? `&target_energy=${params.energy}` : ''}` +
            `${params.popularity ? `&target_popularity=${params.popularity}` : ''}` +
            `${params.valence ? `&target_valence=${params.valence}` : ''}` +
            `${params.instrumentalness ? `&target_instrumentalness=${params.instrumentalness}` : ''}`

            console.log(requestUri)

            fetch(requestUri, { headers })
                .then(response => response.json())
                .then(
                    (result) => {
                        setPlaylist(result.tracks.map(track => ({
                            title:track.name,
                            artist:track.artists[0].name,
                            img:track.album.images.slice(-1)[0].url,
                            explicit:track.explicit,
                            id:track.id
                        })))
                    },
                    (error) => {
                        console.error("Error: ", error);
                    }
                )
        }
    }

    function savePlaylist() {
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                "name": "New Curatify Playlist",
                "description": "Curated by Curatify"
            })
        }

        fetch(`https://api.spotify.com/v1/users/${document.cookie.split('user-id=')[1].split(';')[0]}/playlists`, options)
            .then(response => response.json())
            .then(
                (result) => {
                    options.body = JSON.stringify({
                        uris:
                        playlist.map(track => (
                            `spotify:track${track.id}`
                        ))
                    })

                    fetch(`https://api.spotify.com/v1/playlists/${result.id}/tracks`, options)
                        .then(response => response.json())
                        .then(
                            (snapshot) => {
                                setOpen(true)
                            },
                            (error) => {
                                console.error('Error: ', error);
                            }
                        )
                },
                (error) => {
                    console.error('Error: ', error);
                }
            )
    }

    return (
        <div className="Playlist">

            <Box display="flex" alignItems="center">
                <div className="Center">
                    <Button
                        style={{textTransfor: 'capitalize'}}
                        color="primary"
                        variant="contained"
                        disable={!(params.seed_artists || params.seed_tracks)}
                        onClick={fetchPlaylist} >
                            {buttonText}
                        </Button>
                </div>

                <div className="Right">
                    <Tooltip
                        arrow
                        title="Save playlist to Spotify"
                        placement="left"
                    >
                        <span>
                            <IconButton
                                onClick={savePlaylist}
                                disabled={!playlist}>
                                <MdOutlineSaveAlt style={{height:'1.25em', width:'1.25em'}} />
                            </IconButton>
                        </span>
                    </Tooltip>
                </div>
            </Box>

            { playlist ? (
                <div style={{marginTop:20}}>
                    { playlist.map((track, index) => (
                        <PlaylistElement track={track} key={track.id} color={colors[index % colors.length]}/>
                    ))}
                </div>
            ) : (
                [...Array(10)].map((elem, index) => <Skeleton key={index} height={90} animation={false}/>)
            )}

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Playlist has been created!"
                action={
                    <Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CgClose fontSize="small" />
                        </IconButton>
                    </Fragment>
                }
                />
        </div>
    )
}

export default Playlist;