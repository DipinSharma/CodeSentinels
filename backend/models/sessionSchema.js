import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        required: true
    },
    docId: {
        type: String,
        required: true
    },
    startTime: Date,
    endTime: Date,
    day: {
        type: String,
        required: true
    }
});

export const SessionModel = mongoose.model('session', sessionSchema);