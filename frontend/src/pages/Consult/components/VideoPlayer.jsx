import React, { useContext, useEffect, useRef, useState } from "react";
import { Grid, Box, Heading } from "@chakra-ui/react";
import { SocketContext } from "../../../Context";

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

    const [transcription, setTranscription] = useState([]);
    const myAudioRef = useRef(null);
    const userAudioRef = useRef(null);

    useEffect(() => {
        console.log("Stream:", stream);
        if (stream && myVideo.current) {
            myVideo.current.srcObject = stream;

            // Extract audio from my video stream
            const myAudioStream = new MediaStream([stream.getAudioTracks()[0]]);
            myAudioRef.current = myAudioStream;

            startTranscription(myAudioStream, "Patient");
        }
    }, [stream]);

    useEffect(() => {
        if (callAccepted && !callEnded && userVideo.current && userVideo.current.srcObject) {
            // Extract audio from user's video stream
            const userAudioStream = new MediaStream([userVideo.current.srcObject.getAudioTracks()[0]]);
            userAudioRef.current = userAudioStream;

            startTranscription(userAudioStream, "Doctor");
        }
    }, [callAccepted, callEnded]);

    const startTranscription = (audioStream, speaker) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error('Web Speech API is not supported in this browser.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.interimResults = true;

        recognition.start();

        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                transcript += event.results[i][0].transcript;
            }
            setTranscription((prevTranscription) => [
                ...prevTranscription,
                `${speaker}: ${transcript}`,
            ]);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error detected: ' + event.error);
        };

        recognition.onend = () => {
            console.log('Speech recognition service disconnected');
        };
    };

    return (
        <Box>
            <Grid justifyContent="center" templateColumns='repeat(2, 1fr)' mt="12" gap={6}>
                {/* My video */}
                {stream && (
                    <Box>
                        <Heading as="h5">
                            {name || 'My Name'}
                        </Heading>
                        <video playsInline muted ref={myVideo} autoPlay width="600" />
                    </Box>
                )}
                {/* User's video */}
                {callAccepted && !callEnded && (
                    <Box>
                        <Heading as="h5">
                            {call.name || 'User Name'}
                        </Heading>
                        <video playsInline ref={userVideo} autoPlay width="600" />
                    </Box>
                )}
            </Grid>

            {/* Transcription Display */}
            <Box mt="8" p="4" borderWidth="1px" borderRadius="lg">
                <Heading as="h6" size="md" mb="4">
                    Live Transcription
                </Heading>
                {transcription.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </Box>
        </Box>
    );
};

export default VideoPlayer;
