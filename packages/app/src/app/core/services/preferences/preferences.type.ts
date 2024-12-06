export interface Preference {
  key: string;
  value: string | null;
}

export interface PreferencesOptions {
  asString?: boolean;
  asBoolean?: boolean;
  asNumber?: boolean;
}
