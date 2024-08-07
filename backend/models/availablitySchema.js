import {mongoose,Schema} from "mongoose";

const AvailabilitySchema = new mongoose.Schema({
    time_slots: [{
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
        "date": {
            type: Schema.Types.Date,
            required: true
        }
    }]
});

export const AvailabilityModel = mongoose.model('availability', AvailabilitySchema);
