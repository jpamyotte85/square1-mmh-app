import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Linking, TouchableOpacity } from 'react-native';
import { colors, fonts, spacing, radius } from '../utils/theme';

const MOCK_JOBS = [
  { id: 1, title: 'Peer Support Worker', company: 'Square 1 MMH', location: 'Calgary, AB', type: 'Part-Time', wage: '$22–$26/hr', description: 'Support men in recovery by sharing lived experience and guiding them through community programs.' },
  { id: 2, title: 'General Labourer', company: 'Greystone Construction (Partner)', location: 'Calgary, AB', type: 'Full-Time', wage: '$24/hr', description: 'Immediate start. No experience required. Square 1 members get priority placement.' },
  { id: 3, title: 'Warehouse Associate', company: 'North Star Logistics (Partner)', location: 'Balzac, AB', type: 'Full-Time', wage: '$20–$23/hr', description: 'Day shift, Mon–Fri. Supportive team environment. Criminal record considered.' },
  { id: 4, title: 'Cook / Kitchen Staff', company: 'The Brothers Table (Partner)', location: 'Calgary, AB', type: 'Part-Time', wage: '$18–$21/hr', description: 'Social enterprise restaurant. Training provided. Flexible scheduling for program participants.' },
];

export default function JobsScreen() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_JOBS.filter((j) =>
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
            <Text style={styles.detail}>💵 {item.wage}</Text>
            <Text style={styles.desc} numberOfLines={3}>{item.description}</Text>
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyText}>APPLY NOW</Text>
            </TouchableOpacity>
          </View>
        )}
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
    backgroundColor: colors.white, margin: spacing.md, padding: spacing.md,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.lightGray,
    fontFamily: fonts.body, fontSize: 15, color: colors.charcoal,
  },
  card: {
    backgroundColor: colors.white, borderRadius: radius.md,
    padding: spacing.md, marginBottom: spacing.sm, elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontFamily: fonts.heading, fontSize: 16, color: colors.dark, flex: 1, letterSpacing: 0.3 },
  typeBadge: {
    backgroundColor: '#E8F4FF', paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: radius.pill, marginLeft: spacing.sm,
  },
  typeText: { fontFamily: fonts.body, fontSize: 11, color: colors.primary, fontWeight: '600' },
  company: { fontFamily: fonts.heading, fontSize: 14, color: colors.primary, marginTop: 4, marginBottom: spacing.sm, letterSpacing: 0.3 },
  detail: { fontFamily: fonts.body, fontSize: 13, color: colors.charcoal, marginTop: 2 },
  desc: { fontFamily: fonts.body, fontSize: 13, color: colors.lightGray, marginTop: spacing.sm },
  applyBtn: {
    marginTop: spacing.md, backgroundColor: colors.primary,
    paddingVertical: 10, borderRadius: radius.md, alignItems: 'center',
  },
  applyText: { fontFamily: fonts.heading, color: colors.white, fontSize: 14, letterSpacing: 1.5 },
});
