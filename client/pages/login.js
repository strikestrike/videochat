import { useEffect, useState } from 'react'
import Head from "next/head";
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode'
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import styles from '@/styles/Home.module.css'
import { TextFieldBorders } from "@/components/TextFieldBorders"
import { ButtonRound } from "@/components/ButtonRound"

export default function Home() {
    const router = useRouter();
    const [qr, setQr] = useState('')

    const handleLogin = (event) => {
        router.push('/room');
    };

    const GenerateQRCode = (url) => {
        QRCode.toDataURL(url, {
            width: 800,
            margin: 2,
            color: {
                // dark: '#335383FF',
                // light: '#EEEEEEFF'
            }
        }, (err, url) => {
            if (err) return console.error(err)
            console.log(url)
            setQr(url)
        })
    }

    useEffect(() => {
        GenerateQRCode('https://google.com');
    }, []);

    return (
        <>
            <Head>
                <title>Welcome</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container maxWidth="sm">
                <Paper className="page">
                    <Typography className={styles.pageTitle} variant="pageTitle">Hey Arti !</Typography>
                    <Typography className={styles.pageSubTitle} variant="pageSubTitle">Future is now!</Typography>
                    {qr && <img src={qr} style={{ width: '14rem', height: '14rem', marginTop: '2rem', borderRadius: '1rem' }} />}
                    <div className="formDiv" >
                        <TextFieldBorders name="email" type="email" className={styles.inputEmail} placeholder="Your Email" />
                        <ButtonRound className={styles.sendButton} onClick={handleLogin}>Send Link</ButtonRound>
                    </div>
                </Paper>
            </Container>
        </>
    );
}
