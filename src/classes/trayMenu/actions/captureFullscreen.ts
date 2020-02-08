import screenshot from 'desktop-screenshot';
import { promisify } from 'util';
import tempy from 'tempy';
import { QAction, QKeySequence } from '@nodegui/nodegui';
import { ActionProps, ActionPropType } from '../../../index';

const screenshotAsync = promisify(screenshot);

export default function captureFullscreen({ menuCallback }: ActionProps) {
  const action = new QAction();

  action.setText('Capture Fullscreen');
  action.setShortcut(new QKeySequence('Alt+Ctrl+2'));
  action.addEventListener('triggered', async () => {
    const tempFile = tempy.file({ extension: 'png' });

    await screenshotAsync(tempFile);
    menuCallback(ActionPropType.CAPTURE_FULLSCREEN, tempFile);
  });

  return action;
};
