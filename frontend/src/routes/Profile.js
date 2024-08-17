import React, { useState, useEffect } from 'react';
import Expert from './ExpertProfile';
import SkillHolder from './SkillHolder';
import { useCookies } from 'react-cookie';
import Admin from './Admin';
import SignIn from './Signin';

const Profile = () => {
    const [cookies] = useCookies(['EthSkillVerifyData']);
    const [profile, setProfile] = useState('');

    const renderComponent = () => {
        switch (profile) {
            case 'expert':
                return <Expert />;
            case 'skillHolder':
                return <SkillHolder />;
            case 'admin':
                return <Admin />;
            default:
                return <SignIn />;
        }
    };

    useEffect(() => {
        const userData = cookies.EthSkillVerifyData;
        if (userData) {
            try {
                setProfile(userData.role);
            } catch (e) {
                console.error('Error parsing user data:', e);
            }
        }
    }, [cookies.EthSkillVerifyData]);

    return (
        <>
            {renderComponent()}
        </>
    );
};

export default Profile;
