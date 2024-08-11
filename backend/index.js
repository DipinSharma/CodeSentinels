import express from 'express';
import { mongoDB } from './config/dbConnect.js';
import cors from "cors";
import { config } from 'dotenv';
import userRoutes from './routes/userRouter.js';
import consultationRoutes from './routes/consultationRouter.js';
import detailsRouter from './routes/detailsRouter.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import paymentRoutes from './routes/paymentRouter.js';
import { Client, Environment } from 'square';
import bookedRouter from './routes/bookingRoute.js';

config({ path: './.env' });

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: "http://localhost:3000",  // Adjust this to match your frontend URL
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const client = new Client({
  environment: Environment.Sandbox, 
  accessToken: process.env.SANDBOX_ACCESS_TOKEN,
});   
export const paymentsApi = client.paymentsApi;

mongoDB();

// Routes
app.use("/user", userRoutes);
app.use('/consultation', consultationRoutes);
app.use('/details', detailsRouter);
app.use('/payments',paymentRoutes)
app.use('/booking',bookedRouter)
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

global.bookings=new Map();




io.on("connection", (socket) => {
  socket.on("add-doctor",(userEmail) =>{
    // let obj={

    // }
    bookings.set(userEmail,socket.id)
    
  })
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });
// session ID-->userToCall
// name->userId
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    let id=bookings.get(userToCall)
    io.to(id).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
