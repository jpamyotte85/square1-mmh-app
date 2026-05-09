import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts, spacing, radius } from '../utils/theme';
import api from '../services/api';
import auth from '@react-native-firebase/auth';

export default function MeetUpsScreen() {
  const [meetups, setMeetups] = useState([]);
  const user = auth().currentUser;

  useEffect(() => {
    api.get('/meetups').then((res) => setMeetups(res.data)).catch(console.error);
  }, []);

  function rsvp(id) {
    api.post(`/meetups/${id}/rsvp`, { userId: user?.uid }).then(() => {
      setMeetups((prev) =>
        prev.map((m) => (m.id === id ? { ...m, rsvped: true, attendees: m.attendees + 1 } : m))
      );
    });
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
            {item.description && (
              <Text style={styles.desc}>{item.description}</Text>
            )}
            <View style={styles.footer}>
              <Text style={styles.attendees}>{item.attendees} going</Text>
              <TouchableOpacity
                style={[styles.rsvpBtn, item.rsvped && styles.rsvpedBtn]}
                onPress={() => !item.rsvped && rsvp(item.id)}
              >
                <Text style={styles.rsvpText}>{item.rsvped ? "YOU'RE IN!" : "RSVP"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No meet-ups scheduled yet.</Text>}
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
  title: {
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.dark,
    marginBottom: spacing.sm,
    letterSpacing: 0.3,
  },
  detail: { fontFamily: fonts.body, fontSize: 13, color: colors.charcoal, marginTop: 2 },
  desc: { fontFamily: fonts.body, fontSize: 13, color: colors.lightGray, marginTop: spacing.sm },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md },
  attendees: { fontFamily: fonts.body, fontSize: 13, color: colors.lightGray },
  rsvpBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  rsvpedBtn: { backgroundColor: colors.green },
  rsvpText: {
    fontFamily: fonts.heading,
    color: colors.white,
    fontSize: 13,
    letterSpacing: 1,
  },
});
