import { Alert, Linking } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export default (onSuccess = () => null) => {
  const permission = PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL;
  check(permission).then(result => {
    if (result === RESULTS.DENIED) {
      request(permission).then(data => data === RESULTS.GRANTED && onSuccess());
    } else if (result === RESULTS.GRANTED) {
      onSuccess();
    } else if (result === RESULTS.UNAVAILABLE) {
      Alert.alert('Sorry', 'You need to turn on Bluetooth', [
        { text: 'Cancel' },
        { text: 'Turn On Bluetooth', onPress: Linking.openSettings },
      ]);
    } else if (result === RESULTS.BLOCKED) {
      Alert.alert('Sorry', 'You have blocked this action before this', [
        { text: 'Cancel' },
        { text: 'Allow Bluetooth Permission', onPress: Linking.openSettings },
      ]);
    }
  });
};
