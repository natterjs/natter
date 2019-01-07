// Libraries
import { ipcRenderer } from 'electron';

const speechBroadcaster = (data) => {
  ipcRenderer.send('speech-broadcast', data);
}

export default speechBroadcaster;
