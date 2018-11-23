import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'; 
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/links'; 
import LinkListItem from './LinkListItem';

export default class LinksList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            links: []
        };
    }

    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({ links });
        });
    }

    componentWillUnmount() {
        this.linksTracker.stop();
    }
    
    renderLinksListItems = () => {
        if(this.state.links.length === 0){
            return (
                <div className="notification">
                    <h1 className="notification__header notification__header--neutral">No links found</h1>
                    <p className="notification__message notification__message--neutral">Please add a link with the 'Add Link' action.</p>
                </div>
            );
        }

        return this.state.links.map((link) => { 
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinkListItem key={link._id} {...link} shortUrl={shortUrl} />;
        });
    }

    render() {
        return (
            <div>
                <FlipMove className="item-wrapper" maintainContainerHeight={false}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        );
    }
}