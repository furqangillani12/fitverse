import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/api';
import { GradientButton } from '../components/ui';
import { colors, gradients, radius } from '../theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      const { data } = await authService.login(email, password);
      await AsyncStorage.setItem('token', data.token);
      navigation.replace('Main');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={gradients.brand}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <View style={styles.card}>
        <LinearGradient colors={gradients.button} style={styles.badge}>
          <MaterialCommunityIcons name="dumbbell" size={26} color="#fff" />
        </LinearGradient>

        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue your fitness journey</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          placeholderTextColor={colors.textFaint}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor={colors.textFaint}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.forgot}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <GradientButton title="Sign In" onPress={handleLogin} loading={loading} />

        <View style={styles.signupRow}>
          <Text style={styles.muted}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.orText}>Or continue with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.social}>
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.social}>
            <Text style={styles.socialText}>Apple</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: 'center', padding: 22 },
  card: {
    backgroundColor: '#fff',
    borderRadius: radius.xl,
    padding: 26,
  },
  badge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 18,
  },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', color: colors.text },
  subtitle: { fontSize: 14, textAlign: 'center', color: colors.textMuted, marginBottom: 26 },
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 },
  input: {
    backgroundColor: colors.bgAlt,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    marginBottom: 16,
    color: colors.text,
  },
  forgot: { alignSelf: 'flex-end', marginTop: -4, marginBottom: 18 },
  forgotText: { color: colors.primary, fontSize: 13, fontWeight: '600' },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
  muted: { color: colors.textMuted, fontSize: 14 },
  link: { color: colors.primary, fontSize: 14, fontWeight: '700' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 22 },
  divider: { flex: 1, height: 1, backgroundColor: colors.border },
  orText: { color: colors.textMuted, fontSize: 13, marginHorizontal: 12 },
  socialRow: { flexDirection: 'row', justifyContent: 'space-between' },
  social: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingVertical: 13,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  socialText: { color: colors.text, fontSize: 15, fontWeight: '600' },
});
