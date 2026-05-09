import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { colors, fonts, spacing, radius } from '../utils/theme';

const menuItems = [
  { title: 'Office Locations',          icon: '📍', screen: 'Locations',  accent: colors.primary },
  { title: 'AA / NA Groups',            icon: '🤝', screen: 'Groups',     accent: colors.green   },
  { title: 'Mental Health Directory',   icon: '🏥', screen: 'Directory',  accent: colors.red     },
  { title: 'Message Boards',            icon: '💬', screen: 'Board',      accent: colors.primary },
  { title: 'Events',                    icon: '📅', screen: 'Events',     accent: colors.green   },
  { title: 'Job Search',                icon: '💼', screen: 'Jobs',       accent: colors.red     },
  { title: 'Meet Ups & Hangouts',       icon: '🙌', screen: 'Meet Ups',   accent: colors.primary },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />

      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.logoRow}>
          <View style={styles.logoBracket}>
            <Text style={styles.logoSquare}>SQUARE</Text>
            <Text style={styles.logoOne}>1</Text>
          </View>
          <Text style={styles.logoSub}>MEN'S MENTAL{'\n'}HEALTH FOUNDATION</Text>
        </View>
        <Text style={styles.tagline}>We're here for you, brother.</Text>
        <Text style={styles.subTagline}>
          At Square 1, we've built a community where men can talk, listen, and support each other.
        </Text>
        <View style={styles.greenBar} />
      </View>

      {/* Menu Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>WHAT WE OFFER</Text>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.screen}
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.85}
          >
            <View style={[styles.cardAccent, { backgroundColor: item.accent }]} />
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardChevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Crisis Footer */}
      <View style={styles.crisisBar}>
        <Text style={styles.crisisText}>In crisis? Call or text</Text>
        <Text style={styles.crisisNumber}>9-8-8</Text>
        <Text style={styles.crisisText}>Suicide &amp; Crisis Lifeline</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.offWhite },

  hero: {
    backgroundColor: colors.dark,
    paddingTop: 50,
    paddingBottom: 32,
    paddingHorizontal: spacing.lg,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  logoBracket: {
    borderWidth: 3,
    borderColor: colors.green,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 10,
  },
  logoSquare: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.white,
    letterSpacing: 2,
  },
  logoOne: {
    fontFamily: fonts.heading,
    fontSize: 28,
    color: colors.green,
    lineHeight: 28,
  },
  logoSub: {
    fontFamily: fonts.body,
    fontSize: 10,
    color: colors.lightGray,
    letterSpacing: 1,
  },
  tagline: {
    fontFamily: fonts.heading,
    fontSize: 34,
    color: colors.white,
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  subTagline: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.lightGray,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  greenBar: {
    height: 3,
    width: 60,
    backgroundColor: colors.green,
    marginTop: spacing.sm,
  },

  section: { padding: spacing.md },
  sectionLabel: {
    fontFamily: fonts.heading,
    fontSize: 13,
    color: colors.primary,
    letterSpacing: 2,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardAccent: { width: 5, alignSelf: 'stretch' },
  cardIcon: { fontSize: 24, paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  cardTitle: {
    flex: 1,
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.charcoal,
    letterSpacing: 0.5,
  },
  cardChevron: {
    fontSize: 24,
    color: colors.lightGray,
    paddingRight: spacing.md,
  },

  crisisBar: {
    backgroundColor: colors.red,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  crisisText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.white,
    opacity: 0.9,
  },
  crisisNumber: {
    fontFamily: fonts.heading,
    fontSize: 40,
    color: colors.white,
    letterSpacing: 4,
    marginVertical: spacing.xs,
  },
});
