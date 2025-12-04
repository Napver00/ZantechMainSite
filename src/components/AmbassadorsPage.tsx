import React from 'react';
import CampusAmbassadors from './CampusAmbassadors';

const AmbassadorsPage = () => {
    return (
        <div className="bg-zan-light dark:bg-zan-dark min-h-screen">
            {/* Wrapper to ensure full screen background and correct spacing if needed */}
            <div className="pt-20">
                <CampusAmbassadors />
            </div>
        </div>
    );
};

export default AmbassadorsPage;