import Head from "next/head";
import { useRouter } from 'next/navigation';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import styles from '@/styles/Home.module.css'
import { TextFieldBorders } from "@/components/TextFieldBorders"
import { ButtonRound } from "@/components/ButtonRound"
import React, { useState } from "react";
import url from '@/lib/url';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSendLink = async () => {
    try {
      const data = await fetch(`${url.server}/api/auth/sendLink`, {
        method: 'POST',
        body: 'email=' + email,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const jsonData = await data.json();
      window.location = jsonData.link;
    } catch (e) {
      console.error(e);
    }
  };

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
          <img alt="complex" src="/planet.png" style={{ width: '14rem', height: '14rem', marginTop: '2rem', marginBottom: '2rem' }} />
          <div className="formDiv" >
            <TextFieldBorders name="email" type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <ButtonRound className={styles.sendButton} onClick={handleSendLink} >Send Link</ButtonRound>
          </div>
        </Paper>
      </Container>
    </>
  );
}
