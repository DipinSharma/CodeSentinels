import React from "react";
import { Box, Heading, Container } from '@chakra-ui/react';
import VideoPlayer from "./components/VideoPlayer";
import Notifications from "./components/Notifications";
import Options from "./components/Options"
import Transcription from "./components/Transcription";
import { useStateProvider } from "../../context/stateContext";
const VideoChat = () => {
  const [{userType,socket,userInfo},dispatch]=useStateProvider()
  if(userType=="doctor"){
    socket.emit("add-doctor",userInfo.email);
}

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