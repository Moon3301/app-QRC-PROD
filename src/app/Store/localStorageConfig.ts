import { LocalStorageConfig, localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncConfig(): LocalStorageConfig {
    return {
      keys: ['token'],
      rehydrate: true,
      checkStorageAvailability: true,
    };
  }
  export function localStorageSyncReducer(reducer: any): any {
    return localStorageSync(localStorageSyncConfig())(reducer);
  }
