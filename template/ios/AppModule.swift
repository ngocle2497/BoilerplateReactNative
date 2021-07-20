//
//  AppModule.swift
//  HelloWorld
//
//  Created by HNgocL on 6/4/21.
//


import Foundation
import UIKit

@objc(AppModule)
class AppModule: NSObject {
  
  private static var DefaultStringReturnType: String = "Unknown";
  
  enum DeviceType:String {
    case DeviceTypeHandset = "Handset"
    case DeviceTypeTablet = "Tablet"
    case DeviceTypeTv = "Tv"
    case DeviceTypeDesktop = "Desktop"
    case DeviceTypeUnknown = "Unknown"
  }
  
  
  func _getAppVersion() -> String {
    let appVerison = Bundle.main.infoDictionary?["CFBundleShortVersionString"]
    return (appVerison ?? AppModule.DefaultStringReturnType) as! String;
  }
  
  func _getBuildNumber() -> String {
    let buildNumber = Bundle.main.infoDictionary?["CFBundleVersion"]
    return (buildNumber ?? AppModule.DefaultStringReturnType) as! String
  }
  
  func _getAppName() -> String {
    let displayName = Bundle.main.infoDictionary?["CFBundleDisplayName"]
    let bundleName = Bundle.main.infoDictionary?["CFBundleName"]
    return (displayName != nil) ? displayName as! String : bundleName as! String
  }
  
  func _getDeviceId() -> String {
    return UIDevice.current.identifierForVendor?.uuidString ?? AppModule.DefaultStringReturnType
  }
  
  
  func _getDeviceType() -> String {
    switch UIDevice.current.userInterfaceIdiom {
    case .phone:
      return DeviceType.DeviceTypeHandset.rawValue
    case .tv:
      return DeviceType.DeviceTypeTv.rawValue
    case .pad:
      if (TARGET_OS_MACCATALYST) != 0{
        return DeviceType.DeviceTypeDesktop.rawValue
      }
      
      if #available(iOS 14.0, *){
        return DeviceType.DeviceTypeDesktop.rawValue
      }
      return DeviceType.DeviceTypeTablet.rawValue
    case .mac:
      return DeviceType.DeviceTypeDesktop.rawValue
    default:
      return DeviceType.DeviceTypeUnknown.rawValue
    }
  }

  @objc
  func getDeviceType() -> String {
    return _getDeviceType()
  }
  
  @objc
  func getDeviceId() -> String {
    return _getDeviceId()
  }
  
  @objc
  func getAppName() -> String {
    return _getAppName()
  }
  
  @objc
  func getVersion() -> String {
    return _getAppVersion()
  }
  
  @objc
  func getBuildNumber() -> String {
    return _getBuildNumber()
  }
  
}

