//
//  AppModule.swift
//  HelloWorld
//
//  Created by HNgocL on 6/4/21.
//


import Foundation
import UIKit
import Photos

@objc(AppModule)
// PHPhotoLibraryChangeObserver
class AppModule: RCTEventEmitter {
  private static var DefaultStringReturnType: String = "Unknown";
  private var PhotoChangeEvent: String = "PhotosChange"

  override func supportedEvents() -> [String]! {
    return []
  }
  
  enum DeviceType:String {
    case DeviceTypeHandset = "Handset"
    case DeviceTypeTablet = "Tablet"
    case DeviceTypeTv = "Tv"
    case DeviceTypeDesktop = "Desktop"
    case DeviceTypeUnknown = "Unknown"
  }
  
  // func photoLibraryDidChange(_ changeInstance: PHChange) {
  //   sendEvent(withName: PhotoChangeEvent, body: nil)
  // }

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
  @objc
  func clearNotification() -> Void {
      UNUserNotificationCenter.current().requestAuthorization(options: .badge){
          (granted, error) in
          if granted {
            DispatchQueue.main.async{
              UIApplication.shared.applicationIconBadgeNumber = 0;
              UNUserNotificationCenter.current().removeAllDeliveredNotifications();
            }
          }
      }
  }
  
  @objc
  func clearCache() {
    let cacheURL = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).first!
    let fileManager = FileManager.default
    do {
      // Get the directory contents urls (including subfolders urls)
      let directoryContents = try FileManager.default.contentsOfDirectory(
        at: cacheURL, includingPropertiesForKeys: nil, options: [])
      for file in directoryContents {
        do {
          try fileManager.removeItem(at: file)
        } catch let error as NSError {
          debugPrint("Ooops! Something went wrong: \(error)")
        }
      }
    } catch let error as NSError {
      print(error.localizedDescription)
    }
  }

  @objc
  func setBadges(_ count: Double) -> Void {
      UNUserNotificationCenter.current().requestAuthorization(options: .badge){
          (granted, error) in
          if granted {
            DispatchQueue.main.async {
              let countBadges = Int(count)
              UIApplication.shared.applicationIconBadgeNumber = countBadges
            }
          }
      }
  }
  // Listen photo library changes
  // @objc
  // func registerPhotosChanges() -> Void {
  //   PHPhotoLibrary.shared().register(self);
  // }  

  @objc
  func fixRotation(
    _ path: String, width: Double, height: Double, callback: @escaping RCTResponseSenderBlock
  ) {
    DispatchQueue.global(qos: .default).async(execute: {
      let directory = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).map(
        \.path
      )
      .first
      let fullName = "\(UUID().uuidString).png"
      let fullPath = URL(fileURLWithPath: directory ?? "").appendingPathComponent(fullName).path
      let newSize = CGSize.init(width: width, height: height)
      let loader: RCTImageLoader =
        self.bridge.module(forName: "ImageLoader", lazilyLoadIfNecessary: true) as! RCTImageLoader
      let request: URLRequest = RCTConvert.nsurlRequest(path)
      loader.loadImage(
        with: request, size: newSize, scale: 1, clipped: false, resizeMode: RCTResizeMode.contain,
        progressBlock: { _, _ in }, partialLoad: { _ in },
        completionBlock: { (error, image) in
          if error != nil {
            callback(["Can't retrieve the file from the path.", NSNull()])
            return
          } else {
            UIGraphicsBeginImageContextWithOptions(image!.size, false, 1.0)
            image!.draw(
              in: CGRect(x: 0, y: 0, width: image!.size.width, height: image!.size.height))
            let newImage: UIImage = UIGraphicsGetImageFromCurrentImageContext()!
            UIGraphicsEndImageContext();
            let data = newImage.pngData()
            let fileManager = FileManager.default
            fileManager.createFile(atPath: fullPath, contents: data, attributes: nil)
            let fileUrl = URL(
              fileURLWithPath: fullPath)
            let response = [
              "uri": fileUrl.absoluteString,
              "name": fullName,
            ]
            callback([NSNull(), response])
          }
        })
    })
  }
}

