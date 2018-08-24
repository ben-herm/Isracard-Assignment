
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  AppRegistry,
  ScrollView,
  AsyncStorage
} from 'react-native';

import firebase from 'react-native-firebase';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import config from './';
import { FBLoginButton } from './components/FBLogin'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleFChange = this.handleFChange.bind(this);

    this.state = {
      showLoadingModal: true,
      name: "User",
      image: 'data:image/png;base64,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',
      userInfo: null,
      error: null,
      LoginTextMsg: "Please log in to your Facebook or Google account.",
      GoogleSigned: false,
      FacebookSigned: false,
      firstLaunch:null
    };
  }


  handleFChange(value) {
    if (!value) {
      this.setState({
        FacebookSigned: true,
        LoginTextMsg: "Thank you!"
      });
    } else if (value) {
      this.setState({
        FacebookSigned: false,
        LoginTextMsg: "Please log in to your Facebook or Google account."
      });
    }
  }


  //Update state function -> get values from AsynceStorage if not null and set to state.

  async UpdateState() {
    Uname = await AsyncStorage.getItem('name');
    Uimage = await AsyncStorage.getItem('image');
    Utext = await AsyncStorage.getItem('msg');
    if ((Uname != null) && (Uimage != null)) {
      this.setState({
        name: Uname,
        image: Uimage
      });
    } else {
      this.setState({
        name: "User",
        image: 'data:image/png;base64,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'
      });
    }
  }

  //initialize google signIn configuration before auth.
   componentDidMount() {
    this._configureGoogleSignIn();
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  //started building modules for each platform -currently undefined.
  _configureGoogleSignIn() {
    const configPlatform = {
      ...Platform.select({
        ios: {
          iosClientId: config.iosClientId,
        },
        android: {},
      }),
    };

    GoogleSignin.configure({
      ...configPlatform,
      webClientId: config.webClientId,
      offlineAccess: false,
    });
  }

  renderError() {
    const { error } = this.state;
    return (
      !!error && (
        <Text>
          {error.toString()} code: {error.code}
        </Text>
      )
    );
  }

  //Google sign in and authenticating firebase credentials - set to async storage and change state.

  onLoginOrRegister = async () => {
    GoogleSignin.hasPlayServices();
    GoogleSignin.signIn()
      .then((data) => {
        // Create a new Firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        // Login with the credential
        return firebase.auth().signInAndRetrieveDataWithCredential(credential);
      })
      .then((userInfo) => {
        this.setState({ userInfo, error: null, GoogleSigned: true, FacebookSigned: false, name: firebase.auth().currentUser.providerData[0].displayName, image: firebase.auth().currentUser.providerData[0].photoURL, LoginTextMsg: "Thank You!" });
        AsyncStorage.setItem('name', this.state.name)
        AsyncStorage.setItem('image', this.state.image)
      })
      .catch((error) => {
      });
  }

  //Sign out method - > revoke access/save to storage/ save to state

  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      AsyncStorage.removeItem('name');
      AsyncStorage.removeItem('image');
      this.setState({ userInfo: null, error: null, GoogleSigned: false, LoginTextMsg: "Please log in to your Facebook or Google account.", name: "User", image: "data:image/png;base64,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" });
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  //render

  render() {
    { this.UpdateState() }
    const { userInfo } = this.state;
    if (!userInfo) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>
                {'Welcome ' + this.state.name}
              </Text>
            </View>
            <View style={styles.postContent}>
              <View style={styles.loginText}>
                <Text style={styles.postTitle}>
                  {this.state.LoginTextMsg}
                </Text>
              </View>
              <View style={styles.profile}>
                <Image style={styles.avatar}
                  source={{ uri: this.state.image }} />
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 100 }}>
            {
                (this.state.GoogleSigned) ?
                  <View></View> :
                  <FBLoginButton
                    onFaceBookLogin={this.handleFChange}
                  />
              }
              {
                (this.state.FacebookSigned) ?
                  <View></View>
                  :
                  <GoogleSigninButton
                    style={styles.googleButton2}
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Auto}
                    onPress={this.onLoginOrRegister}
                  />
              }
              {this.renderError()}       
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>
                {'Welcome ' + this.state.name}
              </Text>
            </View>
            <View style={styles.postContent}>
              <View style={styles.loginText}>
                <Text style={styles.postTitle}>
                  {this.state.LoginTextMsg}
                </Text>
              </View>
              <View style={styles.profile}>
                <Image style={styles.avatar}
                  source={{ uri: this.state.image }} />
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 100 }}>
            {
                (this.state.GoogleSigned) ?
                  <View></View> :
                    <FBLoginButton/>
              }
              {
                (this.state.FacebookSigned) ?
                  <View></View>
                  :
                  <TouchableOpacity style={[styles.googleButton]
                  }
                    onPress={this._signOut}>
                    <View style={styles.socialButtonContent}>
                      <Image style={styles.icon} source={{ uri: 'https://png.icons8.com/google/androidL/40/FFFFFF' }} />
                      <Text style={styles.GoogleloginText}>Log Out</Text>
                    </View>
                  </TouchableOpacity>
              }
              {this.renderError()}
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  buttonContainer: {
    width:"90%",
    left: 255
  },
  header: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: "#19398A",
  },
  headerTitle: {
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  postContent: {
    flex: 1,
    padding: 30,
  },
  loginText: {
    flex: 1,
    padding: 30,

  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  },
  postDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 86,
    borderWidth: 4,
  },
  profile: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center'
  },
  name: {
    fontSize: 22,
    color: "#00BFFF",
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 10,
  },
  shareButton: {
    width: "45%",
    height: 35,
    borderRadius: 30,
    justifyContent: "flex-end"
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  googleButton: {
    backgroundColor: "#ff0000",
    width: "45%",
    height: 30,
    marginTop: 5,
    marginLeft: 110
  },
  googleButton2: {
    width: "45%",
    height: 37,
    marginLeft: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
  GoogleloginText: {
    color: 'white',
  },
  socialButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

AppRegistry.registerComponent('App', () => App);
