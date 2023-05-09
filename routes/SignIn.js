const mongoDB = require('../components/mongoDB');
const User = require('../components/models/Users');
const { loginSchema } = require('../dataValidation');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const {
        email,
        password,
    } = req.body;

    try {
        const {error} = loginSchema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const userInDB = await User.findOne({
            email: email
        });
        if(!userInDB) return res.status(400).send('Email not registered!');

        const validPass = await bcrypt.compare(password, userInDB.password);
        if(!validPass) return res.status(401).send('Invalid password!');

        res.status(200).send('SignIn!')
    } catch (err) {
        res.status(400);
        console.log(err);
    }
};