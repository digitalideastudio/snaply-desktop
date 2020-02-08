import React from 'react';
import { Text, View, Button, useEventHandler } from '@nodegui/react-nodegui';
import { useHistory } from 'react-router';

export default function About() {
  const history = useHistory();
  const handler = useEventHandler(
    { clicked: () => history.push('/') },
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
      <Text>About</Text>
      <Text>You are now looking at the About Page</Text>
      <Button
        on={handler}
        text={`Go to Home`}
      />
    </View>
  );
}
