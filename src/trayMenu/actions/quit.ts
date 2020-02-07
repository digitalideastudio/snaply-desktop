import { QAction, QApplication } from '@nodegui/nodegui';
import appIcon from '../appIcon';
import { ActionProps } from '../../index';

export default function quit(props?: ActionProps) {
  const action = new QAction();

  action.setText('Quit');
  action.setIcon(appIcon);
  action.addEventListener('triggered', () => {
    QApplication.instance().quit();
  });

  return action;
}
