import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
    
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not exist.' });
        }

        if(user.password !== password){
            return res.status(401).json({ message: 'Password is wrong.' });
        }

        const userData = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        res.cookie('EthSkillVerifyData', userData, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ message: 'Login successful!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;
