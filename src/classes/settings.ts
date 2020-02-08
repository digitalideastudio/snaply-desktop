import fs from 'fs';

export interface AppSettings {
  firstUse: boolean;
  token: string;
}

class Settings {
  private readonly settingsFile: string;

  private readonly appDataFolder: string;

  private readonly settings: AppSettings;

  private defaultSettings = {
    firstUse: true,
    token: '',
  };

  constructor() {
    const dataFolder = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + '/.config');
    this.appDataFolder = `${dataFolder}/Snaply`;
    this.settingsFile = `${this.appDataFolder}/settings.json`;

    console.log(`Using settings: ${this.settingsFile}`);

    if (!fs.existsSync(this.appDataFolder)) {
      fs.mkdirSync(this.appDataFolder);
    }

    if (fs.existsSync(this.settingsFile)) {
      const contents = fs.readFileSync(this.settingsFile);

      this.settings = JSON.parse(contents.toString());
    } else {
      this.saveSettings(this.defaultSettings);
      this.settings = this.defaultSettings;
    }
  }

  private saveSettings(settings: AppSettings) {
    fs.writeFileSync(this.settingsFile, JSON.stringify(settings));

    return this;
  }

  public get token() {
    return this.settings.token;
  }

  public get firstUse() {
    return this.settings.firstUse;
  }

  public setToken(token: string) {
    this.settings.token = token;
    this.saveSettings(this.settings);

    return this;
  }
}

export default new Settings();
