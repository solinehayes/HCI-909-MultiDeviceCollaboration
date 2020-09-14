# HCI-909 : Multi device Collaborative Screen

# Setup

### Requirements

Make sure you have installed:

- Git
- XCode
- Android SDK
- node
  - yarn
  - react-native-cli
- ruby
  - bundler (`sudo gem install bundler`)

### Installation

```bash
git clone git@github.com:bamlab/project-name.git
cd project-name
nvm use
bundle install
yarn
bundle exec pod repo update
cd ios && bundle exec pod install && cd ..
```

# Develop

### Run the app in your simulator

- `yarn start`

Then:

- iOS: `yarn react-native run-ios`
- Android: `yarn react-native run-android`
