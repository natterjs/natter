// Libraries
import { ipcRenderer } from 'electron';

const clientBroadcaster = (channel, data = {}) => {
  ipcRenderer.send(channel, data);
}

export default clientBroadcaster;
