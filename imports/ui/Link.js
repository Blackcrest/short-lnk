import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import LinksListFilters from './LinksListFilter';
import AddLink from './AddLink';

export default () => {
    return (
        <div>
            <PrivateHeader title="Short Lnk" />
            <div class="page-content">
                <LinksListFilters />
                <AddLink />
                <LinksList /> 
            </div>
        </div>
    );
};