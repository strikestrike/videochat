import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { SocketContext } from '@/lib/SocketContext';

const useStyles = makeStyles((theme) => ({
    myvideo: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        right: 0,
        width: '5rem',
        height: '6rem',
        objectFit: 'cover',
        [theme.breakpoints.down('xs')]: {
            width: '4rem',
            height: '5rem',
        },
    },
    uservideo: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        background: 'rgba(0, 0, 0, 0.5)',
    },
}));

const VideoPlayer = () => {
    const { callAccepted, userVideo, callEnded, stream, call, setStream, myVideo } = useContext(SocketContext);
    const classes = useStyles();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(currentStream => {
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
        });        
    }, [])

    return (
        <>
            <video playsInline muted ref={myVideo} autoPlay className={classes.myvideo} 
                style={{
                    top: callAccepted && !callEnded ? '0' : 'auto',
                    width: callAccepted && !callEnded ? '5rem' : '100%',
                    height: callAccepted && !callEnded ? '6rem' : '100%',
                }}
            />

            {callAccepted && !callEnded && (
                <video playsInline ref={userVideo} autoPlay className={classes.uservideo} />
            )}
        </>
    );
};

export default VideoPlayer;
