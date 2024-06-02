
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../css/LoginButton'

export default function LoginButton({onPress, value}) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
        <Text style={styles.textButton}>{value}</Text>
    </TouchableOpacity>
  );
}
