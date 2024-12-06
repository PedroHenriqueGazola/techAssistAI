import { Injectable } from '@angular/core';

import { Preferences } from '@capacitor/preferences';
import { PreferencesOptions } from './preferences.type';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  public async set(
    key: string,
    value: any,
    options?: PreferencesOptions
  ): Promise<void> {
    value = this.parsePreference('set', value, options);

    await Preferences.set({ key, value });
  }

  public async get<T>(key: string, options?: PreferencesOptions): Promise<T> {
    let { value } = await Preferences.get({ key });

    value = this.parsePreference('get', value, options);

    return value as T;
  }

  public async remove(key: string): Promise<void> {
    await Preferences.remove({ key });
  }

  private parsePreference(
    type: 'set' | 'get',
    value: any,
    options?: PreferencesOptions
  ): any {
    if (options?.asString) {
      return value;
    }

    if (options?.asBoolean) {
      return this.valueAsBoolean(type, value);
    }

    if (options?.asNumber) {
      return this.valueAsNumber(type, value);
    }

    return this.valueAsObject(type, value);
  }

  private valueAsObject(type: 'set' | 'get', value: any): any {
    if (type === 'get') {
      return JSON.parse(value);
    }

    if (type === 'set') {
      return JSON.stringify(value);
    }

    return value;
  }

  private valueAsBoolean(type: 'set' | 'get', value: any): any {
    if (type === 'get') {
      return value === 'true';
    }

    if (type === 'set') {
      return String(value);
    }

    return value;
  }

  private valueAsNumber(type: 'set' | 'get', value: any): any {
    if (type === 'get') {
      return Number(value);
    }

    if (type === 'set') {
      return String(value);
    }

    return Number(value);
  }
}
