import mongoose from "mongoose";

class ContactSchema extends mongoose.Schema {
    constructor() {
        super({
            email: {
                type: String,
                default: null,
                index: true
            },
            phoneNumber: {
                type: String,
                default: null,
                index: true
            },
            linkedId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Contact',
                default: null
            },
            linkPrecedence: {
                type: String,
                enum: ['primary', 'secondary'],
                default: "primary"

            },
        } , { timestamps: true });
    }
}

export default mongoose.model('Contact', new ContactSchema());