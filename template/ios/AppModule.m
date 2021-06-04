//
//  AppModule.m
//  HelloWorld
//
//  Created by HNgocL on 6/4/21.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(AppModule, RCTEventEmitter)
RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(getVersion)
RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(getBuildNumber)
RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(getAppName)
RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(getDeviceId)
RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(getDeviceType)
RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(getBluetoothState)
@end

