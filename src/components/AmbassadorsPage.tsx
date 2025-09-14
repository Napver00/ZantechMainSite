import React from 'react';
import CampusAmbassadors from './CampusAmbassadors';

const AmbassadorsPage = () => {
    return (
        // Add top padding to account for the fixed navbar
        <div className="pt-24 bg-gray-50 dark:bg-gray-800">
            <CampusAmbassadors />
        </div>
    );
};

export default AmbassadorsPage;