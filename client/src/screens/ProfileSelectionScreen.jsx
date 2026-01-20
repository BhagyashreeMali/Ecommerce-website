import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileSelectionScreen({ user }) {
    const navigate = useNavigate();

    const profiles = user?.profiles || [];

    const handleSelectProfile = (profile) => {
        if (!profile.isAdd) {
            navigate('/home');
        }
    };

    return (
        <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl md:text-5xl font-normal mb-8 text-center">Who's watching?</h1>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {profiles.map(profile => (
                    <div
                        key={profile.id}
                        className="group flex flex-col items-center cursor-pointer w-24 md:w-32"
                        onClick={() => handleSelectProfile(profile)}
                    >
                        <div className={`w-24 h-24 md:w-32 md:h-32 rounded overflow-hidden border-2 border-transparent ${!profile.isAdd ? 'group-hover:border-white' : ''} mb-4 transition-all`}>
                            <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-gray-400 group-hover:text-white text-lg transition-colors">{profile.name}</span>
                    </div>
                ))}
            </div>

            <button className="mt-12 border border-gray-400 text-gray-400 px-6 py-2 tracking-widest uppercase hover:text-white hover:border-white transition">
                Manage Profiles
            </button>
        </div>
    );
}

export default ProfileSelectionScreen;
