This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

This is a simple app that demonstrates Google and Facebook login buttons, collecting user data(name and image) and presenting them in the app. 

## Table of Contents

* [Project installation](#installing-new-project)
* [Facebook Login](#facebook-login)
  * [Fbsdk packages](#install-fbsdk-javascript-packages)
  * [React native version > 0.29](#react-native-version)
  * [Facebook developer guide](#facebook-developer-guide)
   * [dependencies](#dependencies)
  * [Login button example](#login-button-example)
* [Google Login](#google-login)
  * [Publishing to Expo's React Native Community](#publishing-to-expos-react-native-community)
  * [Building an Expo "standalone" app](#building-an-expo-standalone-app)
  * [Ejecting from Create React Native App](#ejecting-from-create-react-native-app)
    * [Build Dependencies (Xcode & Android Studio)](#build-dependencies-xcode-android-studio)
    * [Should I Use ExpoKit?](#should-i-use-expokit)
* [Troubleshooting](#troubleshooting)
  * [Networking](#networking)
  * [iOS Simulator won't open](#ios-simulator-wont-open)
  * [QR Code does not scan](#qr-code-does-not-scan)

## installing New project
First create a React Native project:
```ruby
create-react-native-app isracard
```
If you do not know how to emulate an android device see this guide [Android studio](https://facebook.github.io/react-native/docs/getting-started.html) - Building apps with native code.

after setting up and running the emulator run this command in order to sync your project:
```ruby
react-native run-android
``` 


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

![string](https://user-images.githubusercontent.com/39523738/44432278-1f1fc800-a5aa-11e8-8195-bca095bcdb7e.png)
![manifest](https://user-images.githubusercontent.com/39523738/44432239-e384fe00-a5a9-11e8-8d76-74b2ee920128.png)

### Dependencies

make sure you update your facebook dependencies in your C:\Users\Path\To\Project\android\app\build.gradle

![facebookgradle](https://user-images.githubusercontent.com/39523738/44432540-1ed3fc80-a5ab-11e8-8559-8716b2306e1c.png)

as well as your android compilesettings:

![androidcompile](https://user-images.githubusercontent.com/39523738/44432725-f4367380-a5ab-11e8-99f8-0e0d6f14d7bc.png)

### Login button example

![fblogin](https://user-images.githubusercontent.com/39523738/44433765-5a24fa00-a5b0-11e8-960d-cae7743bbba4.png)


### Google Login


## Install Google signIn packages

```ruby
npm install react-native-google-signin --save
react-native link react-native-google-signin
```

## Project setup and initialization

See [Android guide](android-guide.md) to setup the Android sdk packages, Google project configuration - > **google-services.json** and rewrite the associated dependecies and follow [this](./get-config-file.md) guide to get the configuration file and setup a firebase project for authorization.

# Example settings



#### `configure(configuration)`

for the purpose of this project a config script was not created.
Nonetheless, It is mandatory to call this method before attempting to call `signIn()` and `signInSilently()`. This method is sync meaning you can call `signIn` / `signInSilently` right after it. In typical scenarios, `configure` needs to be called only once, after your app starts.

Example for default configuration: you get user email and basic profile info.

```js
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

GoogleSignin.configure({
  iosClientId: '<FROM DEVELOPER CONSOLE>', // only for iOS
});
```

your ClientId's can be retrieved from

Example to access Google Drive both from the mobile application and from the backend server

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


