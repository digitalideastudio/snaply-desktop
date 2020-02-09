import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Button, useEventHandler, Image } from '@nodegui/react-nodegui';
import { useHistory } from 'react-router';
import { AspectRatioMode, QMainWindow, QPushButtonSignals } from '@nodegui/nodegui';
import settings from '../classes/settings';
import open from 'open';
import { Dock } from '@nodegui/nodegui-os-utils';
import TrayMenu from '../classes/trayMenu/TrayMenu';
import { ActionPropType } from '../index';
import s3Client from '../classes/s3Client';

export default function Editor() {
  const history = useHistory();

  const [imageSrc, setImageSrc] = useState<string>();

  const uploadButtonHandler = useMemo(
    () => ({
      clicked: async () => {
        if (!imageSrc) return;

        const fileUrl = await s3Client.uploadFile(imageSrc);

//        winRef.current?.hide();
        await open(fileUrl);
        Dock.hide();
      },
    }),
    [imageSrc],
  );

  const loginButtonHandler = useEventHandler<QPushButtonSignals>(
    { clicked: () => history.push('/login') },
    [],
  );

  // To prevent system tray from being garbage collected.
  (global as any).systemTray = new TrayMenu({
    menuCallback(type: ActionPropType, payload: any) {
      switch (type) {
        case ActionPropType.CAPTURE_FULLSCREEN:
          setImageSrc(payload);
//          winRef.current?.show();
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

  return (
    <View
      styleSheet={styleSheet}
    >
      <View id="container">
        {imageSrc && (
          <Image
            id="img"
            aspectRatioMode={AspectRatioMode.KeepAspectRatio}
            src={imageSrc}
          />
        )}
        <View id="controls">
          {settings.firstUse ? (
            <Button
              id="login"
              text="Login"
              on={loginButtonHandler}
            />
          ) : (
            <Button
              id="upload"
              text="Upload"
              on={uploadButtonHandler}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styleSheet = `
  #container {
    flex: 1;
    min-height: '100%';
    color: #BBBBBB;
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
`;
