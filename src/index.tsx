import { Button, Image, Renderer, View, Window } from '@nodegui/react-nodegui';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AspectRatioMode, QApplication, QMainWindow, WindowType } from '@nodegui/nodegui';
import TrayMenu from './trayMenu/TrayMenu';
import { Dock } from '@nodegui/nodegui-os-utils';
import appIcon from './trayMenu/appIcon';
import dotenv from 'dotenv';
import open from 'open';
import S3Client from './s3';

process.title = 'Snaply';

dotenv.config();

const S3 = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  bucketName: process.env.AWS_BUCKET_NAME || '',
  cfDomain: process.env.CLOUDFRONT_DOMAIN || '',
});

Dock.hide();

const App = () => {
  const winRef = useRef<QMainWindow>(null);
  const [imageSrc, setImageSrc] = useState<string>();

  // To prevent system tray from being garbage collected.
  (global as any).systemTray = new TrayMenu({
    menuCallback(type, payload) {
      switch (type) {
        case ActionPropType.CAPTURE_FULLSCREEN:
          setImageSrc(payload);
          winRef.current?.show();
          Dock.show();
          break;
        case ActionPropType.CAPTURE_AREA:
          break;
        case ActionPropType.RECORD_VIDEO:
          break;
        case ActionPropType.QUIT:
          break;
      }
    },
  });

  useEffect(() => {
    if (!winRef.current) return;
    winRef.current.resize(1280, 800);
    winRef.current.setWindowTitle('Snaply');
    winRef.current.hide();
    winRef.current.setWindowIcon(appIcon);
    winRef.current.setWindowFlag(WindowType.Window | WindowType.FramelessWindowHint, true);
    winRef.current.center();
  }, []);

  const closeButtonHandler = useMemo(
    () => ({
      clicked: () => {
        winRef.current?.hide();
        Dock.hide();
      },
    }),
    [],
  );

  const uploadButtonHandler = useMemo(
    () => ({
      clicked: async () => {
        if (!imageSrc) return;

        const fileUrl = await S3.uploadFile(imageSrc);

        winRef.current?.hide();
        await open(fileUrl);
        Dock.hide();
      },
    }),
    [imageSrc],
  );

  return (
    <>
      <Window
        ref={winRef}
        styleSheet={styleSheet}
      >
        <View id="container">
          <View id="controls">
            <Button
              id="close"
              text="X"
              on={closeButtonHandler}
            />
            <Button
              id="upload"
              text="Upload"
              on={uploadButtonHandler}
            />
          </View>
          <Image
            id="img"
            aspectRatioMode={AspectRatioMode.KeepAspectRatio}
            src={imageSrc}
          />
        </View>
      </Window>
    </>
  );
};

const styleSheet = `
  #container {
    flex: 1;
    min-height: '100%';
  }
  #controls {
    flex-direction: 'row';
    justify-content: 'space-between';
    align-items: 'flex-start';
    padding-horizontal: 5;
    padding-vertical: 5;
  }
  #img {
    flex: 1;
    width: 1280;
    height: 800;
    qproperty-alignment: 'AlignCenter';
  }
  #close {
    width: 20;
    height: 20;
    background-color: #D96156;
    padding-horizontal: 0;
    padding-vertical: 0;
  }
  #textField {
    flex: 1;
  }
`;

Renderer.render(<App />);

// required so that app doesnt close if we close all windows.
QApplication.instance().setQuitOnLastWindowClosed(false);

export enum ActionPropType {
  CAPTURE_FULLSCREEN,
  CAPTURE_AREA,
  RECORD_VIDEO,
  QUIT,
}

export interface ActionProps {
  menuCallback: (type: ActionPropType, ...payload: any) => any,
}
