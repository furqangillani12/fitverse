import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadow } from '../theme';
import { WORKOUTS } from './WorkoutsListScreen';

const INITIAL_EXERCISES = [
  { name: 'Jumping Jacks', detail: '30 reps × 3 sets', done: true },
  { name: 'Push-ups', detail: '15 reps × 3 sets', done: true },
  { name: 'Squats', detail: '20 reps × 3 sets', done: true },
  { name: 'Burpees', detail: '10 reps × 3 sets', done: true },
  { name: 'Plank', detail: '1 min × 3 sets', done: false },
  { name: 'Mountain Climbers', detail: '30 reps × 3 sets', done: false },
  { name: 'Lunges', detail: '12 reps × 3 sets', done: false },
  { name: 'High Knees', detail: '40 reps × 3 sets', done: false },
];

export default function WorkoutDetailScreen({ navigation, route }) {
  const workout = route.params?.workout || WORKOUTS[0];
  const [exercises, setExercises] = useState(INITIAL_EXERCISES);

  const doneCount = exercises.filter((e) => e.done).length;
  const total = exercises.length;
  const currentIndex = exercises.findIndex((e) => !e.done);

  const complete = (idx) => {
    setExercises((prev) => prev.map((e, i) => (i === idx ? { ...e, done: true } : e)));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.hero}>
          <LinearGradient colors={workout.grad} style={StyleSheet.absoluteFill} />
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.65)']} style={StyleSheet.absoluteFill} />
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{workout.title}</Text>
            <View style={styles.heroMeta}>
              <MaterialCommunityIcons name="clock-outline" size={15} color="#fff" />
              <Text style={styles.heroMetaText}>{workout.minutes} min</Text>
              <MaterialCommunityIcons name="fire" size={15} color="#fff" style={{ marginLeft: 14 }} />
              <Text style={styles.heroMetaText}>{workout.cal} cal</Text>
              <MaterialCommunityIcons name="dumbbell" size={15} color="#fff" style={{ marginLeft: 14 }} />
              <Text style={styles.heroMetaText}>{total} exercises</Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.progressCard}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Workout Progress</Text>
              <Text style={styles.progressValue}>{doneCount}/{total}</Text>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${(doneCount / total) * 100}%` }]} />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Exercise List</Text>

          {exercises.map((ex, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <View
                key={ex.name}
                style={[
                  styles.exCard,
                  ex.done && styles.exDone,
                  isCurrent && styles.exCurrent,
                ]}
              >
                <View
                  style={[
                    styles.exCircle,
                    ex.done ? styles.circleDone : isCurrent ? styles.circleCurrent : styles.circleUpcoming,
                  ]}
                >
                  {ex.done ? (
                    <Ionicons name="checkmark" size={18} color="#fff" />
                  ) : (
                    <Text style={[styles.exNum, isCurrent && { color: '#fff' }]}>{idx + 1}</Text>
                  )}
                </View>

                <View style={styles.exInfo}>
                  <Text style={[styles.exName, ex.done && styles.exNameDone]}>{ex.name}</Text>
                  <Text style={styles.exDetail}>{ex.detail}</Text>
                </View>

                {isCurrent && (
                  <TouchableOpacity style={styles.completeBtn} onPress={() => complete(idx)}>
                    <Text style={styles.completeText}>Complete</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hero: { height: 200, justifyContent: 'flex-end' },
  back: {
    position: 'absolute', top: 52, left: 16, width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center',
  },
  heroContent: { padding: spacing.lg },
  heroTitle: { color: '#fff', fontSize: 26, fontWeight: '700' },
  heroMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  heroMetaText: { color: '#fff', fontSize: 13, marginLeft: 4 },
  body: { padding: spacing.lg },
  progressCard: { backgroundColor: '#EEF2FF', borderRadius: radius.lg, padding: 16, marginBottom: 22 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  progressLabel: { fontSize: 15, fontWeight: '600', color: colors.text },
  progressValue: { fontSize: 15, fontWeight: '700', color: colors.primary },
  track: { height: 8, borderRadius: 4, backgroundColor: '#D9DEF5', overflow: 'hidden' },
  fill: { height: 8, borderRadius: 4, backgroundColor: colors.text },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 14 },
  exCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card,
    borderRadius: radius.md, padding: 14, marginBottom: 12,
    borderWidth: 1, borderColor: colors.border,
  },
  exDone: { backgroundColor: '#F0FBF4', borderColor: '#D6F0E0' },
  exCurrent: { borderColor: colors.primary, borderWidth: 1.5 },
  exCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  circleDone: { backgroundColor: colors.green },
  circleCurrent: { backgroundColor: colors.primary },
  circleUpcoming: { backgroundColor: '#EEF0F5' },
  exNum: { fontSize: 14, fontWeight: '700', color: colors.textMuted },
  exInfo: { flex: 1, marginLeft: 14 },
  exName: { fontSize: 15, fontWeight: '600', color: colors.text },
  exNameDone: { textDecorationLine: 'line-through', color: colors.textMuted },
  exDetail: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  completeBtn: { backgroundColor: colors.primary, borderRadius: radius.sm, paddingHorizontal: 14, paddingVertical: 8 },
  completeText: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
