fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### upload_to_appcenter

```sh
[bundle exec] fastlane upload_to_appcenter
```



### notify_testers

```sh
[bundle exec] fastlane notify_testers
```



### load_env_from_json

```sh
[bundle exec] fastlane load_env_from_json
```



----


## iOS

### ios upload_to_TF

```sh
[bundle exec] fastlane ios upload_to_TF
```

Upload IPA to TestFlight

### ios build_ipa

```sh
[bundle exec] fastlane ios build_ipa
```

IOS ipa

----


## Android

### android aab_android

```sh
[bundle exec] fastlane android aab_android
```

Android build bundle(aab)

### android apk_android

```sh
[bundle exec] fastlane android apk_android
```

Android build release(apk)

### android google_internal

```sh
[bundle exec] fastlane android google_internal
```

Android build apk then upload to app center

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
