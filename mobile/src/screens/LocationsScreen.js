import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { colors, fonts, spacing, radius } from '../utils/theme';
import api from '../services/api';

export default function LocationsScreen() {
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get('/locations').then((res) => setLocations(res.data)).catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.heading}>Office Locations</Text>
        <View style={styles.greenBar} />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 53.5461,
          longitude: -113.4938,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            pinColor={colors.primary}
            onPress={() => setSelected(loc)}
          >
            <Callout>
              <Text style={styles.calloutTitle}>{loc.name}</Text>
              <Text style={styles.calloutText}>{loc.address}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {selected && (
        <View style={styles.card}>
          <View style={styles.cardAccent} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{selected.name}</Text>
            <Text style={styles.cardText}>📍 {selected.address}</Text>
            {selected.phone && <Text style={styles.cardText}>📞 {selected.phone}</Text>}
            {selected.hours && <Text style={styles.cardText}>🕐 {selected.hours}</Text>}
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={() => setSelected(null)}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
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
  greenBar: { height: 3, width: 50, backgroundColor: colors.green, marginTop: spacing.xs },
  map: { flex: 1 },
  card: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 6,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cardAccent: { width: 5, backgroundColor: colors.primary },
  cardBody: { flex: 1, padding: spacing.md },
  cardTitle: {
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.primary,
    marginBottom: spacing.xs,
    letterSpacing: 0.5,
  },
  cardText: { fontFamily: fonts.body, fontSize: 14, color: colors.charcoal, marginTop: 2 },
  closeBtn: { padding: spacing.md, justifyContent: 'flex-start' },
  closeText: { fontSize: 16, color: colors.lightGray },
  calloutTitle: { fontFamily: fonts.heading, fontSize: 14, color: colors.primary },
  calloutText: { fontFamily: fonts.body, fontSize: 12, color: colors.charcoal },
});
