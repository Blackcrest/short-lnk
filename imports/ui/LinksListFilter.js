import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker'; 

export default class LinksListFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showVisible: false
        }
    }

    componentDidMount() {
        this.checkboxTracker = Tracker.autorun(() => {
            this.setState({
                showVisible: Session.get('showVisible')
            })
        });

        console.log(Session.get('showVisible'))
    }

    componentWillUnmount() {
        this.checkboxTracker.stop();
    }

    checkboxClick(e) {
        Session.set('showVisible', this.refs.trackCheckbox.checked);
    }

    render() {
        return (
            <div className="checkbox" onClick={this.checkboxClick.bind(this)}>
                <input
                    className="checkbox__input" 
                    ref="trackCheckbox"
                    type="checkbox"
                    checked={!this.state.showVisible}
                    disabled/>
                <span className="checkbox__label" >
                    Show private links
                </span>          
            </div>
        );
    }
}