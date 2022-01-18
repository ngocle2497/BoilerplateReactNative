//
//  AppModule.m
//  HelloWorld
//


#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(AppModule, RCTEventEmitter)
RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(getVersion)
RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(getBuildNumber)
RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(getAppName)
RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(getDeviceId)
RCT_EXTERN_METHOD(registerPhotosChanges)
RCT_EXTERN_METHOD(clearCache)
RCT_EXTERN_METHOD(setIQKeyboardOption:(NSDictionary*) options)
RCT_EXTERN_METHOD(clearNotification)
RCT_EXTERN_METHOD(setBadges: (double)count)
RCT_EXTERN_METHOD(fixRotation: (NSString * )path width: (double) width height: (double) height callback: (RCTResponseSenderBlock) callback)
RCT_EXTERN_METHOD(mmkvSetString: (NSString * )keyName value: (NSString * ) value keyId: (NSString * ) keyId cryptKey: (NSString * ) cryptKey resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(mmkvSetNumber: (NSString * )keyName value: (double) value keyId: (NSString * ) keyId cryptKey: (NSString * ) cryptKey resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(mmkvSetBoolean: (NSString * )keyName value: (BOOL) value keyId: (NSString * ) keyId cryptKey: (NSString * ) cryptKey resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(mmkvGetString: (NSString * )keyName keyId: (NSString * ) keyId cryptKey: (NSString * ) cryptKey resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(mmkvGetNumber: (NSString * )keyName keyId: (NSString * ) keyId cryptKey: (NSString * ) cryptKey resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(mmkvGetBoolean: (NSString * )keyName keyId: (NSString * ) keyId cryptKey: (NSString * ) cryptKey resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(mmkvGetAllKeys: (NSString * ) keyId cryptKey: (NSString * ) cryptKey resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(mmkvDelete: (NSString * )keyName keyId: (NSString * ) keyId cryptKey: (NSString * ) cryptKey resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(mmkvClearAll: (NSString * ) keyId cryptKey: (NSString * ) cryptKey resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
@end

