import { Injectable } from '@angular/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomStorageService {

  constructor() {
    // SecureStoragePlugin.getPlatform()
  }

  setItem(key: string, value: string) {
    const storage =  SecureStoragePlugin.set({ key, value });
    return from(storage);
  }
  getItem(key: string, value: string) {
    const storage = SecureStoragePlugin.get({ key});
    return from(storage);
  }

  clearStorage() {
    const storage = SecureStoragePlugin.clear();
    return from(storage);
  }


}
