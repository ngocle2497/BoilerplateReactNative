#!/bin/bash
# This file will be executed when you run android or ios from Android Studio or Xcode.
# Xcode: Go to Product -> Scheme -> Edit Scheme -> Pre-actions to see script
# Android: Go to android/app/build.gradle -> prepare
echo "PATH ENV $1"
# $0 is the name of the script
# reconfig the PATH env variable to include the homebrew bin directory
PATH="/opt/homebrew/bin:$PATH"
npx ts-node scripts/prepare.ts $1