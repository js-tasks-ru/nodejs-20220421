const mongoose = require('mongoose');

async function main() {
    const schema = new mongoose.Schema({
        name: {
            type: String,
        },
        email: {
            type: String,
            index: true,
        },
        gender: {
            type: String,
            enum: ['f', 'm']
        }
    });
    const User = mongoose.model('User', schema);

    await mongoose.connect('mongodb://127.0.0.1:27017/nodejs-20200114');

    // await User.create({
    //     name: 'Maria',
    //     email: 'maria@mail.com',
    //     gender: 'f',
    // });

    const user = await User.findOne({ name: "Sergey" });

    // delete user.name;
    user.name = undefined;

    await user.save();

    // console.log(results);
}

// nosql

main();


// movie

// tvseries

const imageSchema = new mongoose.Schema({
    url: String,
    type: {
        type: String,
        enum: ['poster_v', 'poster_h'],
    }
});

// const Image = mongoose.model('Image', imageSchema);

const movieSchema = new mongoose.Schema({
    // ..
    images: [{
        type: mongoose.schema.Types.ObjectId,
        ref: 'Image',
    }]
});

const tvseriesSchema = new mongoose.Schema({
    // ...
    images: [imageSchema]
});