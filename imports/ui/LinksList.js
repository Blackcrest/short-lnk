import React from 'react';
import Modal from 'react-modal';
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
            links: [],
            isOpen: false,
            selectedItem: []
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
            return <LinkListItem 
                        key={link._id} 
                        {...link} 
                        shortUrl={shortUrl} 
                        statAction={(link) => this.handelModalOpen(link)} />;
        });
    }

    handelModalOpen(item) {
        console.log(item)
        this.setState({
            isOpen: true,
            selectedItem: item
        })
    }

    handleModalClose() {
        this.setState({ 
            isOpen: false, 
            selectedItem: [] 
        });
    };

    render() {
        return (
            <div>
                <FlipMove className="item-wrapper" maintainContainerHeight={false}>
                    {this.renderLinksListItems()}
                </FlipMove>
                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel="Item stat" 
                    ariaHideApp={false}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="boxed-view__container"
                    overlayClassName="boxed-view boxed-view--modal">
                    <div className="boxed-view__box boxed-view__box--large">
                        <h1>{this.state.selectedItem.name} Stats</h1>
                        <div className="stat-table">
                            <div className="stat-table__item">
                                <span className="stat-table__label">Url</span>
                                <span className="stat-table__value">{this.state.selectedItem.url}</span>
                            </div>
                            <div className="stat-table__item">
                                <span className="stat-table__label">Short url</span>
                                <span className="stat-table__value">{this.state.selectedItem.shortUrl}</span>
                            </div>
                            <div className="stat-table__item">
                                <span className="stat-table__label">Times visited</span>
                                <span className="stat-table__value">{this.state.selectedItem.visitedCount}</span>
                            </div>
                            <div className="stat-table__item">
                                <span className="stat-table__label">Last visit</span>
                                <span className="stat-table__value">{this.state.selectedItem.lastVisitedAt}</span>
                            </div>
                        </div>
                        <button className="button button--secondary" type="button"  onClick={this.handleModalClose.bind(this)}>
                            Close
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}