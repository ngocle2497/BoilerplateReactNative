//
//  MMKKVStorage.swift
//  HelloWorld
//
//  Created by HNgocL on 10/4/21.
//

import Foundation

class MMKVStorage {
  func getMMKVbyKey(_ keyId: String?, _ cryptKey: String?) -> MMKV {
    if !(keyId ?? "").isEmpty && !(cryptKey ?? "").isEmpty {
      return MMKV.init(
        mmapID: keyId!, cryptKey: cryptKey!.data(using: .utf8), mode: .singleProcess)!
    }
    return MMKV.default()!
  }
  
  func setValue(_ keyName: String, _ value: String, _ keyId: String?, _ cryptKey: String?) {
    self.getMMKVbyKey(keyId, cryptKey).set(value, forKey: keyName)
  }
  
  func setValue(_ keyName: String, _ value: Double, _ keyId: String?, _ cryptKey: String?) {
    self.getMMKVbyKey(keyId, cryptKey).set(value, forKey: keyName)
  }
  
  func setValue(_ keyName: String, _ value: Bool, _ keyId: String?, _ cryptKey: String?) {
    self.getMMKVbyKey(keyId, cryptKey).set(value, forKey: keyName)
  }
  
  func getString(_ keyName: String, _ keyId: String?, _ cryptKey: String?) -> String? {
    return self.getMMKVbyKey(keyId, cryptKey).string(forKey: keyName)
  }
  
  func getDouble(_ keyName: String, _ keyId: String?, _ cryptKey: String?) -> Double {
    return self.getMMKVbyKey(keyId, cryptKey).double(forKey: keyName)
  }
  
  func getBoolean(_ keyName: String, _ keyId: String?, _ cryptKey: String?) -> Bool {
    return self.getMMKVbyKey(keyId, cryptKey).bool(forKey: keyName)
  }
  
  func delete(_ keyName: String, _ keyId: String?, _ cryptKey: String?) {
    self.getMMKVbyKey(keyId, cryptKey).removeValue(forKey: keyName)
  }
  
  func clearAll(_ keyId: String?, _ cryptKey: String?) {
    self.getMMKVbyKey(keyId, cryptKey).clearAll()
  }
  
  func getAllKeys(_ keyId: String?, _ cryptKey: String?) -> [Any] {
    return self.getMMKVbyKey(keyId, cryptKey).allKeys()
  }
  
}
