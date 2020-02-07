import { QAction, QKeySequence } from '@nodegui/nodegui';
import { ActionProps } from '../../index';

export default function recordVideo(props?: ActionProps) {
  const action = new QAction();

  action.setText('Record Video');
  action.setShortcut(new QKeySequence('Alt+Ctrl+3'));
  action.addEventListener('triggered', () => {
    console.log('Record Video');
  });

  return action;
};
