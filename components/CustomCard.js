import * as React from 'react';
import { useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';
import { SocketContext } from '@/lib/SocketContext';

const CustomCard = (props) => {
    const { socket, callUser } = useContext(SocketContext);
    const [favorite, setFavorite] = useState(false);
    const [star, setStar] = useState(false);
    const [online, setOnline] = useState(true);
    const { userInfo } = props;

    const handleClick = (event) => {
        if (favorite) {
            setFavorite(false);
            setStar(true);
            socket.emit("markStar");
        } else if (star) {
            setStar(false);
            socket.emit("removeFavorite", userInfo);
        } else {
            setFavorite(true);
            socket.emit("addFavorite", userInfo);
        }
        // callUser(userInfo.socketId);
    };

    const styles = {
        media: {
            width: props.width || '100%',
            height: props.height || 'auto',
        },
        card: {
            position: 'relative',
            textAlign: 'center',
        },
        overlay: {
            position: 'absolute',
            bottom: '0.25rem',
            left: '0',
            right: '0',
            margin: 'auto',
            color: 'white',
            fontSize: '0.75rem',
        },
        iconStar: {
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            margin: 'auto',
            color: 'yellow',
            display: star ? 'block' : 'none',
        },
        iconFavorite: {
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            margin: 'auto',
            color: 'red',
            display: favorite ? 'block' : 'none',
        },
        iconOnline: {
            position: 'absolute',
            top: '0.25rem',
            right: '0.25rem',
            padding: '0',
            border: '2px solid white',
            color: online ? 'green' : 'grey',
        },
    };

    return (
        <Card style={styles.card} onClick={handleClick}>
            <CardMedia image={props.preview} style={styles.media} />
            <div style={styles.overlay}>
                {props.overlayText}
            </div>
            <IconButton
                style={styles.iconOnline}
            >
                <CircleIcon sx={{ fontSize: "10px" }} />
            </IconButton>
            <IconButton
                style={styles.iconStar}
            >
                <StarIcon />
            </IconButton>
            <IconButton
                style={styles.iconFavorite}
            >
                <FavoriteIcon />
            </IconButton>
        </Card>
    );
};

CustomCard.propTypes = {
    preview: PropTypes.string.isRequired,
    overlayText: PropTypes.string.isRequired
};

export default CustomCard;