//
//  AppModule.m
//  HelloWorld
//

#import "React/RCTBridgeModule.h"
#import "React/RCTImageLoader.h"
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(AppModule, RCTEventEmitter)
RCT_EXTERN__BLOCKING_SYNCHRONOUS_METHOD(getDeviceId)
RCT_EXTERN_METHOD(clearCache)
RCT_EXTERN_METHOD(setIQKeyboardOption:(NSDictionary*) options)
RCT_EXTERN_METHOD(clearNotification)
RCT_EXTERN_METHOD(setBadges: (double)count)
RCT_EXTERN_METHOD(createChannel: (NSDictionary*) channel)
RCT_EXTERN_METHOD(deleteChannel: (NSString*) chandleId)
RCT_EXTERN_METHOD(checkChannelExist: (NSString*) chandleId)
RCT_EXTERN_METHOD(fixImageRotation: (NSString * )path
                  callback: (RCTResponseSenderBlock) callback)


+ (BOOL)requiresMainQueueSetup
{
  return YES;
}
@end

