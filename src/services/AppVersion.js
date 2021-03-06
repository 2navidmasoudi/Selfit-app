import { APP, SAPI } from './type';
import { logError } from './log';

export default async () => {
  try {
    const response = await fetch(`${SAPI}${APP}GetVersion`);
    const json = await response.json();
    console.log('app.version =');
    console.log(json);
    return json.Data;
  } catch (e) {
    console.log(e);
    logError(e, 'AppVersion', 'Appversion', 'Line4');
    return null;
  }
};
