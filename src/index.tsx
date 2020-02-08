import React from 'react';
//import { QApplication } from '@nodegui/nodegui';
import { Renderer } from '@nodegui/react-nodegui';
//import { Dock } from '@nodegui/nodegui-os-utils';
import App from './app';
//import './classes/settings';
//import './classes/s3Client';
//import settings from './classes/settings';

//if (!settings.firstUse) {
//  Dock.hide();
//}

process.title = 'Snaply';
Renderer.render(<App />);

// required so that app doesnt close if we close all windows.
//QApplication.instance().setQuitOnLastWindowClosed(false);

// This is for hot reloading (this will be stripped off in production by webpack)
if (module.hot) {
  module.hot.accept(['./app'], function () {
    Renderer.forceUpdate();
  });
}

export enum ActionPropType {
  CAPTURE_FULLSCREEN,
  CAPTURE_AREA,
  RECORD_VIDEO,
  QUIT,
}

export interface ActionProps {
  menuCallback: (type: ActionPropType, ...payload: any) => any,
}
