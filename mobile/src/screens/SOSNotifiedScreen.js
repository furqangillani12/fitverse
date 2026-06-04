import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadow } from '../theme';

const CONTACTS = [
  { name: 'Emergency Services', sub: 'Dispatched • ETA 8 min', icon: 'medical', service: true },
  { name: 'Ahmed Mehmood (Brother)', sub: 'Notified • +92-309-6667777', icon: 'person' },
  { name: 'Hussnain (Friend)', sub: 'Notified • +92-324-5434312', icon: 'person' },
];

export default function SOSNotifiedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.iconCircle}>
          <Ionicons name="call" size={34} color={colors.green} />
        </View>
        <Text style={styles.title}>Emergency Contacts Notified</Text>
        <Text style={styles.subtitle}>Help is on the way. Stay calm and safe.</Text>

        {CONTACTS.map((c) => (
          <View key={c.name} style={[styles.contact, c.service && styles.contactService]}>
            <View style={[styles.contactIcon, { backgroundColor: c.service ? '#D9F2E4' : colors.tintPurple }]}>
              <Ionicons name={c.icon} size={18} color={c.service ? colors.green : colors.purple} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.contactName}>{c.name}</Text>
              <Text style={styles.contactSub}>{c.sub}</Text>
            </View>
            <View style={styles.dot} />
          </View>
        ))}

        <View style={styles.locationCard}>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={18} color={colors.blue} />
            <Text style={styles.locationTitle}>Location Shared</Text>
          </View>
          <Text style={styles.locationAddr}>Fitness Center, 123 Main Street</Text>
          <Text style={styles.locationCoords}>Lat: 40.7128, Long: 74.0060</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.lg, paddingTop: 48, alignItems: 'stretch' },
  iconCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#D9F2E4', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '700', color: colors.green, textAlign: 'center' },
  subtitle: { fontSize: 14, color: colors.textMuted, textAlign: 'center', marginTop: 6, marginBottom: 24 },
  contact: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: radius.md, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  contactService: { backgroundColor: '#EAFBF1', borderColor: '#C9EED7' },
  contactIcon: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  contactName: { fontSize: 15, fontWeight: '700', color: colors.text },
  contactSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.green },
  locationCard: { backgroundColor: '#EAF1FE', borderRadius: radius.md, padding: 16, marginTop: 6 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  locationTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginLeft: 8 },
  locationAddr: { fontSize: 14, color: colors.text, marginTop: 2 },
  locationCoords: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
  close: { backgroundColor: colors.text, height: 52, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', margin: spacing.lg },
  closeText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
