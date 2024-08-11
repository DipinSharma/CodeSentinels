import React, { useState } from "react";
import { Box, Heading, Container } from '@chakra-ui/react';
import VideoPlayer from "./components/VideoPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options"
const VideoChat = () => {

  const [transcription, setTranscription] = useState([]);
  return (
    <Box>
      <Container maxW="1200px" mt="8">
        <Heading as="h2" size="2xl"> Video Chat App </Heading>
        <VideoPlayer transcription={transcription} setTranscription={setTranscription} />
        <Options transcription={transcription}/>
        <Notifications />
      </Container>

    </Box>
  )
}

export default VideoChat