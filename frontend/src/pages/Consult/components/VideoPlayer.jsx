import React, { useContext, useEffect, useRef, useState } from "react";
import { Grid, Box, Heading } from "@chakra-ui/react";
import { SocketContext } from "../../../Context";

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

    const [transcription, setTranscription] = useState([]);
    const myAudioRef = useRef(null);
    const userAudioRef = useRef(null);

    useEffect(() => {
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

        // Attach audio stream to the recognition instance
        const audioContext = new AudioContext();
        const mediaStreamSource = audioContext.createMediaStreamSource(audioStream);
        const audioProcessor = audioContext.createScriptProcessor(1024, 1, 1);
        mediaStreamSource.connect(audioProcessor);
        audioProcessor.connect(audioContext.destination);

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
        <Grid justifyContent="center" templateColumns='repeat(2, 1fr)' mt="12">
            {/* my video */}
            {stream && (
                <Box>
                    <Grid colSpan={1}>
                        <Heading as="h5">
                            {name || 'Name'}
                        </Heading>
                        <video playsInline muted ref={myVideo} autoPlay width="600" />
                    </Grid>
                </Box>
            )}
            {/* user's video */}
            {callAccepted && !callEnded && (
                <Box>
                    <Grid colSpan={1}>
                        <Heading as="h5">
                            {call.name || 'Name'}
                        </Heading>
                        <video playsInline ref={userVideo} autoPlay width="600" />
                    </Grid>
                </Box>
            )}
            {/* Transcription Display */}
            <Box mt="8" p="4" borderWidth="1px" borderRadius="lg">
                <Heading as="h6" size="md" mb="4">
                    Live Transcription
                </Heading>
                {transcription.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </Box>
        </Grid>
    );
};

export default VideoPlayer;
