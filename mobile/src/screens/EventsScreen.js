import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors, fonts, spacing, radius } from '../utils/theme';
import api from '../services/api';

export default function EventsScreen() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/events').then((res) => setEvents(res.data)).catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Events & Calendar</Text>
        <View style={styles.greenBar} />
        <Text style={styles.subheading}>Stay connected with your community</Text>
      </View>
      <FlatList
        data={events}
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
        ListEmptyComponent={<Text style={styles.empty}>No upcoming events.</Text>}
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
    marginBottom: spacing.sm,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  dateBox: {
    backgroundColor: colors.primary,
    width: 68,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
  },
  dateMonth: { fontFamily: fonts.heading, color: colors.green, fontSize: 12, letterSpacing: 1 },
  dateDay: { fontFamily: fonts.heading, color: colors.white, fontSize: 30 },
  info: { flex: 1, padding: spacing.md },
  title: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.dark,
    marginBottom: spacing.xs,
    letterSpacing: 0.3,
  },
  detail: { fontFamily: fonts.body, fontSize: 13, color: colors.charcoal, marginTop: 2 },
  desc: { fontFamily: fonts.body, fontSize: 13, color: colors.lightGray, marginTop: spacing.sm },
  empty: { textAlign: 'center', marginTop: 40, color: colors.lightGray, fontFamily: fonts.body },
});
