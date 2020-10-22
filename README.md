# HCI-909 : Multi device Collaborative Screen

# Setup

### Requirements

Make sure you have installed:

- Git
- XCode (to launch the app on iOS)
- Android SDK
- node (Mac: `brew install node` Linux: `sudo apt-get install nodejs npm`)
  - yarn (Mac: `brew install yarn` Linux: `sudo apt update && sudo apt install yarn`)
  - react-native-cli (`yarn global add react-native-cli`)
- ruby (Mac: `brew install ruby` Linux: `sudo apt-get install ruby-full`)

### Installation

```bash
git clone git@github.com:solinehayes/HCI-909.git
cd project-name/MultiDeviceCollab
yarn
cd ios && pod install && cd ..
```

# Develop

### Run the app in your simulator

In the folder MultiDeviceCollab:

- `yarn start`

Then on another terminal window:

- [ONLY FOR MAC USERS] iOS: `yarn ios` -> the app is compatible with iOS however the GoogleNearbyLibrary is not so the device connection won't work on a iOS device/simulator
- Android: `yarn android` -> the device connection won't work on simulator

### Run the app on a real device (Android only)

1. Download adb on your machine (https://www.xda-developers.com/install-adb-windows-macos-linux/)
2. Make sure your android phone is in developer mode (https://www.digitaltrends.com/mobile/how-to-get-developer-options-on-android/)
3. Turn on debugger in the developer options
4. Plug in your phone and accept the connection to the computer on the android phone
5. Run `adb devices` one device should appear with "device" written next to it (if it is written 'unauthorized' try unplugging the phone, runn `adb kill-server` and `adb start-server`and try step 4 again) 
6. Launch `yarn start`in a seperate terminal window
7. Run `yarn android`

For more information: https://reactnative.dev/docs/running-on-device

_Warning_ : You might not see devices on the connection modal right after you've accepted the localisation authorization on your phone. Try reloading the app (`yarn android`) or close it and re-lauch it again from your phone

**Link to download the .apk and download the app (ANDROID ONLY)**: https://we.tl/t-XZeF9orqpU
