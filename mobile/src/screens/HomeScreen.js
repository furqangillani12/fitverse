import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { authService } from '../services/api';
import { colors, gradients, radius, spacing, shadow } from '../theme';

// Mock data matching the Figma (wired to real data feature-by-feature later).
const STATS = [
  { icon: 'fire', lib: MaterialCommunityIcons, tint: colors.tintPeach, color: colors.orange, value: '2,340', label: 'Calories Burned' },
  { icon: 'clock-outline', lib: MaterialCommunityIcons, tint: colors.tintBlue, color: colors.blue, value: '87', label: 'Active Minutes' },
  { icon: 'lightning-bolt', lib: MaterialCommunityIcons, tint: colors.tintPurple, color: colors.purple, value: '12', label: 'Workouts' },
  { icon: 'trophy', lib: MaterialCommunityIcons, tint: colors.tintAmber, color: colors.amber, value: '15', label: 'Streak Days' },
];

const GOALS = [
  { title: 'Weekly Workout Goal', value: '4/5 workouts', progress: 0.8 },
  { title: 'Daily Calorie Goal', value: '1850/2000 kcal', progress: 0.92 },
  { title: 'Water Intake', value: '6/8 glasses', progress: 0.75 },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 18) return 'Good Afternoon';
  return 'Good Evening';
}

function ProgressBar({ value }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.round(value * 100)}%` }]} />
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');

  useEffect(() => {
    authService.me().then(({ data }) => setName(data.user?.name || '')).catch(() => {});
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <LinearGradient colors={gradients.brand} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>{greeting()}</Text>
              <Text style={styles.name}>{name || 'Athlete'}</Text>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="person" size={18} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="settings-sharp" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statGrid}>
            {STATS.map((s) => {
              const Icon = s.lib;
              return (
                <View key={s.label} style={styles.statTile}>
                  <View style={[styles.statBadge, { backgroundColor: s.tint }]}>
                    <Icon name={s.icon} size={18} color={s.color} />
                  </View>
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              );
            })}
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Today's Goals</Text>
            <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
          </View>

          {GOALS.map((g) => (
            <View key={g.title} style={styles.goalCard}>
              <View style={styles.goalRow}>
                <Text style={styles.goalTitle}>{g.title}</Text>
                <Text style={styles.goalValue}>{g.value}</Text>
              </View>
              <ProgressBar value={g.progress} />
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('SOS')} activeOpacity={0.9}>
        <LinearGradient colors={gradients.red} style={styles.fabInner}>
          <MaterialCommunityIcons name="alarm-light" size={26} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingTop: 56,
    paddingHorizontal: spacing.lg,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { color: 'rgba(255,255,255,0.85)', fontSize: 14 },
  name: { color: '#fff', fontSize: 24, fontWeight: '700', marginTop: 2 },
  headerIcons: { flexDirection: 'row' },
  circleBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center', justifyContent: 'center', marginLeft: 10,
  },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 22 },
  statTile: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: 12,
  },
  statBadge: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  statValue: { color: '#fff', fontSize: 22, fontWeight: '700' },
  statLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 2 },
  body: { padding: spacing.lg },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  viewAll: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  goalCard: { backgroundColor: colors.card, borderRadius: radius.lg, padding: 16, marginBottom: 12, ...shadow.card },
  goalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  goalTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
  goalValue: { fontSize: 13, color: colors.textMuted },
  track: { height: 8, borderRadius: 4, backgroundColor: '#E9EAF0', overflow: 'hidden' },
  fill: { height: 8, borderRadius: 4, backgroundColor: colors.text },
  fab: { position: 'absolute', right: 20, bottom: 24 },
  fabInner: {
    width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center',
    shadowColor: colors.red, shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 5,
  },
});
