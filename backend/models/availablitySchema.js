import {mongoose,Schema} from "mongoose";

const AvailabilitySchema = new mongoose.Schema({
    timeSlots: [{
        "start": {
            type: Schema.Types.Date,
            required: true
        },
        "end": {
            type: Schema.Types.Date,
            required: true
        },
        "booked": {
            type: Schema.Types.Boolean,
            default: false
        },
        "day": {
            type: Schema.Types.String,
            required: true
        }
    }]
});

export const AvailabilityModel = mongoose.model('availability', AvailabilitySchema);
