import React, { createContext, useState, useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import url from '@/lib/url'

const SocketContext = createContext();

const socket = io(url.server);

const ContextProvider = ({ children }) => {
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        socket.on('matchUser', (data) => {
            console.log('client matchUser ' + data + ', me: ' + me);
            setUserInfo(data);
        });

        socket.on('calluser', ({ from, name: callerName, signal }) => {
            console.log('client calluser ', { from, callerName });
            setCall({ isReceivedCall: true, from, name: callerName, signal });
        });

        socket.on('callEnded', (data) => {
            console.log('client callEnded call' + call.from + ", " + call.name);
            if (call.from == data) {
                setCallEnded(true);
                connectionRef.current.destroy();
            }
        });
    }, []);

    useEffect(() => {
        if (call.isReceivedCall && !callAccepted) {
            answerCall();
        }
    }, [call, callAccepted]);

    useEffect(() => {
        console.log('--- before callUser userInfo=', userInfo, ', me: ', me);
        if (me) {
            callUser(userInfo.matchedSocketId);
        }
    }, [userInfo]);


    const answerCall = () => {
        setCallAccepted(true);
        console.log("answerCall", call);
        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            console.log("answerCall signal call.from=", call.from);
            socket.emit('answercall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            console.log("answerCall stream", currentStream);
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            console.log('client callUser signal:', me);
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name: userInfo.username });
        });

        peer.on('stream', (currentStream) => {
            console.log("callUser stream", currentStream);
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callaccepted', (signal) => {
            console.log('callaccepted', signal);
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();
        setMe('');

        // window.location.reload();
        router.back();
    }

    const sendMessage = (val) => {
        socket.emit('sendMessage', val);
    }

    return (
        <SocketContext.Provider value={{ token, setToken, socket, call, callAccepted, callEnded, stream, myVideo, userVideo, userInfo, setUserInfo, me, setMe, callUser, leaveCall, answerCall, sendMessage, stream, setStream }}>
            {children}
        </SocketContext.Provider>
    );
}

export { ContextProvider, SocketContext };