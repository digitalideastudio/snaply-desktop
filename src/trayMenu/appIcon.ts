import { QIcon } from '@nodegui/nodegui';
import path from 'path';

const icon = '../assets/icon.png';
const appIcon = new QIcon(path.resolve(__dirname, icon));

export default appIcon;
