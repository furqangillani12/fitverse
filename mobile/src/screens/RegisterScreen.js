import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/api';
import { GradientButton } from '../components/ui';
import { colors, gradients, radius } from '../theme';

const GENDERS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const GOALS = [
  { label: 'Weight Loss', value: 'weight_loss' },
  { label: 'Muscle Gain', value: 'muscle_gain' },
  { label: 'Endurance', value: 'endurance' },
  { label: 'General Fitness', value: 'general_fitness' },
];

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Missing fields', 'Name, email and password are required');
      return;
    }
    setLoading(true);
    try {
      const { data } = await authService.register({
        name,
        email,
        password,
        gender: gender || undefined,
        age: age ? Number(age) : undefined,
        fitnessGoal: fitnessGoal || undefined,
      });
      await AsyncStorage.setItem('token', data.token);
      navigation.replace('Main');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={gradients.brand} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.bg}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <LinearGradient colors={gradients.button} style={styles.badge}>
            <MaterialCommunityIcons name="account-plus" size={26} color="#fff" />
          </LinearGradient>

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start your fitness journey today</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} placeholder="Your name" placeholderTextColor={colors.textFaint} value={name} onChangeText={setName} />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="you@example.com" placeholderTextColor={colors.textFaint} autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />

          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor={colors.textFaint} secureTextEntry value={password} onChangeText={setPassword} />

          <Text style={styles.label}>Age (optional)</Text>
          <TextInput style={styles.input} placeholder="e.g. 24" placeholderTextColor={colors.textFaint} keyboardType="number-pad" value={age} onChangeText={setAge} />

          <Text style={styles.label}>Gender (optional)</Text>
          <View style={styles.chipRow}>
            {GENDERS.map((g) => (
              <TouchableOpacity key={g.value} style={[styles.chip, gender === g.value && styles.chipActive]} onPress={() => setGender(g.value)}>
                <Text style={[styles.chipText, gender === g.value && styles.chipTextActive]}>{g.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Fitness Goal (optional)</Text>
          <View style={styles.chipRow}>
            {GOALS.map((goal) => (
              <TouchableOpacity key={goal.value} style={[styles.chip, fitnessGoal === goal.value && styles.chipActive]} onPress={() => setFitnessGoal(goal.value)}>
                <Text style={[styles.chipText, fitnessGoal === goal.value && styles.chipTextActive]}>{goal.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <GradientButton title="Sign Up" onPress={handleRegister} loading={loading} style={{ marginTop: 8 }} />

          <View style={styles.signupRow}>
            <Text style={styles.muted}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 22 },
  card: { backgroundColor: '#fff', borderRadius: radius.xl, padding: 26 },
  badge: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 18 },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', color: colors.text },
  subtitle: { fontSize: 14, textAlign: 'center', color: colors.textMuted, marginBottom: 22 },
  label: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 },
  input: { backgroundColor: colors.bgAlt, borderRadius: radius.sm, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, marginBottom: 16, color: colors.text },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: 16, marginRight: 8, marginBottom: 8 },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.textMuted, fontSize: 14 },
  chipTextActive: { color: '#fff' },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
  muted: { color: colors.textMuted, fontSize: 14 },
  link: { color: colors.primary, fontSize: 14, fontWeight: '700' },
});
