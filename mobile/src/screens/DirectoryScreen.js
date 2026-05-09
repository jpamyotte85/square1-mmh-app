import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { colors, fonts, spacing, radius } from '../utils/theme';
import api from '../services/api';

export default function DirectoryScreen() {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    requestLocation();
  }, []);

  async function requestLocation() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
    }
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ latitude, longitude });
        api.get(`/directory?lat=${latitude}&lng=${longitude}`).then((res) => setProviders(res.data));
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, timeout: 15000 }
    );
  }

  const filtered = providers.filter((p) =>
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
            {item.distanceKm && (
              <Text style={styles.distance}>{item.distanceKm.toFixed(1)} km away</Text>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {userLocation ? 'No providers found nearby.' : 'Getting your location...'}
          </Text>
        }
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
  heading: {
    fontFamily: fonts.heading,
    fontSize: 28,
    color: colors.white,
    letterSpacing: 1,
  },
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
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    elevation: 2,
    shadowColor: colors.black,
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: {
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.dark,
    flex: 1,
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  specialty: { fontFamily: fonts.body, fontSize: 13, color: colors.primary, marginBottom: spacing.sm },
  detail: { fontFamily: fonts.body, fontSize: 14, color: colors.charcoal, marginTop: 2 },
  distance: { fontFamily: fonts.body, fontSize: 12, color: colors.lightGray, marginTop: spacing.sm },
  acceptingBadge: {
    backgroundColor: colors.green,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    marginLeft: spacing.sm,
  },
  acceptingText: { fontFamily: fonts.body, fontSize: 11, color: colors.dark, fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 40, color: colors.lightGray, fontFamily: fonts.body },
});
