const mongoDB = require('../components/mongoDB');
const User = require('../components/models/Users');
const { registeredSchema } = require('../dataValidation');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const {
        name,
        email,
        password,
    } = req.body;

    if(!password){
        res.status(400).send('Undefined password!')
    }
    const encryptPass = await bcrypt.hash(password, 10);

    const user = new User({
            name: name,
            email: email,
            password: String(encryptPass)
    });

    try {
        const {error} = registeredSchema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const emailExists = await User.findOne({
            email: email
        });

        if(!emailExists) {
            const addUser = await user.save();
            res.send(addUser);
        } 
        res.status(400).send('Email already registered!');

    } catch (err) {
        res.status(400);
        console.log(err);
    }
};