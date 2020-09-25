import React from 'react';
import {View, Text, Button} from 'react-native';

import {useAuth} from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const {signOut} = useAuth();

  return (
    <View>
      <Text>Dash </Text>
      <Button onPress={() => signOut()} title="Sair" />
    </View>
  );
};

export default Dashboard;
