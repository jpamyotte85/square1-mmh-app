import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { colors, fonts, spacing, radius } from '../utils/theme';

const MOCK_LOCATIONS = [
  { id: 1, name: 'Square 1 - Downtown', address: '102 9 Ave SW, Calgary, AB', phone: '(403) 555-0101', hours: 'Mon–Fri 9am–5pm' },
  { id: 2, name: 'Square 1 - North', address: '456 Centre St N, Calgary, AB', phone: '(403) 555-0102', hours: 'Mon–Sat 10am–6pm' },
  { id: 3, name: 'Square 1 - South', address: '789 Macleod Trail S, Calgary, AB', phone: '(403) 555-0103', hours: 'Tue–Sat 9am–5pm' },
];

export default function LocationsScreen() {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Office Locations</Text>
        <View style={styles.greenBar} />
        <Text style={styles.subheading}>Find a Square 1 near you</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        {MOCK_LOCATIONS.map((loc) => (
          <TouchableOpacity
            key={loc.id}
            style={[styles.card, selected?.id === loc.id && styles.cardSelected]}
            onPress={() => setSelected(loc)}
          >
            <View style={styles.cardAccent} />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{loc.name}</Text>
              <Text style={styles.cardText}>📍 {loc.address}</Text>
              <Text style={styles.cardText}>📞 {loc.phone}</Text>
              <Text style={styles.cardText}>🕐 {loc.hours}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>🗺️ Map view coming in full build</Text>
        </View>
      </ScrollView>
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
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: spacing.sm,
    elevation: 2,
  },
  cardSelected: { borderWidth: 2, borderColor: colors.primary },
  cardAccent: { width: 5, backgroundColor: colors.primary },
  cardBody: { flex: 1, padding: spacing.md },
  cardTitle: { fontFamily: fonts.heading, fontSize: 17, color: colors.primary, marginBottom: spacing.xs, letterSpacing: 0.5 },
  cardText: { fontFamily: fonts.body, fontSize: 14, color: colors.charcoal, marginTop: 2 },
  mapPlaceholder: {
    backgroundColor: '#e8e8e8',
    borderRadius: radius.md,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  mapPlaceholderText: { fontFamily: fonts.body, color: colors.charcoal, fontSize: 14 },
});
