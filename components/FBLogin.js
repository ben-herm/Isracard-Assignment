
import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

export class FBLoginButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            FacebookSigned: false
        };
    }

    //save to storage/relay prop changes to parent(App)/ create graph request to retrieve user data.
    
    getFaceBookUserData = async () => {
        AccessToken.getCurrentAccessToken().then(
            (data) => {
                let accessToken = data.accessToken;
                const responseInfoCallback = (error, result) => {
                    if (error) {
                        alert('Error fetching data: ' + error.toString());
                    } else {
                        this.props.onFaceBookLogin(this.state.FacebookSigned)
                        this.setState({
                            FacebookSigned: true,
                          });
                        AsyncStorage.setItem('name', result.name)
                        AsyncStorage.setItem('image', result.picture.data.url)
                    }
                }
                const infoRequest = new GraphRequest(
                    '/me',
                    {
                        accessToken: accessToken,
                        parameters: {
                            fields: {
                                string: 'name, picture'
                            }
                        }
                    },
                    responseInfoCallback
                );
                // Start the graph request.
                new GraphRequestManager().addRequest(infoRequest).start();
            })
    }

    //Facebook login button 

    render() {
        return (
            <LoginButton
                style={{
                    width: '45%',
                    height: 30,
                    marginTop: 5,
                    marginLeft: 15,
                    right: 5
                }}
                publishReadP={["publish_profile"]}
                onLoginFinished={
                    (error, result) => {
                        if (error) {
                        } else if (result.isCancelled) {
                            alert("login is cancelled.");
                        } else {
                        //no error -> activate fetching data
                        this.getFaceBookUserData()
                        }
                    }
                }
                onLogoutFinished={() => {
                    //change signed state and relay.
                    this.props.onFaceBookLogin(this.state.FacebookSigned)
                    this.setState({
                        FacebookSigned: false,
                      });
                    //remove from async storage.
                    AsyncStorage.removeItem('name');
                    AsyncStorage.removeItem('image');                 
                }
                }/>
        );
    }
}