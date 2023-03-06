// const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const userRoutes = require('./routes/userRoutes');
// const dotenv = require('dotenv')
// const app = express();

// // Connect to database
// //mongoose.connect('MONGODB_URI', { useNewUrlParser: true });
// // mongoose.connect(process.env.MONGO_URL)
// // .then(()=>console.log("DB connection is successful"))
// // .catch((err)=>console.log(err));
// // Configure session
// app.use(session({
//   secret: 'mysecret',
//   resave: false,
//   saveUninitialized: false
// }));
// dotenv.config()
// // Parse JSON
// app.use(express.json());

// // Register user routes
// app.use('/users', userRoutes);

// // // Start server
// // app.listen(3000, () => console.log('Server started'));



// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true
    
// })

//     .then(() => console.log("MongoDb is connected"))
//     .catch(err => console.log(err))





// app.listen(process.env.PORT || 3000, function () {
//     console.log('Express app running on port ' + (process.env.PORT || 3000))
// })

















const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const itineraryRoutes = require('./routes/itineraryRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Connect to database
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });

// // Configure session
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true
// }));




mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
    
})

    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


// Parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// Register routes
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/auth', authRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
