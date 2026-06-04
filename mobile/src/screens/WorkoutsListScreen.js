import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadow } from '../theme';

const FILTERS = ['All', 'Cardio', 'Strength', 'Flexibility'];

// Category visual mapping.
const CATEGORY = {
  Cardio: { icon: 'heart', color: colors.red },
  Flexibility: { icon: 'trending-up', color: colors.purple },
  Strength: { icon: 'arm-flex', color: colors.primary },
};

export const WORKOUTS = [
  { id: 1, title: 'Full Body HIIT', level: 'Advanced', minutes: 30, cal: 350, exercises: 12, category: 'Cardio', icon: 'dumbbell', grad: ['#FF8A1B', '#FF3B30'] },
  { id: 2, title: 'Yoga Flow', level: 'Beginner', minutes: 45, cal: 180, exercises: 8, category: 'Flexibility', icon: 'meditation', grad: ['#22C55E', '#0EA5E9'] },
  { id: 3, title: 'Running Session', level: 'Intermediate', minutes: 40, cal: 420, exercises: 1, category: 'Cardio', icon: 'run', grad: ['#3B82F6', '#6366F1'] },
  { id: 4, title: 'Strength Training', level: 'Advanced', minutes: 50, cal: 300, exercises: 10, category: 'Strength', icon: 'weight-lifter', grad: ['#8B3DD6', '#5B5FEF'] },
];

export default function WorkoutsListScreen({ navigation }) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const list = WORKOUTS.filter(
    (w) =>
      (filter === 'All' || w.category === filter) &&
      w.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Workouts</Text>
        <View style={styles.search}>
          <Ionicons name="search" size={18} color={colors.textFaint} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search workouts..."
            placeholderTextColor={colors.textFaint}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <View style={styles.segment}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.chip, filter === f && styles.chipActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.chipText, filter === f && styles.chipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {list.map((w) => {
          const cat = CATEGORY[w.category];
          return (
            <TouchableOpacity
              key={w.id}
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('WorkoutDetail', { workout: w })}
            >
              <LinearGradient colors={w.grad} style={styles.thumb}>
                <MaterialCommunityIcons name={w.icon} size={30} color="rgba(255,255,255,0.9)" />
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>{w.level}</Text>
                </View>
              </LinearGradient>

              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{w.title}</Text>
                <View style={styles.metaRow}>
                  <MaterialCommunityIcons name="clock-outline" size={14} color={colors.textMuted} />
                  <Text style={styles.meta}>{w.minutes} min</Text>
                  <MaterialCommunityIcons name="fire" size={14} color={colors.orange} style={{ marginLeft: 12 }} />
                  <Text style={styles.meta}>{w.cal} cal</Text>
                </View>
                <View style={styles.metaRow}>
                  <MaterialCommunityIcons name="dumbbell" size={14} color={colors.textMuted} />
                  <Text style={styles.meta}>{w.exercises} exercises</Text>
                </View>
                <View style={styles.metaRow}>
                  <MaterialCommunityIcons name={cat.icon} size={14} color={cat.color} />
                  <Text style={[styles.meta, { color: cat.color }]}>{w.category}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingTop: 56, paddingHorizontal: spacing.lg, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.bg,
  },
  headerTitle: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 14 },
  search: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.bgAlt, borderRadius: radius.sm, paddingHorizontal: 12, height: 44,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: colors.text },
  segment: {
    flexDirection: 'row', backgroundColor: colors.bgAlt, borderRadius: radius.pill,
    padding: 4, marginTop: 14,
  },
  chip: { flex: 1, paddingVertical: 8, borderRadius: radius.pill, alignItems: 'center' },
  chipActive: { backgroundColor: colors.bg, ...shadow.card },
  chipText: { fontSize: 13, color: colors.textMuted, fontWeight: '600' },
  chipTextActive: { color: colors.text },
  list: { padding: spacing.lg, paddingBottom: 24 },
  card: {
    flexDirection: 'row', backgroundColor: colors.card, borderRadius: radius.lg,
    padding: 12, marginBottom: 14, ...shadow.card,
  },
  thumb: { width: 92, height: 92, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  levelBadge: { position: 'absolute', top: 6, left: 6, backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  levelText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  cardBody: { flex: 1, marginLeft: 14, justifyContent: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 6 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  meta: { fontSize: 13, color: colors.textMuted, marginLeft: 4 },
});
