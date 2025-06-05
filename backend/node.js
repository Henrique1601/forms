const express = require('express');
const cors = require('cors');
const mongose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemon = require('nodemon');

//mongodb+srv://henriquebs1601:<db_password>@cluster0.ytlbu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const app = express();
app.use(cors());
app.use(express.json());


mongose.connect('mongodb+srv://henriquebs1601:1234@cluster0.ytlbu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongose.Schema({
  name: {
    type: String,
    required: true, // Ensures name is provided
    unique: true,   // Keeps the unique constraint
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongose.model('Form', userSchema);

app.post('/api/singup', async (req, res) => {
    const { name, lastName, email, password } = req.body;
  
    // Validate that name is provided
  if (!name || name.trim() === '') {
    return res.status(400).send('Name is required');
  }

    const hashePassword = await bcrypt.hash(password, 10);
    const user = new User({ name, lastName, email, password: hashePassword });
  try {
    await user.save();
    res.status(201).send('User created');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(400).send(error.message);
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid password');
  }
  res.status(200).send('Login successful');
});

app.listen(5000,() => console.log('Server running on port 5000'))

