import React from 'react';

import AddLink from './AddLink';
import LinksListFilters from './LinksListFilter';

export default class ActionBar extends React.Component {
    render(){
        return(
            <div className="action-bar">
                <div className="action-bar__content">
                    <AddLink />
                    <LinksListFilters />
                </div>
            </div>
        )
    }
}