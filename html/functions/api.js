const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const User = require('../dist/models/User');
const cors = require('cors')
const serverless = require('serverless-http');
const router = express.Router();
const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("dist"));

mongoose.connect('mongodb+srv://tejash835274:aditya%401841@aditya.xp2wufc.mongodb.net/forms', {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/', (req,res) => {
    res.send("Hello");
});

router.post('/check', async (req, res) => {
    const response = await User.find();
    if (!response) {
        throw new Error('Network response was not ok');
    }
    res.json(response);
});

router.post('/', async (req, res) => {
    const data = req.body;
    console.log(data);
    const info = new User({
        name: data.Fullname,
        email: data.Email,
        contact_no: data.Contact_no,
        subject: data.Subject,
        message: data.Message,
    });
    try {
        await info.save();
        console.log('User saved successfully');
        res.send({ status: 1, data });
    } catch (err) {
        console.error('Error saving to database:', err);
        res.status(500).send({ status: 0 });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);