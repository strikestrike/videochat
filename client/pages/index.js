import Head from "next/head";
import { useRouter } from 'next/navigation';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import styles from '@/styles/Home.module.css'
import { TextFieldBorders } from "@/components/TextFieldBorders"
import { ButtonRound } from "@/components/ButtonRound"
import CustomCard from "@/components/CustomCard"

export default function Home() {
  const router = useRouter();

  const handleSendLink = (event) => {
    router.push('/login');
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
          <div className="avatarDiv" style={{ marginTop: '3rem', marginBottom: '4.5rem' }}>
            <div className="box">
              <CustomCard
                preview="https://i.pravatar.cc/300"
                overlayText="Dany Wild"
                width="7rem"
                height="7rem"
              />
              <CustomCard
                preview="https://i.pravatar.cc/300"
                overlayText="Dany Wild"
                width="7rem"
                height="7rem"
              />
              <CustomCard
                preview="https://i.pravatar.cc/300"
                overlayText="Dany Wild"
                width="7rem"
                height="7rem"
              />
              <CustomCard
                preview="https://i.pravatar.cc/300"
                overlayText="Dany Wild"
                width="7rem"
                height="7rem"
              />
              <CustomCard
                preview="https://i.pravatar.cc/300"
                overlayText="Dany Wild"
                width="7rem"
                height="7rem"
              />
              <CustomCard
                preview="https://i.pravatar.cc/300"
                overlayText="Dany Wild"
                width="7rem"
                height="7rem"
              />
            </div>
          </div>
          <div className="formDiv" >
            <TextFieldBorders name="email" type="email" className={styles.inputEmail} placeholder="Your Email" />
            <ButtonRound className={styles.sendButton} onClick={handleSendLink} >Send Link</ButtonRound>
          </div>
        </Paper>
      </Container>
    </>
  );
}
