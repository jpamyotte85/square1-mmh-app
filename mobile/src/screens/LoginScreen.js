import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, fonts, spacing, radius } from '../utils/theme';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.logoBracket}>
          <Text style={styles.logoSquare}>SQUARE</Text>
          <Text style={styles.logoOne}>1</Text>
        </View>
        <Text style={styles.logoSub}>MEN'S MENTAL HEALTH FOUNDATION</Text>
        <Text style={styles.tagline}>We're here for you, brother.</Text>
        <View style={styles.greenBar} />
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.replace('Main')}
        >
          <Text style={styles.primaryBtnText}>SIGN IN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.replace('Main')}
        >
          <Text style={styles.secondaryBtnText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>

        <Text style={styles.guestLink} onPress={() => navigation.replace('Main')}>
          Continue as guest
        </Text>

        <View style={styles.crisisBox}>
          <Text style={styles.crisisLabel}>In crisis? Call or text</Text>
          <Text style={styles.crisisNumber}>9-8-8</Text>
          <Text style={styles.crisisLabel}>Suicide & Crisis Lifeline — 24/7</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.dark },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoBracket: {
    borderWidth: 3,
    borderColor: colors.green,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoSquare: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.white,
    letterSpacing: 4,
  },
  logoOne: {
    fontFamily: fonts.heading,
    fontSize: 42,
    color: colors.green,
    lineHeight: 42,
  },
  logoSub: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.lightGray,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  tagline: {
    fontFamily: fonts.heading,
    fontSize: 28,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  greenBar: {
    height: 3,
    width: 60,
    backgroundColor: colors.green,
    marginTop: spacing.sm,
  },
  bottom: {
    padding: spacing.xl,
    paddingBottom: 40,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  primaryBtnText: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.white,
    letterSpacing: 2,
  },
  secondaryBtn: {
    borderWidth: 2,
    borderColor: colors.green,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  secondaryBtnText: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.green,
    letterSpacing: 2,
  },
  guestLink: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.lightGray,
    textAlign: 'center',
    marginBottom: spacing.xl,
    textDecorationLine: 'underline',
  },
  crisisBox: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: spacing.lg,
    alignItems: 'center',
  },
  crisisLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.lightGray,
  },
  crisisNumber: {
    fontFamily: fonts.heading,
    fontSize: 36,
    color: colors.red,
    letterSpacing: 4,
    marginVertical: 4,
  },
});
