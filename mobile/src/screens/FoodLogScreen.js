import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, gradients, radius, spacing, shadow } from '../theme';

const MACROS = [
  { value: 73, label: 'Protein', color: colors.blue, bg: colors.tintBlue },
  { value: 58, label: 'Carbs', color: colors.purple, bg: colors.tintPurple },
  { value: 38, label: 'Fat', color: colors.amber, bg: colors.tintAmber },
];

const PERIODS = ['Today', 'Week', 'Month'];

const MEALS = [
  { emoji: '🍳', name: 'Scrambled Eggs', detail: '220 cal • P: 18g • C: 2g • F: 15g' },
  { emoji: '🍞', name: 'Whole Wheat Toast', detail: '140 cal • P: 5g • C: 26g • F: 2g' },
];

export default function FoodLogScreen({ navigation }) {
  const [period, setPeriod] = useState('Today');
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Food Log</Text>
          <View style={styles.search}>
            <Ionicons name="search" size={18} color={colors.textFaint} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search foods..."
              placeholderTextColor={colors.textFaint}
              value={query}
              onChangeText={setQuery}
            />
          </View>
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('MealCamera')}>
            <LinearGradient colors={gradients.orange} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.snap}>
              <Ionicons name="camera" size={18} color="#fff" />
              <Text style={styles.snapText}>Snap to Track</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Text style={styles.sectionTitle}>Daily Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Calories</Text>
              <Text style={styles.summaryValue}>890 / 2000 kcal</Text>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: '44.5%' }]} />
            </View>
            <Text style={styles.remaining}>1110 kcal remaining</Text>
          </View>

          <View style={styles.macroRow}>
            {MACROS.map((m) => (
              <View key={m.label} style={[styles.macroCard, { backgroundColor: m.bg }]}>
                <Text style={[styles.macroValue, { color: m.color }]}>
                  {m.value}<Text style={styles.macroUnit}> g</Text>
                </Text>
                <Text style={styles.macroLabel}>{m.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.segment}>
            {PERIODS.map((p) => (
              <TouchableOpacity key={p} style={[styles.chip, period === p && styles.chipActive]} onPress={() => setPeriod(p)}>
                <Text style={[styles.chipText, period === p && styles.chipTextActive]}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.mealHeader}>
            <View style={styles.mealHeaderLeft}>
              <Text style={styles.mealTitle}>Breakfast</Text>
              <View style={styles.timeRow}>
                <Ionicons name="time-outline" size={13} color={colors.textMuted} />
                <Text style={styles.time}>8:30 AM</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.addBtn}>
              <Ionicons name="add" size={16} color={colors.text} />
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>

          {MEALS.map((m) => (
            <View key={m.name} style={styles.mealCard}>
              <View style={styles.mealThumb}><Text style={{ fontSize: 22 }}>{m.emoji}</Text></View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.mealName}>{m.name}</Text>
                <Text style={styles.mealDetail}>{m.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingTop: 56, paddingHorizontal: spacing.lg, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 14 },
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bgAlt, borderRadius: radius.sm, paddingHorizontal: 12, height: 44 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: colors.text },
  snap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 48, borderRadius: radius.sm, marginTop: 12 },
  snapText: { color: '#fff', fontSize: 15, fontWeight: '700', marginLeft: 8 },
  body: { padding: spacing.lg },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 12 },
  summaryCard: { backgroundColor: '#FDF0EC', borderRadius: radius.lg, padding: 16, marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontSize: 15, color: colors.text },
  summaryValue: { fontSize: 14, fontWeight: '600', color: colors.text },
  track: { height: 8, borderRadius: 4, backgroundColor: '#E7D9D3', overflow: 'hidden' },
  fill: { height: 8, borderRadius: 4, backgroundColor: colors.text },
  remaining: { fontSize: 13, color: colors.textMuted, marginTop: 10 },
  macroRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  macroCard: { width: '31.5%', borderRadius: radius.md, padding: 14 },
  macroValue: { fontSize: 22, fontWeight: '700' },
  macroUnit: { fontSize: 12, fontWeight: '600' },
  macroLabel: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  segment: { flexDirection: 'row', backgroundColor: colors.bgAlt, borderRadius: radius.pill, padding: 4, marginBottom: 20 },
  chip: { flex: 1, paddingVertical: 8, borderRadius: radius.pill, alignItems: 'center' },
  chipActive: { backgroundColor: colors.bg, ...shadow.card },
  chipText: { fontSize: 13, color: colors.textMuted, fontWeight: '600' },
  chipTextActive: { color: colors.text },
  mealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  mealHeaderLeft: {},
  mealTitle: { fontSize: 17, fontWeight: '700', color: colors.text },
  timeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  time: { fontSize: 12, color: colors.textMuted, marginLeft: 4 },
  addBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 12, paddingVertical: 7 },
  addText: { fontSize: 13, fontWeight: '600', color: colors.text, marginLeft: 2 },
  mealCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: radius.md, padding: 12, marginBottom: 12, ...shadow.card },
  mealThumb: { width: 44, height: 44, borderRadius: radius.sm, backgroundColor: colors.bgAlt, alignItems: 'center', justifyContent: 'center' },
  mealName: { fontSize: 15, fontWeight: '600', color: colors.text },
  mealDetail: { fontSize: 12, color: colors.textMuted, marginTop: 3 },
});
