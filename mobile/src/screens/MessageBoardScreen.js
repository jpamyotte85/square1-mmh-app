import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { colors, fonts, spacing, radius } from '../utils/theme';

export default function MessageBoardScreen() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const user = auth().currentUser;

  useEffect(() => {
    const ref = database().ref('/board/posts');
    const handler = ref.orderByChild('createdAt').on('value', (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.entries(data)
        .map(([id, post]) => ({ id, ...post }))
        .sort((a, b) => b.createdAt - a.createdAt);
      setPosts(list);
    });
    return () => ref.off('value', handler);
  }, []);

  function submitPost() {
    if (!newPost.trim()) return;
    database().ref('/board/posts').push({
      text: newPost.trim(),
      author: user?.displayName || 'Anonymous',
      createdAt: Date.now(),
    });
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
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatarText: { fontFamily: fonts.heading, fontSize: 16, color: colors.white },
  author: { fontFamily: fonts.heading, fontSize: 14, color: colors.dark, letterSpacing: 0.5 },
  time: { fontFamily: fonts.body, fontSize: 11, color: colors.lightGray },
  text: { fontFamily: fonts.body, fontSize: 15, color: colors.charcoal, lineHeight: 22 },
  empty: { textAlign: 'center', marginTop: 40, color: colors.lightGray, fontFamily: fonts.body, fontStyle: 'italic' },
  inputRow: {
    flexDirection: 'row',
    padding: spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: radius.md,
    padding: spacing.sm,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.charcoal,
    maxHeight: 100,
    marginRight: spacing.sm,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  sendText: { fontFamily: fonts.heading, color: colors.white, fontSize: 13, letterSpacing: 1 },
});
