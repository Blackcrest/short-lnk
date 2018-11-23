import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinkListItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            justCopied: false
        }
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success', () => {
            this.setState({justCopied: true})

            setTimeout(() => this.setState({justCopied: false}), 1000)
        }).on('error', () => {
            console.log('copy failed!!!')
        })
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    renderStats() {
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits' 
        let visitedMessage = null;

        if(typeof this.props.lastVisitedAt === 'number'){
            visitedMessage = `(visited ${ moment(this.props.lastVisitedAt).fromNow() })`
        }

        return <p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
    }

    render() {
        return(
            <div className="item">
                <div className="item__content">
                    <h1>{this.props.name}</h1>
                </div>
                <div className="item__actions">
                    <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">
                        Visit
                    </a>
                    <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
                        {this.state.justCopied ? 'Copied' : 'Copy' }
                    </button>
                    <button className="button button--pill" onClick={() => {
                        Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
                    }}>
                        {this.props.visible ? "Hide" : "Unhide"}
                    </button>
                </div>
            </div>
        )
    };
};

LinkListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number,
    name: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired
}