// const mongoose = require('mongoose');

// const User = new mongoose.Schema({
//     userName: { type: String, required: true},
//     email: { type: String, required: true},
//     password: { type: String, required: true},
//     // DOB: { type: Date, required: true},
//     // Upvotes {type: Numbers, required: true},
// }, {
//     toObject: {
//         virtuals: true
//     }
// })

// module.exports = mongoose.model('models', User);


const {Schema, model} = require ('mongoose');


let user = new Schema ({
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false}
}, {
    toObject: {
        virtuals: true
    }
});

user.statics.findUser = async function(body) {
    let user = await this.findOne({userName: body.userName});
    
    if (!user) {
        return false;
    }

    if (user.password != body.password) {
        return false;
    }

    return user;

    console.log(user);
    console.log(this);
}

module.exports = model('models', user);
