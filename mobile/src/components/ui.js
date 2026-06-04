// Shared UI primitives used across all Fitverse screens.
import { Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, radius, spacing, shadow } from '../theme';

// Full-width gradient button (Sign In, Join Challenge, Get Started, etc.)
export function GradientButton({ title, onPress, loading, colors: g = gradients.button, style }) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} disabled={loading} style={style}>
      <LinearGradient
        colors={g}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.btn}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

// White card with soft shadow.
export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

// Small rounded pill/badge (difficulty labels, "94% match", "Pro Member").
export function Pill({ label, bg = colors.tintGreen, color = colors.green, style }) {
  return (
    <View style={[styles.pill, { backgroundColor: bg }, style]}>
      <Text style={[styles.pillText, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.card,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  pillText: { fontSize: 11, fontWeight: '700' },
});
