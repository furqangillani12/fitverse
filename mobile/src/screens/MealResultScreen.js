import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, gradients, radius } from '../theme';

// Recognized-meal result (TC-4). Values are mock CV output for now.
const MACROS = [
  { value: '380', unit: 'kcal', label: 'Calories' },
  { value: '35', unit: 'g', label: 'Protein' },
  { value: '18', unit: 'g', label: 'Carbs' },
  { value: '16', unit: 'g', label: 'Fat' },
];

export default function MealResultScreen({ navigation }) {
  const save = () => {
    Alert.alert('Saved', 'Grilled Chicken Salad added to your log.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={22} color="#fff" />
      </TouchableOpacity>

      <LinearGradient colors={['#16A34A', '#0E7A36']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.photo}>
        <MaterialCommunityIcons name="camera-outline" size={56} color="rgba(255,255,255,0.35)" />
      </LinearGradient>

      <View style={styles.sheet}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Grilled Chicken Salad</Text>
          <View style={styles.matchPill}><Text style={styles.matchText}>94% match</Text></View>
        </View>

        <View style={styles.macroGrid}>
          {MACROS.map((m) => (
            <View key={m.label} style={styles.macroCard}>
              <Text style={styles.macroValue}>
                {m.value}<Text style={styles.macroUnit}> {m.unit}</Text>
              </Text>
              <Text style={styles.macroLabel}>{m.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.serving}>Serving: 1 bowl</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.retake} onPress={() => navigation.replace('MealCamera')}>
            <Ionicons name="refresh" size={18} color={colors.text} />
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.9} onPress={save}>
            <LinearGradient colors={gradients.green} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.save}>
              <Ionicons name="checkmark" size={18} color="#fff" />
              <Text style={styles.saveText}>Save</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  close: {
    position: 'absolute', top: 52, left: 20, zIndex: 10,
    width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center', justifyContent: 'center',
  },
  photo: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 22, paddingBottom: 36 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  title: { fontSize: 19, fontWeight: '700', color: colors.text, flex: 1 },
  matchPill: { backgroundColor: colors.tintGreen, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 5 },
  matchText: { color: colors.green, fontSize: 12, fontWeight: '700' },
  macroGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  macroCard: { width: '48%', backgroundColor: colors.bgAlt, borderRadius: radius.md, padding: 16, marginBottom: 12 },
  macroValue: { fontSize: 22, fontWeight: '700', color: colors.text },
  macroUnit: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  macroLabel: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  serving: { fontSize: 14, color: colors.textMuted, marginTop: 6, marginBottom: 20 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  retake: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm,
    paddingVertical: 14, paddingHorizontal: 22, marginRight: 12,
  },
  retakeText: { fontSize: 15, fontWeight: '600', color: colors.text, marginLeft: 6 },
  save: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: radius.sm },
  saveText: { color: '#fff', fontSize: 15, fontWeight: '700', marginLeft: 6 },
});
