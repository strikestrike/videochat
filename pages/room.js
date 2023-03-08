import Head from "next/head";
import React, { useEffect, useState, useContext, useRef } from 'react'
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import styles from '@/styles/Room.module.css'
import CustomCard from "@/components/CustomCard"
import UserArea from "@/components/UserArea";
import CircularProgressWithLabel from "@/components/CircularProgressWithLabel";
import { SocketContext } from "@/lib/SocketContext";
import VideoPlayer from "@/components/VideoPlayer";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { sendMessage, socket, callUser, userInfo, me, setMe, callAccepted, callEnded, leaveCall } = useContext(SocketContext);
    const [progress, setProgress] = useState(0);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        socket.emit("joinRound", userInfo);

        socket.on('me', (data) => {
            console.log('client setMe: ', data);
            setMe(data);
            setProgress(0);
        });

        socket.on('onlineUsers', (data) => {
            setOnlineUsers(data);
        });

        socket.on('progressChanged', (data) => {
            console.log('client progressChanged ' + data);
            setProgress(data);
            if (data > 50) {
                leaveCall();
            }
        });

        socket.on('callEnded', (data) => {
            console.log('client callEnded ' + data);
            router.back();
        });

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
                            bottom: callAccepted && !callEnded ? '0' : 'auto',
                            display: callAccepted && !callEnded ? 'block' : 'none',
                            color: 'grey',
                            width: 'fit-content',
                            height: 'fit-content',
                            zIndex: 10,
                        }}>
                            <CircularProgressWithLabel
                                value={progress}
                                size="4rem"
                            />
                        </div>
                        <VideoPlayer />
                    </div>
                    <div className={styles.bottom}>
                        <div className="box">
                            {onlineUsers.map((row) => {
                                if (userInfo.userId != row.userId) {
                                    return (
                                        <CustomCard
                                            key={row.userId}
                                            preview={row.image}
                                            overlayText={row.username}
                                            userInfo={row}
                                            width="5rem"
                                            height="6rem"
                                        />
                                    );
                                }
                            }
                            )}
                        </div>
                    </div>
                </Paper>
            </Container>
        </>
    );
}
