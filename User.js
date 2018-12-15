var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    root: { type: Boolean, default: false },
    address: String,
    company: String,
    status: { type: Boolean, default: true },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    payments: [{
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    }],
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() }
});


module.exports = mongoose.model('User', UserSchema);