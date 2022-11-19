//
//  AppModule.swift
//  HelloWorld
//

import Foundation
import IQKeyboardManagerSwift
import Photos
import React
import UIKit

@objc(AppModule)
class AppModule: RCTEventEmitter {
  private static var DefaultStringReturnType: String = "Unknown"

  override func supportedEvents() -> [String]! {
    return []
  }

  @objc
  func getDeviceId() -> String {
    return UIDevice.current.identifierForVendor?.uuidString ?? AppModule.DefaultStringReturnType
  }

  @objc
  func clearNotification() {
    UNUserNotificationCenter.current().requestAuthorization(options: .badge) {
      (granted, error) in
      if granted {
        DispatchQueue.main.async {
          UIApplication.shared.applicationIconBadgeNumber = 0
          UNUserNotificationCenter.current().removeAllDeliveredNotifications()
        }
      }
    }
  }

  @objc
  func clearCache() {
    let cacheURL = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).first!
    let fileManager = FileManager.default
    do {
      // Get the directory contents urls (including sub folders urls)
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
  func setBadges(_ count: Double) {
    UNUserNotificationCenter.current().requestAuthorization(options: .badge) {
      (granted, error) in
      if granted {
        DispatchQueue.main.async {
          let countBadges = Int(count)
          UIApplication.shared.applicationIconBadgeNumber = countBadges
        }
      }
    }
  }

  @objc
  func createChannel(_ channel: NSDictionary) {
    // Android only
  }

  @objc
  func deleteChannel(_ channelId: String) {
    // Android only
  }

  @objc
  func checkChannelExist(_ channelId: String) {
    // Android only
  }

  @objc
  func fixImageRotation(
    _ path: String, callback: @escaping RCTResponseSenderBlock
  ) {
    DispatchQueue.global(qos: .default).async(execute: {
      let directory = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask).map(
        \.path
      )
      .first
      let fullName = "\(UUID().uuidString).png"
      let fullPath = URL(fileURLWithPath: directory ?? "").appendingPathComponent(fullName).path
      let loader: RCTImageLoader =
        self.bridge.module(forName: "ImageLoader", lazilyLoadIfNecessary: true) as! RCTImageLoader
      let request: URLRequest = RCTConvert.nsurlRequest(path)
      loader.loadImage(
        with: request,
        callback: { (error, image) in
          if error != nil {
            callback(["Can't retrieve the file from the path.", NSNull()])
            return
          } else {
            UIGraphicsBeginImageContextWithOptions(image!.size, false, 1.0)
            image!.draw(
              in: CGRect(x: 0, y: 0, width: image!.size.width, height: image!.size.height))
            let newImage: UIImage = UIGraphicsGetImageFromCurrentImageContext()!
            UIGraphicsEndImageContext()
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

  @objc
  func setIQKeyboardOption(
    _ options: NSDictionary
  ) {
    DispatchQueue.main.async {
      if let layoutIfNeededOnUpdate = options["layoutIfNeededOnUpdate"] as? Bool {
        IQKeyboardManager.shared.layoutIfNeededOnUpdate = layoutIfNeededOnUpdate
      }

      if let enableDebugging = options["enableDebugging"] as? Bool {
        IQKeyboardManager.shared.enableDebugging = enableDebugging
      }

      if let keyboardDistanceFromTextField = options["keyboardDistanceFromTextField"] as? Float {
        IQKeyboardManager.shared.keyboardDistanceFromTextField = CGFloat(
          keyboardDistanceFromTextField)
      }

      if let enableAutoToolbar = options["enableAutoToolbar"] as? Bool {
        IQKeyboardManager.shared.enableAutoToolbar = enableAutoToolbar
      }

      if let toolbarDoneBarButtonItemText = options["toolbarDoneBarButtonItemText"] as? String {
        IQKeyboardManager.shared.toolbarDoneBarButtonItemText = toolbarDoneBarButtonItemText
      }

      if let toolbarManageBehaviourBy = options["toolbarManageBehaviourBy"] as? String {
        switch toolbarManageBehaviourBy {
        case "subviews":
          IQKeyboardManager.shared.toolbarManageBehaviour = .bySubviews
        case "tag":
          IQKeyboardManager.shared.toolbarManageBehaviour = .byTag
        case "position":
          IQKeyboardManager.shared.toolbarManageBehaviour = .byPosition
        default:
          print("\(toolbarManageBehaviourBy) is not supported")
          break
        }
      }

      if let toolbarPreviousNextButtonEnable = options["toolbarPreviousNextButtonEnable"] as? Bool {
        if toolbarPreviousNextButtonEnable {
          IQKeyboardManager.shared.toolbarPreviousNextAllowedClasses.append(RCTRootView.self)
        } else {
          if let index = IQKeyboardManager.shared.toolbarPreviousNextAllowedClasses.firstIndex(
            where: { element in
              return element == RCTRootView.self
            })
          {
            IQKeyboardManager.shared.toolbarPreviousNextAllowedClasses.remove(at: index)
          }
        }
      }

      if let toolbarTintColor = options["toolbarTintColor"] as? String {
        IQKeyboardManager.shared.toolbarTintColor = UIColor(hex: toolbarTintColor)
      }

      if let toolbarBarTintColor = options["toolbarBarTintColor"] as? String {
        IQKeyboardManager.shared.toolbarBarTintColor = UIColor(hex: toolbarBarTintColor)
      }

      if let shouldShowToolbarPlaceholder = options["shouldShowToolbarPlaceholder"] as? Bool {
        IQKeyboardManager.shared.shouldShowToolbarPlaceholder = shouldShowToolbarPlaceholder
      }

      if let overrideKeyboardAppearance = options["overrideKeyboardAppearance"] as? Bool {
        IQKeyboardManager.shared.overrideKeyboardAppearance = overrideKeyboardAppearance
      }

      if let keyboardAppearance = options["keyboardAppearance"] as? String {
        switch keyboardAppearance {
        case "default":
          IQKeyboardManager.shared.keyboardAppearance = .default
        case "light":
          IQKeyboardManager.shared.keyboardAppearance = .light
        case "dark":
          IQKeyboardManager.shared.keyboardAppearance = .dark
        default:
          print("\(keyboardAppearance) is not supported")
          break
        }
      }

      if let shouldResignOnTouchOutside = options["shouldResignOnTouchOutside"] as? Bool {
        IQKeyboardManager.shared.shouldResignOnTouchOutside = shouldResignOnTouchOutside
      }

      if let shouldPlayInputClicks = options["shouldPlayInputClicks"] as? Bool {
        IQKeyboardManager.shared.shouldPlayInputClicks = shouldPlayInputClicks
      }

      if let resignFirstResponder = options["resignFirstResponder"] as? Bool {
        if resignFirstResponder {
          IQKeyboardManager.shared.resignFirstResponder()
        }
      }

      if let reloadLayoutIfNeeded = options["reloadLayoutIfNeeded"] as? Bool {
        if reloadLayoutIfNeeded {
          IQKeyboardManager.shared.reloadLayoutIfNeeded()
        }
      }
      if let enable = options["enable"] as? Bool {
        IQKeyboardManager.shared.enable = enable
      }
    }
  }
}
extension UIColor {
  public convenience init?(hex: String) {
    let r: CGFloat
    let g: CGFloat
    let b: CGFloat
    let a: CGFloat

    if hex.hasPrefix("#") {
      let start = hex.index(hex.startIndex, offsetBy: 1)
      let hexColor = String(hex[start...])

      if hexColor.count == 8 {
        let scanner = Scanner(string: hexColor)
        var hexNumber: UInt64 = 0

        if scanner.scanHexInt64(&hexNumber) {
          r = CGFloat((hexNumber & 0xff00_0000) >> 24) / 255
          g = CGFloat((hexNumber & 0x00ff_0000) >> 16) / 255
          b = CGFloat((hexNumber & 0x0000_ff00) >> 8) / 255
          a = CGFloat(hexNumber & 0x0000_00ff) / 255

          self.init(red: r, green: g, blue: b, alpha: a)
          return
        }
      }
    }

    return nil
  }
}
