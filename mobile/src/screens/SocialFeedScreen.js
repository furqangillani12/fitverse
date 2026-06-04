import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing, shadow } from '../theme';

const POSTS = [
  {
    id: 1,
    image: ['#5B8DEF', '#9B43D6'], imageIcon: 'run',
    stats: { Duration: '24 min', Calories: '420', Distance: '5 km' },
    likes: 87, comments: 23,
    user: 'Sara', role: 'Fitness Enthusiast', time: '5 hours ago', avatar: '🧘‍♀️', avatarBg: colors.tintPurple,
    caption: 'Healthy lunch prep for the week! 🥗 Meal planning is key to success.',
  },
  {
    id: 2,
    image: ['#22C55E', '#0E9F5A'], imageIcon: 'food-apple',
    stats: null,
    likes: 142, comments: 31,
    user: 'Ahmed', role: 'Marathon Runner', time: '8 hours ago', avatar: '🏃', avatarBg: colors.tintBlue,
    caption: 'Post-run fuel 🥗 Greens + protein = recovery done right!',
  },
];

function Post({ post }) {
  const [liked, setLiked] = useState(false);
  const likes = post.likes + (liked ? 1 : 0);

  return (
    <View style={styles.post}>
      <LinearGradient colors={post.image} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.image}>
        <MaterialCommunityIcons name={post.imageIcon} size={48} color="rgba(255,255,255,0.4)" />
      </LinearGradient>

      {post.stats && (
        <View style={styles.statsBar}>
          {Object.entries(post.stats).map(([k, v], i) => (
            <View key={k} style={styles.statItem}>
              <MaterialCommunityIcons
                name={k === 'Duration' ? 'clock-outline' : k === 'Calories' ? 'fire' : 'map-marker-distance'}
                size={14}
                color={k === 'Calories' ? colors.orange : colors.textMuted}
              />
              <Text style={styles.statText}>{k}: {v}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={() => setLiked((l) => !l)}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={22} color={liked ? colors.red : colors.text} />
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.action, { marginLeft: 20 }]}>
          <Ionicons name="chatbubble-outline" size={20} color={colors.text} />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity>
          <Ionicons name="share-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.userRow}>
        <View style={[styles.avatar, { backgroundColor: post.avatarBg }]}>
          <Text style={{ fontSize: 18 }}>{post.avatar}</Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.userName}>{post.user}</Text>
          <Text style={styles.userMeta}>{post.role} • {post.time}</Text>
        </View>
      </View>

      <Text style={styles.caption}>{post.caption}</Text>
    </View>
  );
}

export default function SocialFeedScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Social Feed</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {POSTS.map((p) => <Post key={p.id} post={p} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingTop: 56, paddingHorizontal: spacing.lg, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontSize: 26, fontWeight: '700', color: colors.text },
  post: { backgroundColor: colors.card, marginBottom: 10, borderBottomWidth: 8, borderBottomColor: colors.bgAlt },
  image: { height: 190, alignItems: 'center', justifyContent: 'center' },
  statsBar: { flexDirection: 'row', backgroundColor: colors.bgAlt, paddingVertical: 12, paddingHorizontal: spacing.lg },
  statItem: { flexDirection: 'row', alignItems: 'center', marginRight: 18 },
  statText: { fontSize: 12, color: colors.textMuted, marginLeft: 4 },
  actions: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: 12 },
  action: { flexDirection: 'row', alignItems: 'center' },
  actionText: { fontSize: 14, color: colors.text, marginLeft: 6, fontWeight: '600' },
  userRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  userName: { fontSize: 15, fontWeight: '700', color: colors.text },
  userMeta: { fontSize: 12, color: colors.textMuted, marginTop: 1 },
  caption: { fontSize: 14, color: colors.text, paddingHorizontal: spacing.lg, paddingBottom: 16, lineHeight: 20 },
});
