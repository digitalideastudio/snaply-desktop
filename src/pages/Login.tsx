import React from 'react';
import { Text, View, Button, useEventHandler, LineEdit } from '@nodegui/react-nodegui';
import { useHistory } from 'react-router';
import { QPushButtonSignals } from '@nodegui/nodegui';

export default function Login() {
  const history = useHistory();

  const handler = useEventHandler<QPushButtonSignals>(
    { clicked: () => history.goBack() },
    [],
  );

  return (
    <View
      styleSheet={styleSheet}
    >
      <Text>Log In</Text>
      <View id="auth-wrapper">
        <View id="auth">

          <View id="emailRow">
            <Text id="textLogin">Login</Text>
            <LineEdit id="editLogin" />
          </View>

          <View id="passwordRow">
            <Text id="textLogin">Password</Text>
            <LineEdit id="editPassword" />
          </View>

          <View id="actionRow">
            <Button
              id="login"
              on={handler}
              text="Login"
            />
          </View>
        </View>
      </View>

      <Button
        on={handler}
        text={`Back`}
      />
    </View>
  );
}

const styleSheet = `
  #auth-wrapper {
      padding-top: 150;
  }

  #auth {
    flex-direction: 'column';
    width: 500;
    height: 300;
    align-self: 'center';
    padding-horizontal: 50;
    padding-vertical: 20;
  }

  #emailRow {
    flex: 1;
    flex-direction: 'row';
  }
  
  #passwordRow {
    flex: 1;
    flex-direction: 'row';
  }
  
  #textLogin, #textPassword {
    width: 100;
    color: #BBBBBB;
  }
  
  #editLogin, #editPassword {
    flex: 1;
  }
  
  #login {
    border: 0;
    padding-horizontal: 5;
    padding-vertical: 5;
  }
`;
