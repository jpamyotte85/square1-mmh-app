import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts, spacing, radius } from '../utils/theme';

const MOCK_MEETUPS = [
  { id: 1, title: 'Saturday Morning Hike', location: 'Nose Hill Park, Calgary', date: '2026-05-17', time: '8:00 AM', description: 'Easy 5km trail. All fitness levels welcome. Just show up.', attendees: 12, rsvped: false },
  { id: 2, title: 'Pickup Basketball', location: 'YMCA North, Calgary', date: '2026-05-20', time: '6:00 PM', description: 'Friendly pickup game. All skill levels. Come run some ball with the brothers.', attendees: 8, rsvped: false },
  { id: 3, title: 'Coffee & Chat', location: 'Analog Coffee, 17 Ave SW', date: '2026-05-22', time: '10:00 AM', description: 'Low-key morning hangout. No agenda. Just good conversation.', attendees: 5, rsvped: false },
  { id: 4, title: 'Movie Night', location: 'Square 1 Downtown', date: '2026-05-30', time: '7:00 PM', description: 'Watching a film together, then open discussion. Snacks provided.', attendees: 15, rsvped: false },
];

export default function MeetUpsScreen() {
  const [meetups, setMeetups] = useState(MOCK_MEETUPS);

  function rsvp(id) {
    setMeetups((prev) =>
      prev.map((m) => m.id === id ? { ...m, rsvped: !m.rsvped, attendees: m.rsvped ? m.attendees - 1 : m.attendees + 1 } : m)
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Meet Ups & Hangouts</Text>
        <View style={styles.greenBar} />
        <Text style={styles.subheading}>Get together. Build brotherhood.</Text>
      </View>
      <FlatList
        data={meetups}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.detail}>📍 {item.location}</Text>
            <Text style={styles.detail}>📅 {new Date(item.date).toDateString()}</Text>
            <Text style={styles.detail}>🕐 {item.time}</Text>
            {item.description && <Text style={styles.desc}>{item.description}</Text>}
            <View style={styles.footer}>
              <Text style={styles.attendees}>{item.attendees} going</Text>
              <TouchableOpacity
                style={[styles.rsvpBtn, item.rsvped && styles.rsvpedBtn]}
                onPress={() => rsvp(item.id)}
              >
                <Text style={[styles.rsvpText, item.rsvped && styles.rsvpedText]}>
                  {item.rsvped ? "YOU'RE IN ✓" : "RSVP"}
                </Text>
              </TouchableOpacity>
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
    backgroundColor: colors.white, borderRadius: radius.md,
    padding: spacing.md, marginBottom: spacing.sm, elevation: 2,
  },
  title: { fontFamily: fonts.heading, fontSize: 17, color: colors.dark, marginBottom: spacing.sm, letterSpacing: 0.3 },
  detail: { fontFamily: fonts.body, fontSize: 13, color: colors.charcoal, marginTop: 2 },
  desc: { fontFamily: fonts.body, fontSize: 13, color: colors.lightGray, marginTop: spacing.sm },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  attendees: { fontFamily: fonts.body, fontSize: 13, color: colors.lightGray },
  rsvpBtn: {
    backgroundColor: colors.primary, paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm, borderRadius: radius.md,
  },
  rsvpedBtn: { backgroundColor: colors.green },
  rsvpText: { fontFamily: fonts.heading, color: colors.white, fontSize: 13, letterSpacing: 1 },
  rsvpedText: { color: colors.dark },
});
