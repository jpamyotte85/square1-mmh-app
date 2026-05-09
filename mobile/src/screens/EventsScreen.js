import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors, fonts, spacing, radius } from '../utils/theme';

const MOCK_EVENTS = [
  { id: 1, title: 'Men\'s Circle — Weekly Meetup', location: 'Square 1 Downtown', date: '2026-05-14', time: '7:00 PM', description: 'Open circle for men to share, listen, and connect. No agenda, no judgment.' },
  { id: 2, title: 'Guest Speaker: Living with Depression', location: 'Square 1 North', date: '2026-05-17', time: '6:30 PM', description: 'A candid talk from someone who\'s been through it and came out the other side.' },
  { id: 3, title: 'BBQ & Hangout', location: 'Bowness Park, Calgary', date: '2026-05-24', time: '1:00 PM', description: 'Casual afternoon, food, games. Just brothers hanging out.' },
  { id: 4, title: 'Grief Support Group', location: 'Square 1 South', date: '2026-06-01', time: '5:30 PM', description: 'A safe space for men dealing with loss of any kind.' },
];

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Events & Calendar</Text>
        <View style={styles.greenBar} />
        <Text style={styles.subheading}>Stay connected with your community</Text>
      </View>
      <FlatList
        data={MOCK_EVENTS}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.dateBox}>
              <Text style={styles.dateMonth}>
                {new Date(item.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
              </Text>
              <Text style={styles.dateDay}>{new Date(item.date).getDate()}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.detail}>📍 {item.location}</Text>
              <Text style={styles.detail}>🕐 {item.time}</Text>
              {item.description && (
                <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
              )}
            </View>
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
  card: {
    backgroundColor: colors.white, borderRadius: radius.md, marginBottom: spacing.sm,
    flexDirection: 'row', overflow: 'hidden', elevation: 2,
  },
  dateBox: {
    backgroundColor: colors.primary, width: 68,
    alignItems: 'center', justifyContent: 'center', padding: spacing.sm,
  },
  dateMonth: { fontFamily: fonts.heading, color: colors.green, fontSize: 12, letterSpacing: 1 },
  dateDay: { fontFamily: fonts.heading, color: colors.white, fontSize: 30 },
  info: { flex: 1, padding: spacing.md },
  title: { fontFamily: fonts.heading, fontSize: 16, color: colors.dark, marginBottom: spacing.xs, letterSpacing: 0.3 },
  detail: { fontFamily: fonts.body, fontSize: 13, color: colors.charcoal, marginTop: 2 },
  desc: { fontFamily: fonts.body, fontSize: 13, color: colors.lightGray, marginTop: spacing.sm },
});
