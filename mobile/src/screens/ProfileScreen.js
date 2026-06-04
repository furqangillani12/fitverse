import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/api';
import { colors, gradients, radius, spacing, shadow } from '../theme';

const STATS = [
  { icon: 'target', tint: colors.tintBlue, color: colors.blue, value: '124', label: 'Workouts' },
  { icon: 'fire', tint: colors.tintPeach, color: colors.orange, value: '45.2k', label: 'Calories' },
  { icon: 'trophy', tint: colors.tintAmber, color: colors.amber, value: '15 days', label: 'Streak' },
  { icon: 'calendar', tint: colors.tintPurple, color: colors.purple, value: '3 months', label: 'Member' },
];

const ACHIEVEMENTS = [
  { emoji: '🔥', label: '7 Day Streak', color: colors.orange },
  { emoji: '🏃', label: 'Marathon Runner', color: colors.purple },
  { emoji: '🌅', label: 'Early Bird', color: colors.amber },
  { emoji: '💪', label: 'Calorie Crusher', color: colors.green },
];

const WEEK = [
  { label: 'Workouts', value: '5' },
  { label: 'Calories Burned', value: '8,420' },
  { label: 'Active Minutes', value: '312' },
];

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authService.me().then(({ data }) => setUser(data.user)).catch(() => {});
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <LinearGradient colors={gradients.brand} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity style={styles.gear}>
              <Ionicons name="settings-sharp" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={36} color="rgba(255,255,255,0.9)" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{user?.name || 'Athlete'}</Text>
              <Text style={styles.email}>{user?.email || ''}</Text>
              <View style={styles.badgeRow}>
                <View style={styles.badge}><Text style={styles.badgeText}>Pro Member</Text></View>
                <View style={styles.badge}><Text style={styles.badgeText}>Level 12</Text></View>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.statGrid}>
            {STATS.map((s) => (
              <View key={s.label} style={styles.statCard}>
                <View style={[styles.statBadge, { backgroundColor: s.tint }]}>
                  <MaterialCommunityIcons name={s.icon} size={20} color={s.color} />
                </View>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
            {ACHIEVEMENTS.map((a) => (
              <View key={a.label} style={styles.achCard}>
                <Text style={styles.achEmoji}>{a.emoji}</Text>
                <Text style={[styles.achLabel, { color: a.color }]}>{a.label}</Text>
              </View>
            ))}
          </ScrollView>

          <Text style={[styles.sectionTitle, { marginTop: 18, marginBottom: 12 }]}>This Week</Text>
          <View style={styles.weekCard}>
            {WEEK.map((w, i) => (
              <View key={w.label} style={[styles.weekRow, i < WEEK.length - 1 && styles.weekDivider]}>
                <Text style={styles.weekLabel}>{w.label}</Text>
                <Text style={styles.weekValue}>{w.value}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.logout} onPress={logout}>
            <Ionicons name="log-out-outline" size={18} color={colors.red} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingTop: 56, paddingHorizontal: spacing.lg, paddingBottom: 26,
    borderBottomLeftRadius: 28, borderBottomRightRadius: 28,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  back: { width: 32 },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', flex: 1, marginLeft: 4 },
  gear: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginTop: 22 },
  avatar: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.45)',
    alignItems: 'center', justifyContent: 'center',
  },
  profileInfo: { marginLeft: 16, flex: 1 },
  name: { color: '#fff', fontSize: 20, fontWeight: '700' },
  email: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 2 },
  badgeRow: { flexDirection: 'row', marginTop: 8 },
  badge: { backgroundColor: 'rgba(255,255,255,0.22)', borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 4, marginRight: 8 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  body: { padding: spacing.lg },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 8 },
  statCard: { width: '48%', backgroundColor: colors.card, borderRadius: radius.lg, padding: 16, marginBottom: 14, ...shadow.card },
  statBadge: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  statValue: { fontSize: 22, fontWeight: '700', color: colors.text },
  statLabel: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  viewAll: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  achCard: {
    width: 96, backgroundColor: colors.card, borderRadius: radius.md, padding: 12, marginRight: 12,
    alignItems: 'center', borderWidth: 1, borderColor: colors.border,
  },
  achEmoji: { fontSize: 28, marginBottom: 8 },
  achLabel: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  weekCard: { backgroundColor: colors.card, borderRadius: radius.lg, paddingHorizontal: 16, ...shadow.card },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14 },
  weekDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  weekLabel: { fontSize: 15, color: colors.textMuted },
  weekValue: { fontSize: 15, fontWeight: '700', color: colors.text },
  logout: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.red, borderRadius: radius.md, paddingVertical: 14, marginTop: 22,
  },
  logoutText: { color: colors.red, fontSize: 16, fontWeight: '600', marginLeft: 8 },
});
