import express from 'express';
import User from '../models/user.js';
const router = express.Router();

router.post('/signup', async (req, res) => {
    try{
        const { fullname, email, mobile, role, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
        fullname,
        email,
        mobile,
        role,
        password,
        });

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/profile', async (req, res) => {
    try{
        const {email} = req.query
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not exist.' });
        }
        user = {
            fullname: user.fullname,
            email: user.email,
            mobile: user.mobile,
            website: user.website
        }
        res.status(201).json(user);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.put('/update/profile', async (req, res) => {
    try{
        const updates = req.body;
        const updatedUser = await User.findOneAndUpdate({email: updates.email}, updates);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(201).json(updatedUser);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;
