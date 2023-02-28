import Head from "next/head";
import * as React from 'react';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import styles from '@/styles/Room.module.css'
import CustomCard from "@/components/CustomCard"
import UserArea from "@/components/UserArea";
import CircularProgressWithLabel from "@/components/CircularProgressWithLabel";

export default function Home() {
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // const timer = setInterval(() => {
        //     setProgress((progress + 10) => (progress >= 100 ? 0 : progress + 10));
        // }, 2000);
        // if (progress > 100) {
        //     clearInterval(timer);
        // }
    }, []);

    return (
        <>
            <Head>
                <title>Room</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container maxWidth="sm">
                <Paper className={styles.page}>
                    <div className={styles.top}>
                        <UserArea />
                    </div>
                    <div className={styles.middle}>
                        <div style={{
                            position: 'absolute',
                            top: '0',
                            bottom: '0',
                            left: '0',
                            right: '0',
                            margin: `auto`,
                            color: 'white',
                            width:'fit-content',
                            height:'fit-content',
                            display: progress > 100 ? 'none' : 'block'
                        }}>
                            <CircularProgressWithLabel
                                value={progress}
                                size="4rem"
                                textColor="white"
                                style={{
                                    color: 'white',
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <div className="box">
                            <CustomCard
                                preview="https://i.pravatar.cc/300"
                                overlayText="Dany Wild"
                                width="5rem"
                                height="6rem"
                            />
                            <CustomCard
                                preview="https://i.pravatar.cc/300"
                                overlayText="Dany Wild"
                                width="5rem"
                                height="6rem"
                            />
                            <CustomCard
                                preview="https://i.pravatar.cc/300"
                                overlayText="Dany Wild"
                                width="5rem"
                                height="6rem"
                            />
                            <CustomCard
                                preview="https://i.pravatar.cc/300"
                                overlayText="Dany Wild"
                                width="5rem"
                                height="6rem"
                            />
                            <CustomCard
                                preview="https://i.pravatar.cc/300"
                                overlayText="Dany Wild"
                                width="5rem"
                                height="6rem"
                            />
                            <CustomCard
                                preview="https://i.pravatar.cc/300"
                                overlayText="Dany Wild"
                                width="5rem"
                                height="6rem"
                            />
                        </div>
                    </div>
                </Paper>
            </Container>
        </>
    );
}
