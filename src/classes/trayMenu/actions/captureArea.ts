import { QAction, QKeySequence } from '@nodegui/nodegui';
import { ActionProps } from '../../../index';

export default function captureArea(props?: ActionProps) {
  const action = new QAction();

  action.setText('Capture Area');
  action.setShortcut(new QKeySequence('Alt+Ctrl+1'));
  action.addEventListener('triggered', () => {
    console.log('Capture Area');
  });

  return action;
}
