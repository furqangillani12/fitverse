import { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { gradients, radius } from '../theme';

const SLIDES = [
  {
    icon: 'dumbbell',
    iconColor: '#3B5BFE',
    title: 'Track Your Fitness',
    subtitle: 'Monitor your workouts, nutrition, and progress all in one place',
  },
  {
    icon: 'target',
    iconColor: '#8B3DD6',
    title: 'Set Your Goals',
    subtitle: 'Create personalized fitness goals and crush them with our guided plans',
  },
  {
    icon: 'trophy',
    iconColor: '#E0A02E',
    title: 'Join Challenges',
    subtitle: 'Compete with friends, earn rewards, and stay motivated every day',
  },
];

export default function OnboardingScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const scrollRef = useRef(null);
  const isLast = index === SLIDES.length - 1;

  const goTo = (i) => {
    scrollRef.current?.scrollTo({ x: i * width, animated: true });
    setIndex(i);
  };

  const finish = () => navigation.replace('Login');

  const handleNext = () => (isLast ? finish() : goTo(index + 1));

  const onScroll = (e) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== index) setIndex(i);
  };

  return (
    <LinearGradient
      colors={gradients.brand}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.fill}
    >
      <TouchableOpacity style={styles.skip} onPress={finish}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        style={styles.fill}
      >
        {SLIDES.map((s) => (
          <View key={s.title} style={[styles.slide, { width }]}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name={s.icon} size={64} color={s.iconColor} />
            </View>
            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.subtitle}>{s.subtitle}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.9}>
          <Text style={styles.nextText}>
            {isLast ? 'Get Started' : 'Next  ›'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  skip: { position: 'absolute', top: 56, right: 24, zIndex: 10 },
  skipText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  slide: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 36 },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  title: { color: '#fff', fontSize: 26, fontWeight: '700', textAlign: 'center', marginBottom: 14 },
  subtitle: { color: 'rgba(255,255,255,0.92)', fontSize: 15, textAlign: 'center', lineHeight: 22 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.45)',
    marginHorizontal: 4,
  },
  dotActive: { width: 26, backgroundColor: '#fff' },
  footer: { paddingHorizontal: 24, paddingBottom: 40 },
  nextBtn: {
    backgroundColor: '#fff',
    height: 54,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: { color: '#5B5FEF', fontSize: 16, fontWeight: '700' },
});
