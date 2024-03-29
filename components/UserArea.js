import React, { useEffect, useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import { createSvgIcon } from '@mui/material/utils';
import { WithContext as ReactTags } from 'react-tag-input'
import languages from '@/lib/languages';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import url from "@/lib/url";
import { SocketContext } from '@/lib/SocketContext';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const PhoneIcon = createSvgIcon(
    <path d="M16.5 1.5H7.5C7.10218 1.5 6.72064 1.65804 6.43934 1.93934C6.15804 2.22064 6 2.60218 6 3V12C6 12.1989 5.92098 12.3897 5.78033 12.5303C5.63968 12.671 5.44891 12.75 5.25 12.75C5.05109 12.75 4.86032 12.671 4.71967 12.5303C4.57902 12.3897 4.5 12.1989 4.5 12V3C4.5 2.20435 4.81607 1.44129 5.37868 0.87868C5.94129 0.316071 6.70435 0 7.5 0L16.5 0C17.2956 0 18.0587 0.316071 18.6213 0.87868C19.1839 1.44129 19.5 2.20435 19.5 3V12C19.5 12.1989 19.421 12.3897 19.2803 12.5303C19.1397 12.671 18.9489 12.75 18.75 12.75C18.5511 12.75 18.3603 12.671 18.2197 12.5303C18.079 12.3897 18 12.1989 18 12V3C18 2.60218 17.842 2.22064 17.5607 1.93934C17.2794 1.65804 16.8978 1.5 16.5 1.5ZM18 21C18 21.3978 17.842 21.7794 17.5607 22.0607C17.2794 22.342 16.8978 22.5 16.5 22.5H7.5C7.10218 22.5 6.72064 22.342 6.43934 22.0607C6.15804 21.7794 6 21.3978 6 21V18C6 17.8011 5.92098 17.6103 5.78033 17.4697C5.63968 17.329 5.44891 17.25 5.25 17.25C5.05109 17.25 4.86032 17.329 4.71967 17.4697C4.57902 17.6103 4.5 17.8011 4.5 18V21C4.5 21.7956 4.81607 22.5587 5.37868 23.1213C5.94129 23.6839 6.70435 24 7.5 24H16.5C17.2956 24 18.0587 23.6839 18.6213 23.1213C19.1839 22.5587 19.5 21.7956 19.5 21V18C19.5 17.8011 19.421 17.6103 19.2803 17.4697C19.1397 17.329 18.9489 17.25 18.75 17.25C18.5511 17.25 18.3603 17.329 18.2197 17.4697C18.079 17.6103 18 17.8011 18 18V21ZM2.5695 11.931C2.75011 11.8477 2.89022 11.696 2.959 11.5093C3.02778 11.3227 3.01959 11.1164 2.93625 10.9358C2.89498 10.8463 2.8365 10.7659 2.76415 10.6991C2.6918 10.6322 2.607 10.5803 2.51458 10.5463C2.32794 10.4775 2.12161 10.4857 1.941 10.569C1.4205 10.809 0.96 11.091 0.618 11.424C0.276 11.763 0 12.2085 0 12.75C0 13.569 0.612 14.16 1.2345 14.5515C1.8945 14.9685 2.799 15.3165 3.852 15.5955C5.967 16.1595 8.847 16.5 12 16.5C12.1485 16.5 12.2955 16.5 12.441 16.497L10.719 18.219C10.6493 18.2887 10.594 18.3715 10.5562 18.4626C10.5185 18.5537 10.4991 18.6514 10.4991 18.75C10.4991 18.8486 10.5185 18.9463 10.5562 19.0374C10.594 19.1285 10.6493 19.2113 10.719 19.281C10.8598 19.4218 11.0508 19.5009 11.25 19.5009C11.3486 19.5009 11.4463 19.4815 11.5374 19.4438C11.6285 19.406 11.7113 19.3507 11.781 19.281L14.781 16.281C14.8508 16.2113 14.9063 16.1286 14.9441 16.0374C14.9819 15.9463 15.0013 15.8487 15.0013 15.75C15.0013 15.6513 14.9819 15.5537 14.9441 15.4626C14.9063 15.3714 14.8508 15.2887 14.781 15.219L11.781 12.219C11.7113 12.1493 11.6285 12.094 11.5374 12.0562C11.4463 12.0185 11.3486 11.9991 11.25 11.9991C11.1514 11.9991 11.0537 12.0185 10.9626 12.0562C10.8715 12.094 10.7887 12.1493 10.719 12.219C10.6493 12.2887 10.594 12.3715 10.5562 12.4626C10.5185 12.5537 10.4991 12.6514 10.4991 12.75C10.4991 12.8486 10.5185 12.9463 10.5562 13.0374C10.594 13.1285 10.6493 13.2113 10.719 13.281L12.4365 14.997L12 15C8.94 15 6.195 14.6685 4.239 14.1465C3.255 13.884 2.5125 13.5855 2.034 13.284C1.518 12.9585 1.5 12.759 1.5 12.75C1.5 12.7455 1.5 12.6615 1.668 12.495C1.8405 12.327 2.133 12.132 2.568 11.931H2.5695ZM22.059 10.569C21.8784 10.4857 21.6721 10.4775 21.4854 10.5463C21.2988 10.615 21.1471 10.7551 21.0637 10.9358C20.9804 11.1164 20.9722 11.3227 21.041 11.5093C21.1098 11.696 21.2499 11.8477 21.4305 11.931C21.8685 12.132 22.1595 12.327 22.3305 12.4965C22.5 12.6615 22.5 12.7455 22.5 12.75C22.5 12.7545 22.5 12.8475 22.305 13.0305C22.107 13.2135 21.777 13.4205 21.2895 13.6305C20.322 14.0505 18.8955 14.415 17.145 14.661C16.9508 14.6919 16.7765 14.7979 16.6596 14.956C16.5428 15.1142 16.4927 15.312 16.5203 15.5067C16.5478 15.7014 16.6507 15.8775 16.8068 15.9971C16.963 16.1167 17.1598 16.1702 17.355 16.146C19.173 15.891 20.745 15.501 21.885 15.009C22.455 14.763 22.9545 14.4735 23.325 14.1285C23.694 13.785 24 13.323 24 12.75C24 12.207 23.724 11.76 23.382 11.4255C23.04 11.091 22.5795 10.809 22.059 10.569ZM11.25 3C11.0511 3 10.8603 3.07902 10.7197 3.21967C10.579 3.36032 10.5 3.55109 10.5 3.75C10.5 3.94891 10.579 4.13968 10.7197 4.28033C10.8603 4.42098 11.0511 4.5 11.25 4.5H12.75C12.9489 4.5 13.1397 4.42098 13.2803 4.28033C13.421 4.13968 13.5 3.94891 13.5 3.75C13.5 3.55109 13.421 3.36032 13.2803 3.21967C13.1397 3.07902 12.9489 3 12.75 3H11.25Z" fill="white" />,
    'Phone',
);

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function UserArea() {
    const { token, userInfo, setUserInfo } = useContext(SocketContext);
    const [file, setFile] = useState(userInfo && userInfo.image ? userInfo.image : "");
    const [langs, setLangs] = useState(userInfo && userInfo.languages ? userInfo.languages : []);
    const [userName, setUserName] = useState(userInfo && userInfo.username ? userInfo.username : '');

    const handleImageChange = (event) => {
        userInfo.image = URL.createObjectURL(event.target.files[0]);
        setUserInfo(userInfo)
        setFile(URL.createObjectURL(event.target.files[0]));
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        formData.append('userId', userInfo.userId);
        fetch(`${url.server}/api/auth/updateAvatar`, {
            method: 'POST',
            body: formData,
            headers: {
                'authorization': token
            },
        }).then(function (response) {
            if (response.success) {
                //TODO: socket emit avatar change
                console.log('successfully uploaded', response);
            }
        });
    }

    const handleNameChange = async (event) => {
        setUserName(event.target.value);
        const data = await fetch(`${url.server}/api/auth/updateUserName`, {
            method: 'POST',
            body: 'username=' + event.target.value + '&userId=' + userInfo.userId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorization': token
            },
        });
        const jsonData = await data.json();
        if (jsonData && jsonData.success) {
            console.log('successfully changed', jsonData);
        }
    }

    const handleLanguageDelete = (i) => {
        setLangs(langs.filter((lang, index) => index !== i));
    }

    const handleLanguageAddition = (lang) => {
        setLangs([...langs, lang]);
    }

    useEffect(() => {
        // let result = langs.map(lang => lang.id);
        fetch(`${url.server}/api/auth/updateUserLang`, {
            method: 'POST',
            body: 'langs=' + JSON.stringify(langs) + '&userId=' + userInfo.userId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorization': token
            },
        }).then(function (response) {
            if (response.success) {
                console.log('successfully changed', response);
            }
        });

    }, [langs]);

    return (
        <Paper
            sx={{
                p: 2,
                borderRadius: 0,
                margin: 0,
                flexGrow: 1,
                backgroundColor: '#000916',
                boxShadow: 'none',
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <input accept="image/*" type="file" style={{ display: 'none' }} id="raised-button-file" onChange={handleImageChange} />
                    <label htmlFor="raised-button-file">
                        {!file && (
                            <AccountBoxIcon sx={{ width: '3.55rem', height: '3.55rem', color: "grey", cursor: 'pointer' }} />
                        )}
                        {file && (
                            <Img alt="Photo" src={file} sx={{ width: '3.55rem', height: '4rem', borderRadius: 1, cursor: 'pointer', objectFit: 'cover' }} />
                        )}
                    </label>
                </Grid>
                <Grid item xs container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <TextField
                                name="email"
                                placeholder="Full Name"
                                onChange={handleNameChange}
                                value={userName}
                                size="small"
                                InputProps={{ disableUnderline: true }}
                                variant="standard"
                                sx={{
                                    '& input': {
                                        fontSize: '0.8rem',
                                        color: 'white',
                                        marginTop: '0.25rem',
                                        "&::placeholder": {
                                            color: "white",
                                            opacity: 0.7,
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item style={{ paddingTop: 0, }}>
                            <ReactTags
                                inline
                                tags={langs}
                                suggestions={languages}
                                autofocus={false}
                                autocomplete={true}
                                allowDragDrop={false}
                                allowUnique={true}
                                handleDelete={handleLanguageDelete}
                                handleAddition={handleLanguageAddition}
                                delimiters={delimiters}
                                placeholder="Add" />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <PhoneIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
