import { useEffect, useState, useContext } from 'react'
import Head from "next/head";
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode'
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import styles from '@/styles/Home.module.css'
import { TextFieldBorders } from "@/components/TextFieldBorders"
import { ButtonRound } from "@/components/ButtonRound"
import url from "@/lib/url";
import { SocketContext } from '@/lib/SocketContext';

export default function Home() {
    const { token, setToken, setUserInfo } = useContext(SocketContext);
    const router = useRouter();
    const [tag, setTag] = useState("");
    const [qr, setQr] = useState('');
    const [email, setEmail] = useState("");
    const [buttonText, setButtonText] = useState("Enter Artiverse");

    const parseJwt = (data) => {
        if (!data) { return; }
        const base64Url = data.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    const handleLogin = async (event) => {
        try {
            let actionUrl = `${url.server}/api/auth/enterRound`;
            let body = 'email=' + email + '&tag=' + tag;
            if (buttonText == "Send Link") {
                actionUrl = `${url.server}/api/auth/sendLink`;
                body = 'email=' + email;
            }

            const data = await fetch(actionUrl, {
                method: 'POST',
                body: body,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': token
                },
            });
            const jsonData = await data.json();
            if (jsonData) {
                if (buttonText == "Send Link") {
                    window.location = jsonData.link;
                } else {
                    setUserInfo(jsonData.user);
                    router.push({
                        pathname: '/room'
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    const GenerateQRCode = (data) => {
        QRCode.toDataURL(data, {
            width: 800,
            margin: 2,
            color: {
                // dark: '#335383FF',
                // light: '#EEEEEEFF'
            }
        }, (err, data) => {
            if (err) return console.error(err)
            setQr(data)
        })
    }

    useEffect(() => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get("token");
        setToken(token);
        const decodedData = parseJwt(token);
        setEmail(decodedData.email);
        GenerateQRCode(window.location.href);
    }, []);

    useEffect(() => {
        const decodedData = parseJwt(token);
        if (decodedData) {
            if (decodedData.email != email) {
                setButtonText("Send Link")
            } else {
                setButtonText("Enter Artiverse");
            }
        }
    }, [email]);

    return (
        <>
            <Head>
                <title>Welcome</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container maxWidth="sm">
                <Paper className="page">
                    <Typography className={styles.pageTitle} variant="pageTitle">Hey Arti !</Typography>
                    <TextField
                        name="tag"
                        value={tag}
                        placeholder="Future is now!"
                        InputProps={{ disableUnderline: true }}
                        variant="standard"
                        onChange={(e) => setTag(e.target.value)}
                        sx={{
                            '& input': {
                                fontSize: '1.8rem',
                                color: 'white',
                                textAlign: 'center',
                                marginTop: '0.5rem',
                                "&::placeholder": {
                                    color: "white",
                                    opacity: 0.7,
                                },
                            },
                        }}
                    />
                    <div className={styles.imgDiv}>
                        {qr && <img src={qr} style={{ width: '100%', height: 'auto', borderRadius: '1rem' }} />}
                    </div>
                    <div className="formDiv" >
                        <TextFieldBorders name="email" type="email" className={styles.inputEmail} placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <ButtonRound className={styles.sendButton} onClick={handleLogin}>{buttonText}</ButtonRound>
                    </div>
                </Paper>
            </Container>
        </>
    );
}
