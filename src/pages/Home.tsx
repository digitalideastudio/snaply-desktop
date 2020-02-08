import React from 'react';
import { Text, View, Button, useEventHandler } from '@nodegui/react-nodegui';
import { useHistory } from 'react-router';

export default function Home() {
  const history = useHistory();
  const handler = useEventHandler(
    { clicked: () => history.push('/about') },
    [],
  );
  return (
    <View
      style={`
        height: '100%'; 
        align-items: 'center';
        justify-content: 'center';
      `}
    >
      <Text>Home Page</Text>
      <Text>You are now looking at Home Page</Text>
      <Button
        on={handler}
        text="Go to about"
      />
    </View>
  );
}
