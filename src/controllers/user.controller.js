const User = require('../models/user.medel');


exports.createUser = async (req, res) => {
    try {
        const { name, email, password, scheduledTime } = req.body;

        // Ensure the scheduledTime is a valid date
        const date = new Date(scheduledTime);

        if (isNaN(date.getTime())) {
            return res.status(400).json({ message: 'Invalid scheduled time' });
        }

        const delay = date.getTime() - new Date().getTime();
        if (delay <= 0) {
            return res.status(400).json({ message: 'Scheduled time must be in the future' });
        }

        // Schedule user creation
        if (delay > 0) {
            setTimeout(async () => {
                try {
                    const newUser = new User({ name, email, password, scheduledTime });
                    await newUser.save();
                    console.log(`User created at ${date}:`, { name, email });
                } catch (error) {
                    console.error('Error creating user:', error.message);
                }
            }, delay);
        } else {
            console.log(`Scheduled time ${date} is in the past, skipping.`);
        }

        // Send response after scheduling user creation
        return res.status(200).json({ message: 'User creation scheduled', scheduledTime: date });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.selectUser = async (req , res)=> {
    try {
        const users = await User.find();
       return res.json(users);
    } catch (error) {
      return  res.status(500).json({ message: "Server Error", Error: error.message });
    }
}

exports.selectUserId = async (req ,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(404).json({message:'Not Found'});
        }
        const response = await User.findById(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({message:"Server Error", Error: error.message})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ message: 'User ID not provided' });
        }

        const { scheduledTime } = req.body;
        if (!scheduledTime) {
            return res.status(400).json({ message: 'Scheduled time is required' });
        }

        // Ensure the scheduledTime is a valid date
        const date = new Date(scheduledTime);

        if (isNaN(date.getTime())) {
            return res.status(400).json({ message: 'Invalid scheduled time' });
        }

        const delay = date.getTime() - new Date().getTime();
        if (delay <= 0) {
            return res.status(400).json({ message: 'Scheduled time must be in the future' });
        }

        // Schedule user deletion
        if (delay > 0) {
            setTimeout(async () => {
                try {
                    // Find user by ID and delete
                    const deletedUser = await User.findByIdAndDelete(id);
                    if (!deletedUser) {
                        console.log(`User with ID ${id} not found`);
                    } else {
                        console.log(`User with ID ${id} deleted at ${date}`);
                    }
                } catch (error) {
                    console.error('Error deleting user:', error.message);
                }
            }, delay);
        } else {
            console.log(`Scheduled time ${date} is in the past, skipping deletion.`);
        }

        return res.status(200).json({ message: 'User deletion scheduled', scheduledTime: date });
    } catch (err) {
        return res.status(500).json({ message: 'Server Error', error: err });
    }
};
//
//
// // Function to generate random user data
// const generateRandomUser = () => {
//     const timestamp = new Date().getTime();
//     return {
//         name: `User${timestamp}`,
//         email: `user${timestamp}@example.com`,
//         password: `password${timestamp}`
//     };
// };
//
// // Function to schedule user creation
// const scheduleUserCreation = (date) => {
//     const delay = date.getTime() - new Date().getTime();
//
//     if (delay > 0) {
//         setTimeout(async () => {
//             const userData = generateRandomUser();
//             try {
//                 const newUser = new User(userData);
//                 await newUser.save();
//                 console.log(`User created at ${date}:`, userData);
//             } catch (error) {
//                 console.error('Error creating user:', error.message);
//             }
//         }, delay);
//     } else {
//         console.log(`Scheduled time ${date} is in the past, skipping.`);
//     }
// };
//
// // Define specific dates and times for user creation
// const scheduledDates = [
//     new Date('2024-05-22T15:21:00'), // Example date: May 22, 2024 at 10:00 AM
//     new Date('2024-05-22T15:21:10'), // Example date: May 22, 2024 at 10:00 AM
//
// ];
//
// // Schedule user creation for each date
// scheduledDates.forEach(scheduleUserCreation);