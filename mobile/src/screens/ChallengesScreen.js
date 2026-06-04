import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, gradients, radius, spacing, shadow } from '../theme';

const ACTIVE = [
  { title: '30-Day Workout Streak', desc: 'Complete a workout every day for 30 days', icon: 'fire', grad: ['#FB4E4E', '#E11D48'], time: '15 days', people: '1 participant', pts: '500 pts', value: '15 / 30', pct: 50 },
  { title: 'Team Challenge: 1000km', desc: 'Run 1000km as a team this month', icon: 'account-group', grad: ['#5B8DEF', '#9B43D6'], time: '8 days', people: '12 teammates', pts: '1000 pts', value: '642 / 1000', pct: 64 },
  { title: 'Burn 10,000 Calories', desc: 'Burn a total of 10,000 calories this week', icon: 'target', grad: ['#22C55E', '#0E9F5A'], time: '3 days', people: '1 participant', pts: '300 pts', value: '6420 / 10000', pct: 64 },
];

const AVAILABLE = [
  { title: 'Weekly Yoga Master', desc: 'Complete 5 yoga sessions this week', icon: 'meditation', grad: ['#EC4899', '#D6249F'], tag: 'personal', time: '7 days', people: '234 joined', pts: '200 pts' },
  { title: 'Community Steps Challenge', desc: 'Join 500+ members walking 100,000 steps', icon: 'account-group', grad: ['#3B82F6', '#0EA5C0'], tag: 'community', time: '30 days', people: '542 joined', pts: '750 pts' },
  { title: 'Strength Building Month', desc: 'Complete 20 strength workouts in 30 days', icon: 'trending-up', grad: ['#FB923C', '#F97316'], tag: 'personal', time: '30 days', people: '189 joined', pts: '600 pts' },
];

const LEADERBOARD = [
  { rank: 1, name: 'Musa', pts: 2450, medal: '#F0B429' },
  { rank: 2, name: 'Wasif', pts: 2380, medal: '#A8B0BD' },
  { rank: 3, name: 'Hussnain', pts: 2310, medal: '#CD7F32' },
  { rank: 4, name: 'You', pts: 1890, you: true },
  { rank: 5, name: 'Ahmed', pts: 1820 },
];

function Meta({ icon, text }) {
  return (
    <View style={styles.metaItem}>
      <MaterialCommunityIcons name={icon} size={13} color="rgba(255,255,255,0.9)" />
      <Text style={styles.metaText}>{text}</Text>
    </View>
  );
}

export default function ChallengesScreen() {
  const [tab, setTab] = useState('Active');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <LinearGradient colors={gradients.orange} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
          <Text style={styles.headerTitle}>Challenges</Text>
          <Text style={styles.headerSub}>Push your limits and earn rewards</Text>
        </LinearGradient>

        <View style={styles.toggleWrap}>
          <View style={styles.toggle}>
            {['Active', 'Available'].map((t) => (
              <TouchableOpacity key={t} style={[styles.toggleBtn, tab === t && styles.toggleActive]} onPress={() => setTab(t)}>
                <Text style={[styles.toggleText, tab === t && styles.toggleTextActive]}>
                  {t === 'Active' ? 'Active (3)' : 'Available'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.body}>
          {tab === 'Active' ? (
            <>
              {ACTIVE.map((c) => (
                <View key={c.title} style={styles.card}>
                  <LinearGradient colors={c.grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.cardTop}>
                    <View style={styles.cardTopRow}>
                      <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name={c.icon} size={20} color="#fff" />
                      </View>
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.cardTitle}>{c.title}</Text>
                        <Text style={styles.cardDesc}>{c.desc}</Text>
                      </View>
                    </View>
                    <View style={styles.metaRow}>
                      <Meta icon="clock-outline" text={c.time} />
                      <Meta icon="account-multiple" text={c.people} />
                      <Meta icon="trophy" text={c.pts} />
                    </View>
                  </LinearGradient>
                  <View style={styles.cardBottom}>
                    <View style={styles.progressRow}>
                      <Text style={styles.progressLabel}>Progress</Text>
                      <Text style={styles.progressValue}>{c.value}</Text>
                    </View>
                    <View style={styles.track}><View style={[styles.fill, { width: `${c.pct}%` }]} /></View>
                    <Text style={styles.pctText}>{c.pct}% complete</Text>
                  </View>
                </View>
              ))}

              <Text style={styles.sectionTitle}>Global Leaderboard</Text>
              <View style={styles.lbCard}>
                {LEADERBOARD.map((r, i) => (
                  <View key={r.rank} style={[styles.lbRow, r.you && styles.lbYou, i < LEADERBOARD.length - 1 && styles.lbDivider]}>
                    <MaterialCommunityIcons
                      name={r.medal ? 'medal' : 'star'}
                      size={22}
                      color={r.medal || (r.you ? '#F0B429' : '#F0B429')}
                    />
                    <Text style={styles.lbRank}>#{r.rank}</Text>
                    <Text style={[styles.lbName, r.you && { fontWeight: '700' }]}>{r.name}</Text>
                    <MaterialCommunityIcons name="trophy" size={15} color={colors.orange} />
                    <Text style={styles.lbPts}>{r.pts}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            AVAILABLE.map((c) => (
              <View key={c.title} style={styles.card}>
                <LinearGradient colors={c.grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.cardTop}>
                  <View style={styles.cardTopRow}>
                    <View style={styles.iconCircle}>
                      <MaterialCommunityIcons name={c.icon} size={20} color="#fff" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <View style={styles.titleTagRow}>
                        <Text style={[styles.cardTitle, { flex: 1 }]}>{c.title}</Text>
                        <View style={styles.tag}><Text style={styles.tagText}>{c.tag}</Text></View>
                      </View>
                      <Text style={styles.cardDesc}>{c.desc}</Text>
                    </View>
                  </View>
                  <View style={styles.metaRow}>
                    <Meta icon="clock-outline" text={c.time} />
                    <Meta icon="account-multiple" text={c.people} />
                    <Meta icon="trophy" text={c.pts} />
                  </View>
                </LinearGradient>
                <View style={styles.cardBottom}>
                  <TouchableOpacity activeOpacity={0.9} onPress={() => Alert.alert('Challenge joined', `You joined "${c.title}".`)}>
                    <LinearGradient colors={gradients.button} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.joinBtn}>
                      <Text style={styles.joinText}>Join Challenge</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgAlt },
  header: { paddingTop: 56, paddingHorizontal: spacing.lg, paddingBottom: 28, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: '700' },
  headerSub: { color: 'rgba(255,255,255,0.92)', fontSize: 14, marginTop: 4 },
  toggleWrap: { paddingHorizontal: spacing.lg, marginTop: -18 },
  toggle: { flexDirection: 'row', backgroundColor: colors.bgAlt, borderRadius: radius.pill, padding: 4, ...shadow.card },
  toggleBtn: { flex: 1, paddingVertical: 10, borderRadius: radius.pill, alignItems: 'center' },
  toggleActive: { backgroundColor: colors.bg, ...shadow.card },
  toggleText: { fontSize: 14, color: colors.textMuted, fontWeight: '600' },
  toggleTextActive: { color: colors.text },
  body: { padding: spacing.lg },
  card: { borderRadius: radius.lg, marginBottom: 16, overflow: 'hidden', backgroundColor: colors.card, ...shadow.card },
  cardTop: { padding: 16 },
  cardTopRow: { flexDirection: 'row', alignItems: 'flex-start' },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },
  titleTagRow: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cardDesc: { color: 'rgba(255,255,255,0.92)', fontSize: 13, marginTop: 3 },
  tag: { backgroundColor: 'rgba(255,255,255,0.28)', borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 3, marginLeft: 8 },
  tagText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  metaRow: { flexDirection: 'row', marginTop: 14 },
  metaItem: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
  metaText: { color: 'rgba(255,255,255,0.95)', fontSize: 12, marginLeft: 4 },
  cardBottom: { padding: 16 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressLabel: { fontSize: 14, fontWeight: '600', color: colors.text },
  progressValue: { fontSize: 14, fontWeight: '700', color: colors.primary },
  track: { height: 8, borderRadius: 4, backgroundColor: '#E9EAF0', overflow: 'hidden' },
  fill: { height: 8, borderRadius: 4, backgroundColor: colors.text },
  pctText: { fontSize: 12, color: colors.textMuted, marginTop: 8 },
  joinBtn: { height: 48, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  joinText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 6, marginBottom: 14 },
  lbCard: { backgroundColor: colors.card, borderRadius: radius.lg, paddingHorizontal: 14, ...shadow.card },
  lbRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  lbYou: { backgroundColor: '#EEF2FF', marginHorizontal: -14, paddingHorizontal: 14, borderRadius: radius.sm },
  lbDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  lbRank: { fontSize: 14, fontWeight: '700', color: colors.text, marginLeft: 10, width: 32 },
  lbName: { flex: 1, fontSize: 15, color: colors.text },
  lbPts: { fontSize: 14, fontWeight: '700', color: colors.orange, marginLeft: 4 },
});
