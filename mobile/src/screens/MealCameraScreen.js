import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme';

// Simulated camera capture screen (TC-4 meal recognition entry).
// A real expo-camera preview can be dropped in here later.
export default function MealCameraScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={22} color="#fff" />
      </TouchableOpacity>

      <View style={styles.center}>
        <View style={styles.frameCard}>
          <View style={styles.frame}>
            <MaterialCommunityIcons name="camera-outline" size={48} color="#5B6478" />
            <Text style={styles.frameText}>Position your food in the frame</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.tip}>
          <Text style={styles.tipText}>💡 For best results, capture the entire meal in good lighting</Text>
        </View>
        <TouchableOpacity style={styles.shutter} onPress={() => navigation.replace('MealResult')} activeOpacity={0.8}>
          <View style={styles.shutterInner} />
        </TouchableOpacity>
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
  center: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  frameCard: { backgroundColor: '#101728', borderRadius: 20, padding: 18 },
  frame: {
    borderWidth: 1.5, borderColor: '#3A4560', borderStyle: 'dashed', borderRadius: 12,
    height: 240, alignItems: 'center', justifyContent: 'center',
  },
  frameText: { color: '#6EA8FE', fontSize: 14, marginTop: 14 },
  footer: { paddingBottom: 44, paddingHorizontal: 20, alignItems: 'center' },
  tip: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, marginBottom: 28 },
  tipText: { color: '#D7DBE3', fontSize: 13, textAlign: 'center' },
  shutter: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
  },
  shutterInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff' },
});
