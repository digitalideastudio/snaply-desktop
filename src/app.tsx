import { Window, hot, View } from '@nodegui/react-nodegui';
import React from 'react';
import { MemoryRouter } from 'react-router';
import AppRoutes from './routes';
//import appIcon from './classes/trayMenu/appIcon';

const minSize = { width: 1280, height: 800 };

class App extends React.Component {
  render() {
    return (
      <MemoryRouter>
        <Window
          windowTitle="Snaply"
          minSize={minSize}
        >
          <View
            style={`
              background: #1D1D1D;
            `}
          >
            <AppRoutes />
          </View>
        </Window>
      </MemoryRouter>
    );
  }
}

const containerStyle = `
  flex: 1;
`;

export default hot(App);
