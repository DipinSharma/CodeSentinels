import express from 'express';
import { mongoDB } from './config/dbConnect.js';
import cors from "cors";
import { config } from 'dotenv';
import userRoutes from './routes/userRouter.js';
import consultationRoutes from './routes/consultationRouter.js';
import detailsRouter from './routes/detailsRouter.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

config({ path: './.env' });

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoDB();

// Routes
app.use("/user", userRoutes);
app.use('/consultation', consultationRoutes);
app.use('/details', detailsRouter);
app.use((req, res) => res.send("Invalid URL"));

// Create HTTP server and pass it to Socket.IO
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
