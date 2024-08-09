import React from "react";
import { Box, Heading, Container } from '@chakra-ui/react';
import VideoPlayer from "./components/VideoPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options"
import Transcription from "./components/Transcription";
const VideoChat = () => {
  return (
    <Box>
      <Container maxW="1200px" mt="8">
        <Heading as="h2" size="2xl"> Video Chat App </Heading>
        <VideoPlayer />
        <Options />
        <Notifications />
      </Container>

    </Box>
  )
}

export default VideoChat 