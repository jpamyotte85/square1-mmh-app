import React, { useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { colors, fonts, spacing, radius } from '../utils/theme';

const MOCK_POSTS = [
  { id: '1', author: 'James', text: "First time posting here. Really glad this community exists. Going through a tough stretch but knowing I'm not alone helps.", createdAt: Date.now() - 3600000 },
  { id: '2', author: 'Marcus', text: "Went to my first AA meeting last week. Nervous walking in, but the guys there were solid. Anyone else been going?", createdAt: Date.now() - 7200000 },
  { id: '3', author: 'Derek', text: "Square 1 helped me find a therapist through the directory. Three sessions in and already feeling different.", createdAt: Date.now() - 86400000 },
];

export default function MessageBoardScreen() {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [newPost, setNewPost] = useState('');

  function submitPost() {
    if (!newPost.trim()) return;
    setPosts([
      { id: Date.now().toString(), author: 'You', text: newPost.trim(), createdAt: Date.now() },
      ...posts,
    ]);
    setNewPost('');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.topBar}>
        <Text style={styles.heading}>Message Board</Text>
        <View style={styles.greenBar} />
        <Text style={styles.subheading}>You are not alone. Talk to us.</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.postHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.author[0]?.toUpperCase()}</Text>
              </View>
              <View>
                <Text style={styles.author}>{item.author}</Text>
                <Text style={styles.time}>{new Date(item.createdAt).toLocaleString()}</Text>
              </View>
            </View>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No posts yet. Be the first to share, brother.</Text>
        }
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Share something with the community..."
          placeholderTextColor={colors.lightGray}
          value={newPost}
          onChangeText={setNewPost}
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={submitPost}>
          <Text style={styles.sendText}>POST</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.offWhite },
  topBar: {
    backgroundColor: colors.dark,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  heading: { fontFamily: fonts.heading, fontSize: 28, color: colors.white, letterSpacing: 1 },
  greenBar: { height: 3, width: 50, backgroundColor: colors.green, marginTop: spacing.xs, marginBottom: spacing.xs },
  subheading: { fontFamily: fonts.body, fontSize: 13, color: colors.lightGray },
  post: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    elevation: 1,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatarText: { fontFamily: fonts.heading, fontSize: 16, color: colors.white },
  author: { fontFamily: fonts.heading, fontSize: 14, color: colors.dark, letterSpacing: 0.5 },
  time: { fontFamily: fonts.body, fontSize: 11, color: colors.lightGray },
  text: { fontFamily: fonts.body, fontSize: 15, color: colors.charcoal, lineHeight: 22 },
  empty: { textAlign: 'center', marginTop: 40, color: colors.lightGray, fontFamily: fonts.body, fontStyle: 'italic' },
  inputRow: {
    flexDirection: 'row', padding: spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1, borderTopColor: '#eee',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1, borderWidth: 1, borderColor: colors.lightGray,
    borderRadius: radius.md, padding: spacing.sm,
    fontFamily: fonts.body, fontSize: 14, color: colors.charcoal,
    maxHeight: 100, marginRight: spacing.sm,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  sendText: { fontFamily: fonts.heading, color: colors.white, fontSize: 13, letterSpacing: 1 },
});
