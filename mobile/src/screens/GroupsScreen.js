import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { colors, fonts, spacing, radius } from '../utils/theme';
import api from '../services/api';

export default function GroupsScreen() {
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/groups').then((res) => setGroups(res.data)).catch(console.error);
  }, []);

  const filtered = groups.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || g.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>AA / NA Groups</Text>
        <View style={styles.greenBar} />
      </View>
      <TextInput
        style={styles.search}
        placeholder="Search by name or location..."
        placeholderTextColor={colors.lightGray}
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.filters}>
        {['all', 'AA', 'NA'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? 'All Groups' : f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.badge, { backgroundColor: item.type === 'AA' ? colors.primary : colors.green }]}>
              <Text style={[styles.badgeText, { color: item.type === 'AA' ? colors.white : colors.dark }]}>
                {item.type}
              </Text>
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.detail}>📍 {item.location}</Text>
            <Text style={styles.detail}>🕐 {item.time}</Text>
            <Text style={styles.detail}>📅 {item.days}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No groups found.</Text>}
      />
    </View>
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
  heading: {
    fontFamily: fonts.heading,
    fontSize: 28,
    color: colors.white,
    letterSpacing: 1,
  },
  greenBar: { height: 3, width: 50, backgroundColor: colors.green, marginTop: spacing.xs },
  search: {
    backgroundColor: colors.white,
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.lightGray,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.charcoal,
  },
  filters: { flexDirection: 'row', paddingHorizontal: spacing.md, marginBottom: spacing.sm, gap: 8 },
  filterBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  filterActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { fontFamily: fonts.body, color: colors.charcoal, fontWeight: '500' },
  filterTextActive: { color: colors.white },
  card: {
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    elevation: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.pill,
    marginBottom: spacing.sm,
  },
  badgeText: { fontFamily: fonts.heading, fontSize: 12, letterSpacing: 1 },
  name: { fontFamily: fonts.heading, fontSize: 17, color: colors.dark, marginBottom: spacing.xs, letterSpacing: 0.3 },
  detail: { fontFamily: fonts.body, fontSize: 14, color: colors.charcoal, marginTop: 2 },
  empty: { textAlign: 'center', marginTop: 40, color: colors.lightGray, fontFamily: fonts.body },
});
