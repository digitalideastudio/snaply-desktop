import { QMenu, QSystemTrayIcon } from '@nodegui/nodegui';
import appIcon from './appIcon';
import captureArea from './actions/captureArea';
import captureFullscreen from './actions/captureFullscreen';
import recordVideo from './actions/recordVideo';
import quit from './actions/quit';
import { ActionProps } from '../../index';

const tray = new QSystemTrayIcon();
tray.setIcon(appIcon);
tray.show();
tray.setToolTip('Snaply - share and edit screenshots');

export default class TrayMenu {
  private readonly trayMenu: QMenu;

  constructor(props: ActionProps) {
    this.trayMenu = new QMenu();

    tray.setContextMenu(this.trayMenu);
    this.setActions(props);
  }

  setActions(props: ActionProps) {
    this.trayMenu.addAction(captureArea(props));
    this.trayMenu.addAction(captureFullscreen(props));
    this.trayMenu.addAction(recordVideo(props));
    this.trayMenu.addAction(quit(props));
  }
}
