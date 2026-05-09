import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Linking, TouchableOpacity } from 'react-native';
import { colors, fonts, spacing, radius } from '../utils/theme';
import api from '../services/api';

export default function JobsScreen() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/jobs').then((res) => setJobs(res.data)).catch(console.error);
  }, []);

  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Job Search</Text>
        <View style={styles.greenBar} />
        <Text style={styles.subheading}>Square 1 partner employers</Text>
      </View>
      <TextInput
        style={styles.search}
        placeholder="Search jobs or employers..."
        placeholderTextColor={colors.lightGray}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.typeBadge}>
                <Text style={styles.typeText}>{item.type}</Text>
              </View>
            </View>
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.detail}>📍 {item.location}</Text>
            {item.wage && <Text style={styles.detail}>💵 {item.wage}</Text>}
            {item.description && (
              <Text style={styles.desc} numberOfLines={3}>{item.description}</Text>
            )}
            {item.applyUrl && (
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => Linking.openURL(item.applyUrl)}
              >
                <Text style={styles.applyText}>APPLY NOW</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No job listings available.</Text>}
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
  heading: { fontFamily: fonts.heading, fontSize: 28, color: colors.white, letterSpacing: 1 },
  greenBar: { height: 3, width: 50, backgroundColor: colors.green, marginTop: spacing.xs, marginBottom: spacing.xs },
  subheading: { fontFamily: fonts.body, fontSize: 13, color: colors.lightGray },
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
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    elevation: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.dark,
    flex: 1,
    letterSpacing: 0.3,
  },
  typeBadge: {
    backgroundColor: '#E8F4FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    marginLeft: spacing.sm,
  },
  typeText: { fontFamily: fonts.body, fontSize: 11, color: colors.primary, fontWeight: '600' },
  company: { fontFamily: fonts.heading, fontSize: 14, color: colors.primary, marginTop: 4, marginBottom: spacing.sm, letterSpacing: 0.3 },
  detail: { fontFamily: fonts.body, fontSize: 13, color: colors.charcoal, marginTop: 2 },
  desc: { fontFamily: fonts.body, fontSize: 13, color: colors.lightGray, marginTop: spacing.sm },
  applyBtn: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  applyText: { fontFamily: fonts.heading, color: colors.white, fontSize: 14, letterSpacing: 1.5 },
  empty: { textAlign: 'center', marginTop: 40, color: colors.lightGray, fontFamily: fonts.body },
});
