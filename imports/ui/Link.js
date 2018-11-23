import React from 'react';

import PrivateHeader from './PrivateHeader';
import ActionBar from './ActionBar';
import LinksList from './LinksList';

export default () => {
    return (
        <div>
            <PrivateHeader title="Short Lnk" />
            <ActionBar />
            <div className="page-content">
                <LinksList /> 
            </div>
        </div>
    );
};