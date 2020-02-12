import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Button, useEventHandler, Image, Text } from '@nodegui/react-nodegui';
import { useHistory } from 'react-router';
import { AspectRatioMode, Orientation, QLabel, QMainWindow, QPushButtonSignals } from '@nodegui/nodegui';
import settings from '../classes/settings';
import open from 'open';
import { Dock } from '@nodegui/nodegui-os-utils';
import TrayMenu from '../classes/trayMenu/TrayMenu';
import { ActionPropType } from '../index';
import s3Client from '../classes/s3Client';
import { Slider } from '../components/Slider';

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

  const buttons = Array(12).fill(0).map((_, index) => {
    return <Button
      style={`
        flex: 0;
        width: 25;
        height: 25;
        background: #80CBC4;
        margin: 0;
        padding: 0;
        border-radius: 3;
      `}
      text={`${index + 1}`}
    />;
  });

  return (
    <View
      styleSheet={styleSheet}
    >
      <View id="container">
        <View id="img_wrapper">
          {imageSrc && (
            <Image
              id="img"
              aspectRatioMode={AspectRatioMode.KeepAspectRatio}
              src={imageSrc}
            />
          )}
        </View>
        <View id="controls">
          <Button
            style={`
              flex: 0;
              width: 25;
              height: 25;
              background: #FFCB6B;
              margin: 0;
              padding: 0;
              border-radius: 3;
            `}
          />
          <View
            style={`
              flex-direction: row;
              align-items: 'center';
            `}
          >
            <Button
              style={`
                flex: 0;
                width: 10;
                height: 5;
                background: #80CBC4;
                border-radius: 10;
                border: 0;
                margin-right: 5;
              `}
            />
            <Slider
              orientation={Orientation.Horizontal}
              value={15}
              minimum={10}
              maximum={100}
              style={`
                height: 40;
                width: 150;
              `}
              hasTracking={true}
            />
            <Button
              style={`
                flex: 0;
                width: 15;
                height: 10;
                background: #80CBC4;
                border-radius: 10;
                border: 0;
                margin-left: 5;
              `}
            />
          </View>
          {buttons}
          <Button
            id="upload"
            text="Upload"
            on={uploadButtonHandler}
          />
        </View>
      </View>
    </View>
  );
}

const styleSheet = `
  #container {
    flex: 1;
    color: #BBBBBB;
  }
  
  #img_wrapper {
    flex: 1;
    height: 800;
    width: 1280;
    border-bottom: 1px solid #4F4B41;
  }

  #img {
    flex: 1;
    height: 800;
    width: 1280;
    qproperty-alignment: 'AlignCenter';
  }
  
  #controls {
    flex: 1;
    width: 1280;
    background: #3B3C3F;
    height: 40;
    justify-content: 'space-between';
    align-items: 'center';
    flex-direction: row;
    padding-left: 10;
  }
  #controls button {
    flex: 0;
    width: 20;
  }
  
  #upload {
    background: #B15B2E;
    border: 1px solid #673D3E;
    width: 100px;
    padding: 5px 10px;
    border-radius: 2px;
    height: 40;
    color: #BBBBBB;
  }
`;
