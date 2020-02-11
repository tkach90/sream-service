import React from "react";
import { connect } from 'react-redux';
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                client_id: '792673538150-ih709ds1tfthdmu5bc6ojbk1a6vj68oi.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
               this.auth = window.gapi.auth2.getAuthInstance();
               this.setState({ isSignedIn: this.auth.isSignedIn.get() });
               this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button
                    className='ui red google button'
                    onClick={this.onSignOutClick}
                >
                    <i className='google icon'/>
                    Sign out
                </button>
            );
        } else {
            return (
                <button
                    className='ui blue google button'
                    onClick={this.onSignInClick}
                >
                    <i className='google icon'/>
                    Sign in
                </button>
            );
        }
    }

    render() {
        return <div> {this.renderAuthButton()} </div>;
    }
}

export default connect(
    null,
    { signIn, signOut }
)(GoogleAuth);
