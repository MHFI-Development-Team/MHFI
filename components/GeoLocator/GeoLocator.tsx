import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import MapView, { MapMarker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GeneralPractitionersData, gpp_data } from './GeoLocatorData';
import { Colors } from '@/constants/Colors';
import globalStyles from '@/constants/globalStyles';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import * as Haptics from 'expo-haptics';

enum MapModes {
  List,
  Map,
}

interface ModeViewChangeProps {
  state: [MapModes, Dispatch<SetStateAction<MapModes>>];
}
// GeneralPractitionersData[]
interface ListViewLayoutProps {
  data: GeneralPractitionersData[];
}

const ListViewLayout: React.FC<ListViewLayoutProps> = ({ data }) => {
  return (
    <FlatList
      //   style={{
      //   }}
      data={data}
      renderItem={item => {
        const isOdd = item.index % 2 === 0;

        return (
          <View
            style={{
              width: '100%',
              paddingHorizontal: 8,
              paddingVertical: 30,
              backgroundColor: isOdd ? Colors.secondary : 'hsl(231, 18%, 20%)',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                // fontWeight: b
              }}>
              {item.item.name}
            </Text>
            <Text
              style={{
                color: '#fff',
              }}>
              {item.item.distance} km
            </Text>
          </View>
        );
      }}
    />
  );
};

const MapViewLayout = () => {
  const mapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#263c3f',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#6b9a76',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#38414e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#212a37',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9ca5b3',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#1f2835',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#f3d19c',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#2f3948',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#d59563',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#515c6d',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#17263c',
        },
      ],
    },
  ];

  return (
    <MapView
      style={{ width: '100%', height: '100%' }}
      // showsMyLocationButton={true}

      //   provider={PROVIDER_GOOGLE}
      customMapStyle={mapStyle}>
      {gpp_data.map((data, index) => (
        <MapMarker
          key={index}
          title={data.name}
          coordinate={{
            latitude: data.lattitude,
            longitude: data.longitude,
          }}>
          <Image source={require('../../assets/images/marker.png')} />
        </MapMarker>
      ))}
    </MapView>
  );
};

const ModeViewChange: React.FC<ModeViewChangeProps> = ({ state }) => {
  const [mapViewMode, setMapViewMode] = state;

  return (
    <View
      style={{
        display: 'flex',
        backgroundColor: 'hsl(231, 18%, 20%)',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: 20,
      }}>
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setMapViewMode(mapViewMode === MapModes.List ? MapModes.Map : MapModes.List);
        }}
        activeOpacity={0.9}
        style={{
          width: '100%',
          paddingVertical: 18,
          backgroundColor: Colors.ButtonColor,
        }}>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
          }}>
          {mapViewMode === MapModes.List ? 'Map View' : 'List View'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const GeoLocator = () => {
  const [mapViewMode, setMapViewMode] = useState<MapModes>(MapModes.Map);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [gppOrderedByDistance, setGPPOrderedByDistance] = useState<GeneralPractitionersData[]>([]);

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      setLocation(location);

      const long_lat = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const closest_gps = gpp_data.sort((a, b) => {
        a.distance = (
          getDistance(long_lat, {
            latitude: a.lattitude,
            longitude: a.longitude,
          }) / 1000
        ).toFixed(2);
        b.distance = (
          getDistance(long_lat, {
            latitude: b.lattitude,
            longitude: b.longitude,
          }) / 1000
        ).toFixed(2);
        return a.distance - b.distance;
      });

      setGPPOrderedByDistance(closest_gps);
    };

    fetchLocation();
  }, []);

  return (
    <>
      <ModeViewChange state={[mapViewMode, setMapViewMode]} />
      {mapViewMode === MapModes.Map ? (
        <MapViewLayout />
      ) : (
        <ListViewLayout data={gppOrderedByDistance} />
      )}
    </>
  );
};

export default GeoLocator;
