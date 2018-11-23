import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker'; 

export default class LinksListFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showVisible: true
        }
    }

    componentDidMount() {
        this.checkboxTracker = Tracker.autorun(() => {
            this.setState({
                showVisible: Session.get('showVisible')
            })
        });
    }

    componentWillUnmount() {
        this.checkboxTracker.stop();
    }

    render() {
        return (
            <div>
                <label className="checkbox" >
                    <input
                        className="checkbox__box" 
                        type="checkbox" 
                        onChange={(e) => { Session.set('showVisible', !e.target.checked);}}
                        checked={!this.state.showVisible}/>
                    show hidden links
                </label>          
            </div>
        );
    }
}