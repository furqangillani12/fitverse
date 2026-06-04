import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, radius } from '../theme';

const STEPS = [
  { icon: 'call', tint: colors.tintBlue, color: colors.blue, text: 'Emergency contacts will be called immediately' },
  { icon: 'location', tint: colors.tintPurple, color: colors.purple, text: 'Your current location will be shared' },
  { icon: 'medkit', tint: colors.tintAmber, color: colors.amber, text: 'Your health data will be sent to responders' },
];

export default function SOSScreen({ navigation }) {
  return (
    <View style={styles.backdrop}>
      <View style={styles.card}>
        <LinearGradient colors={gradients.red} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons name="warning" size={22} color="#fff" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.headerTitle}>Emergency SOS</Text>
            <Text style={styles.headerSub}>Quick emergency assistance</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={22} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.callout}>
            <View style={styles.calloutRow}>
              <Ionicons name="heart" size={18} color={colors.red} />
              <Text style={styles.calloutTitle}>Medical Emergency</Text>
            </View>
            <Text style={styles.calloutText}>
              If you're experiencing a health emergency during your workout, activate SOS to alert emergency contacts.
            </Text>
          </View>

          <Text style={styles.whatTitle}>What happens when you activate SOS:</Text>
          {STEPS.map((s) => (
            <View key={s.text} style={styles.stepRow}>
              <View style={[styles.stepIcon, { backgroundColor: s.tint }]}>
                <Ionicons name={s.icon} size={15} color={s.color} />
              </View>
              <Text style={styles.stepText}>{s.text}</Text>
            </View>
          ))}

          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.replace('SOSNotified')}>
            <LinearGradient colors={gradients.red} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.activate}>
              <Ionicons name="alert-circle" size={18} color="#fff" />
              <Text style={styles.activateText}>Activate Emergency SOS</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancel} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(10,10,30,0.55)', justifyContent: 'center', padding: 18 },
  card: { backgroundColor: '#fff', borderRadius: radius.xl, overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 18 },
  headerIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  headerSub: { color: 'rgba(255,255,255,0.9)', fontSize: 13, marginTop: 1 },
  body: { padding: 18 },
  callout: { backgroundColor: '#FDECEC', borderWidth: 1, borderColor: '#F8D4D4', borderRadius: radius.md, padding: 14, marginBottom: 20 },
  calloutRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  calloutTitle: { color: colors.red, fontSize: 15, fontWeight: '700', marginLeft: 8 },
  calloutText: { color: '#D9534F', fontSize: 13, lineHeight: 19 },
  whatTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 14 },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  stepIcon: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  stepText: { flex: 1, fontSize: 13, color: colors.textMuted },
  activate: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 52, borderRadius: radius.md, marginTop: 8 },
  activateText: { color: '#fff', fontSize: 15, fontWeight: '700', marginLeft: 8 },
  cancel: { backgroundColor: colors.bgAlt, height: 48, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  cancelText: { color: colors.text, fontSize: 15, fontWeight: '600' },
});
