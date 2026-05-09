import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { colors, fonts, spacing, radius } from '../utils/theme';

const MOCK_PROVIDERS = [
  { id: 1, name: 'Dr. Sarah Mitchell', specialty: 'Trauma & Men\'s Mental Health', address: '123 8 Ave SW, Calgary', phone: '(403) 555-0201', distanceKm: 1.2, acceptingClients: true },
  { id: 2, name: 'James Okafor, MSW', specialty: 'Addiction & Recovery Counselling', address: '456 Centre St, Calgary', phone: '(403) 555-0202', distanceKm: 2.8, acceptingClients: true },
  { id: 3, name: 'Calgary Men\'s Wellness Clinic', specialty: 'Depression, Anxiety, Relationships', address: '789 17 Ave SW, Calgary', phone: '(403) 555-0203', distanceKm: 3.5, acceptingClients: false },
  { id: 4, name: 'Dr. Raj Patel', specialty: 'Psychiatry & Medication Management', address: '321 Elbow Dr SW, Calgary', phone: '(403) 555-0204', distanceKm: 4.1, acceptingClients: true },
  { id: 5, name: 'North Hill Counselling', specialty: 'CBT & Men\'s Group Therapy', address: '654 Centre St N, Calgary', phone: '(403) 555-0205', distanceKm: 5.7, acceptingClients: false },
];

export default function DirectoryScreen() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_PROVIDERS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Mental Health Directory</Text>
        <View style={styles.greenBar} />
        <Text style={styles.subheading}>Providers near you</Text>
      </View>
      <TextInput
        style={styles.search}
        placeholder="Search by name or specialty..."
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
            <View style={styles.cardTop}>
              <Text style={styles.name}>{item.name}</Text>
              {item.acceptingClients && (
                <View style={styles.acceptingBadge}>
                  <Text style={styles.acceptingText}>Accepting</Text>
                </View>
              )}
            </View>
            <Text style={styles.specialty}>{item.specialty}</Text>
            <Text style={styles.detail}>📍 {item.address}</Text>
            <Text style={styles.detail}>📞 {item.phone}</Text>
            <Text style={styles.distance}>{item.distanceKm.toFixed(1)} km away</Text>
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
    backgroundColor: colors.white, marginBottom: spacing.sm,
    padding: spacing.md, borderRadius: radius.md,
    borderLeftWidth: 4, borderLeftColor: colors.primary, elevation: 2,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { fontFamily: fonts.heading, fontSize: 17, color: colors.dark, flex: 1, letterSpacing: 0.3, marginBottom: 4 },
  specialty: { fontFamily: fonts.body, fontSize: 13, color: colors.primary, marginBottom: spacing.sm },
  detail: { fontFamily: fonts.body, fontSize: 14, color: colors.charcoal, marginTop: 2 },
  distance: { fontFamily: fonts.body, fontSize: 12, color: colors.lightGray, marginTop: spacing.sm },
  acceptingBadge: {
    backgroundColor: colors.green, paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: radius.pill, marginLeft: spacing.sm,
  },
  acceptingText: { fontFamily: fonts.body, fontSize: 11, color: colors.dark, fontWeight: 'bold' },
});
