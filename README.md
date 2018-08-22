This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

This is a simple Android app that demonstrates Google and Facebook login buttons, collecting user data(name and image) and presenting them in the app UI. 

## Table of Contents

* [Project installation](#installing-new-project)
* [Facebook Login](#facebook-login)
  * [Fbsdk packages](#install-fbsdk-javascript-packages)
  * [React native version > 0.29](#react-native-version)
  * [Facebook developer guide](#facebook-developer-guide)
   * [dependencies](#dependencies)
  * [Login button example](#login-button-example)
* [Google Login](#google-login)
  * [Google sign in packages](#install-google-signin-packages)
  * [Project setup and initialization](#project-setup-and-initialization)
  * [Example settings](#example-settings)
  * [Configuration](#configuration)
  * [GoogleSigningButton Example](#googlesigningbutton-example)
* [Side Notes](#side-notes)

## installing New project
First create a React Native project:
```ruby
create-react-native-app [appName]
```
If you do not know how to emulate an android device see this guide [Android studio](https://facebook.github.io/react-native/docs/getting-started.html) - Building projects with native code - start from npm i react-cli.

after setting up and running the emulator run this command in order to sync your project:
```ruby
react-native run-android
``` 

### After currectly setting up your emulator and running the app it may look something like this:

![androidemulator](https://user-images.githubusercontent.com/39523738/44462335-f7b61300-a61c-11e8-841e-4b4977269d6d.png)


## Apk installment

An example release apk is located in android\app\build\outputs\apk\release\app-release.apk
once the project is completed you can [Generate a signed APK](https://facebook.github.io/react-native/docs/signed-apk-android.htmlsign)
and set up your gradle variables as instructed.
then, type:
``` ruby
/gradlew assembleRelease
``` 
in your Cmd or build it directly with your Android studios.

**note** - > this is the release version. but for testing the app you can use the defualt debug keystore as well.



# Facebook Login



### Install fbsdk packages

Install and link the react-native-fbsdk package:
```ruby
react-native install react-native-fbsdk
react-native link react-native-fbsdk
```

### React native version 

**Must be above 0.29**

Go to `MainApplication.java` and `MainActivity.java` under `app/src/main/java/com/<project name>/` to complete setup.

In `MainApplication.java`,

Add an instance variable of type `CallbackManager` and its getter.
```java
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
...

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
    //...
```

If you want to use AppEventsLogger to log events, override `onCreate()` method and add
```java
@Override
public void onCreate() {
  super.onCreate();
  AppEventsLogger.activateApp(this);
  //...
}
```

Register Fbsdk package in method 'getPackes()'.
```java
private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new FBSDKPackage(mCallbackManager)
      );
    }
};
```

In `MainActivity.java`

Override `onActivityResult()` method
```java
import android.content.Intent;

public class MainActivity extends ReactActivity {

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
    //...
```

## Facebook developer guide

Before you can run the project, follow the [Getting Started Guide](https://developers.facebook.com/docs/android/getting-started/) for Facebook Android SDK to set up a Facebook app.
**make sure** you make the appropriate changes to the `strings.xml` and `AndroidManifest.xml` and creating the App id + the Android key hash.

**example**

![string](https://user-images.githubusercontent.com/39523738/44462990-eec64100-a61e-11e8-891b-3cd944ca9e4a.png)

![manifest](https://user-images.githubusercontent.com/39523738/44432239-e384fe00-a5a9-11e8-8d76-74b2ee920128.png)

### Dependencies

make sure you update your facebook dependencies in your C:\Users\Path\To\Project\android\app\build.gradle

![facebookgradle](https://user-images.githubusercontent.com/39523738/44432540-1ed3fc80-a5ab-11e8-8559-8716b2306e1c.png)

as well as your android compilesettings:

![androidcompile](https://user-images.githubusercontent.com/39523738/44432725-f4367380-a5ab-11e8-99f8-0e0d6f14d7bc.png)

### Login button example

```java
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
 ```


# Google Login


## Install Google signIn packages

```ruby
npm install react-native-google-signin --save
react-native link react-native-google-signin
```

## Project setup and initialization

See [Android guide](android-guide.md) to setup the Android sdk packages, Google project configuration - > **google-services.json** and rewrite the associated dependecies and follow [this](./get-config-file.md) guide to get the configuration file and setup a firebase project for authorization.

**take note** - For android apps SHA1 key is obligation.
To get the SHA1 key you need to generate your keystore, to generate your keystore follow [this](https://facebook.github.io/react-native/docs/signed-apk-android.html) guide when prompted the sha request in your firebase project settings.

# Example settings

![googlesettings](https://user-images.githubusercontent.com/39523738/44434867-1e8d2e80-a5b6-11e8-9154-f131a391bbec.png)

### Configuration

for the purpose of this project a config script was not created.
Nonetheless, It is mandatory to call this method before attempting to call `signIn()` and `signInSilently()`. This method is sync meaning you can call `signIn` / `signInSilently` right after it. In typical scenarios, `configure` needs to be called only once, after your app starts.

Example for default configuration: you get user email and basic profile info.

```js
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

GoogleSignin.configure({
  iosClientId: '<FROM DEVELOPER CONSOLE>', // only for iOS
});
```
your ClientId's can be retrieved from the **google-services.json**
Example to access Google Drive both from the mobile application and from a backend server

```js
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  iosClientId: '<FROM DEVELOPER CONSOLE>', // only for iOS
  webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
  accountName: '', // [Android] specifies an account name on the device that should be used
});
```

## GoogleSigningButton Example

```js
  <GoogleSigninButton
  style={{
  width: "45%",
  height: 37,
  marginLeft: 8
  }}
  size={GoogleSigninButton.Size.Standard}
  color={GoogleSigninButton.Color.Auto}
  onPress={this.onLoginOrRegister}
  />
```

Possible values for `size` are:

- Size.Icon: display only Google icon. recommended size of 48 x 48
- Size.Standard: icon with 'Sign in'. recommended size of 230 x 48
- Size.Wide: icon with 'Sign in with Google'. recommended size of 312 x 48

Possible values for `color` are:

- Color.Dark: apply a blue background
- Color.Light: apply a light gray background

## Side Notes



