import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client'; // Import io from socket.io-client
import Peer from 'simple-peer';
import { useStateProvider } from './context/stateContext';

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
    const [{ videoCall, userType, userInfo, socket }, dispatch] = useStateProvider(); // Use socket from context
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState(null);
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const myVideo = useRef(null);
    const userVideo = useRef(null);
    const connectionRef = useRef(null);

    // Ensure socket is initialized and dispatched
    useEffect(() => {
        if (!socket) {
            const socketInstance = io('http://localhost:5000'); // Initialize socket
            dispatch({
                type: "set_socket",
                payload: socketInstance
            });
        }
    }, [dispatch, socket]);

    useEffect(() => {
        if (socket) {
            // Request access to video and audio stream
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((currentStream) => {
                    setStream(currentStream);

                    if (myVideo.current) {
                        myVideo.current.srcObject = currentStream;
                    }
                })
                .catch((error) => {
                    console.error('Error accessing media devices.', error);
                });

            socket.on('connect', () => {
                console.log('Connected to socket server with ID:', socket.id);
            });

            socket.on('me', (id) => setMe(id));

            socket.on('callUser', ({ from, name: callerName, signal }) => {
                console.log('Incoming call from:', callerName);
                setCall({ isReceivingCall: true, from, name: callerName, signal });
            });
        }
    }, [socket]);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = currentStream;
            }
        });

        peer.signal(call.signal);
        connectionRef.current = peer;
    };

    const callUser = () => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        // Define booking and replace booking.doctorEmail with an actual email or a variable that holds the email
        const doctorEmail = "doctor@example.com"; // Replace with actual doctor email

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: doctorEmail, signalData: data, from: me, name });
        });

        peer.on('stream', (currentStream) => {
            if (userVideo.current) {
                userVideo.current.srcObject = currentStream;
            }
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    };

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
        }}>
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
