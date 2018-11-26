import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            url: '',
            isOpen: false,
            error: ''
        }
    }

    onSubmit(e) {
        const name = this.state.name;
        const url = this.state.url;

        e.preventDefault();

        Meteor.call('links.insert', name, url, (err, res) => {
            if(!err){
                this.handleModalClose();
            } else {
                this.setState({ error: err.reason })
            }
        });  
        
    }

    onChangeName(e){
        this.setState({ name: e.target.value })
    }

    onChangeUrl(e) {
        this.setState({ url: e.target.value.trim() })
    }

    handleModalClose() {
        this.setState({ 
            name: '',
            url: '', 
            isOpen: false, 
            error: '' 
        });
    };

    render() {
        return (
            <div>
                <button className="button button--action" onClick={() => this.setState({ isOpen: true })}>
                    + Add Link
                </button>

                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel="Add link" 
                    ariaHideApp={false}
                    onAfterOpen={() => { this.refs.name.focus() }}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="boxed-view__container"
                    overlayClassName="boxed-view boxed-view--modal">
                    <div className={"boxed-view__error-box boxed-view__error-box--" + (this.state.error ? 'show' : 'hide' )}>
                        {this.state.error ? <p>{this.state.error}</p> : undefined}
                    </div>
                    <div className="boxed-view__box">
                        <h1>Add Link</h1>
                        <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                            <input 
                                type="text" 
                                ref="name"
                                placeholder="Name"
                                value={this.state.name}
                                onChange={this.onChangeName.bind(this)}/>
                            <input 
                                type="text"
                                ref="url"
                                placeholder="URL" 
                                value={this.state.url}
                                onChange={this.onChangeUrl.bind(this)} />
                            <button className="button">Add Link</button>
                            <button className="button button--secondary" type="button"  onClick={this.handleModalClose.bind(this)}>
                            Cancel
                        </button>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}