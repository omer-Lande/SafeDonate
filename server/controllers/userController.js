const User = require('../models/userModel.js'); // Assuming userModel.js exports the User model
const jwt = require('jsonwebtoken');
const cookie = require('cookie');


const createToken = (id) => {
  return jwt.sign({ id }, process.env.jwtSecret, { expiresIn: '2h' });
}

// verify token validity
module.exports.verifyToken = async function verifyToken(req, res) {

  const token = req.body.token;
  let decoded;
  try{
    decoded = jwt.verify(token, process.env.jwtSecret);
    //res.status(200).send({data: decoded}); 
    //res.json({ message: 'Token is valid' });
  }catch(e){
    res.status(401).json({ message: 'Token is not valid' });
  }

  // get user info
  try {
    const user = await User.findById(decoded.id);
    
    if (!user) return res.status(404).send({ message: 'user not found' });
    return res.status(200).send(user);   

  } catch (error) {
    console.error(error.message);   

    res.status(500).send({ message: error.message });
  }
}

// Function to handle user signup
module.exports.signup = async function signup(req, res) {
  try {
    const { email, password } = req.body;

    // Check for required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Send all required fields: name and password' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is unavailable' });
    }

    // Create new user
    const newUser = await User.create({ email, password });

    const token = createToken(newUser._id);
    res.cookie("userData", token, {httpOnly: true, maxAge:3*24*60*60});  // Set JWT as an HTTP-only cookie (before sending response)

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, { httpOnly: false, maxAge: 60 * 60 })
    );
    console.log("Succesful signup");
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error in user signup:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Function to handle user login
module.exports.login = async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Check for required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Send all required fields: name and password' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email, password });
    if (!existingUser) {
      return res.status(400).json({ message: 'User Not exists' });
    }

    // Create JWT
    const token = createToken(existingUser._id);
    res.cookie("userData", token, {httpOnly: true, maxAge:3*24*60*60});  // Set JWT as an HTTP-only cookie (before sending response)

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, { httpOnly: false, maxAge: 60 * 60 })
    );
    console.log("Succesful login");
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error in user registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Function to get all users
module.exports.getAllUsers = async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    return res.status(200).json({ count: users.length, data: users });
  } catch (error) {
    console.error(error.message);   

    res.status(500).send({ message: error.message   
 });
  }
}

// Function to get a specific user by ID
module.exports.getUserById = async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) return res.status(404).send({ message: 'user not found' });
    return res.status(200).send(user);   

  } catch (error) {
    console.error(error.message);   

    res.status(500).send({ message: error.message });
  }
}

// Function to update and add a user favorites assocoation
module.exports.addUserFavorite = async function addUserFavorite(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if(!req.body.Association){
        return res.json({ message: 'Send all required fields' });
    }
    
    user.Association.push(req.body.Association);

    const result = await User.findByIdAndUpdate(req.params.id, user);

    if (!result) {
      return res.status(404).send({ message: 'User not found' });
    }

    return res.status(200).send({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
}

// Function to update and remove a user favorites assocoation
module.exports.removeUserFavorite = async function removeUserFavorite(req, res) {
    try {
      const { id } = req.params;
  
      // Validate existence of assos in request body
      if(!req.body.Association){
        return res.json({ message: 'Send all required fields' });
    }
  
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      // Update Association array using filter
      user.Association = user.Association.filter((existingAssos) => existingAssos !== req.body.Association);
      user.Association = user.Association.filter(association => association !== null);
  
      user.save();  // Save changes to database
  
      return res.status(200).send({ message: 'User association removed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  };


  // Function to existence of a user favorite assocoation in the list
module.exports.existUserFavorite = async function existUserFavorite(req, res) {
    try {
      const { id } = req.params;
      const association = req.body.Association;
        
      // Validate existence of assos in request body
      if(!association){
        return res.send({ message: 'Send all required fields' });
    }
  
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      if (user.Association.includes(association)){
        return res.status(200).send(true);
      }
      else {
        return res.status(200).send(false);
      }
      

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  };
  