import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useResponsive } from "react-native-responsive-hook";
import { global_style_function } from "../../assets/style";
import MapView, { MapMarker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useMemo, useState } from "react";

import { getDistance } from "geolib";

import * as Location from "expo-location";

// navigator.geolocation = require('@react-native-community/geolocation');

export default function GeoLocatorScreen() {
  const styles = useStyles();

  const GPP_data = require("../../assets/data/GeneralPractitionerPractice.json");

  const mapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#8ec3b9",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1a3646",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#64779e",
        },
      ],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#4b6878",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#334e87",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#283d6a",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6f9ba5",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#3C7680",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#304a7d",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#2c6675",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#255763",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#b0d5ce",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#023e58",
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#98a5be",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#1d2c4d",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#283d6a",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#3a4762",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#0e1626",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#4e6d70",
        },
      ],
    },
  ];

  const [currentLocation, setCurrentLocaiton] = useState({})
  const [closestGPPs, setClosestGPPs] = useState([]);

  const handleScreenDisplay = () => {
    return mapMode === 1;
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      let long_lat = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setCurrentLocaiton(long_lat);

      let closest_gps = GPP_data.sort((a, b) => {
        a.distance = (
          getDistance(long_lat, {
            latitude: a.lattitude,
            longitude: a.longitude,
          }) / 1000
        ).toPrecision(2);
        b.distance = (
          getDistance(long_lat, {
            latitude: b.lattitude,
            longitude: b.longitude,
          }) / 1000
        ).toPrecision(2);
        return a.distance - b.distance;
      });

      setClosestGPPs(closest_gps);
    })();
  }, []);

  let mapMode = 1;

  const setMapMode = (mode) => {
    mapMode = mode;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",
          height: "auto",
          width: "100%",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity style={{ width: "50%" }} onPress={() => setMapMode(1)}>
          <View>
            <Text
              style={{
                color: "red",
                backgroundColor: "black",
                textAlign: "center",
                paddingVertical: 10,
              }}
            >
              Map View
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "50%" }} onPress={() => setMapMode(2)}>
          <View>
            <Text
              style={{
                color: "red",
                backgroundColor: "black",
                textAlign: "center",
                paddingVertical: 10,
              }}
            >
              List View
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {handleScreenDisplay() ? (
          <MapView
            customMapStyle={mapStyle}
            style={{ width: "100%", height: "100%" }}
            userInterfaceStyle={"dark"}
            showsUserLocation
            showsMyLocationButton
            initialRegion={currentLocation}
          >
            {GPP_data.map((data, index) => (
              <MapMarker
                key={index}
                title={data.name}
                coordinate={{
                  latitude: data.lattitude,
                  longitude: data.longitude,
                }}
              />
            ))}
          </MapView>
        ) : (
          <ScrollView style={{ flex: 1 }}>
            {closestGPPs.map((data, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                }}
              >
                <Text>{data.name}</Text>
                <Text>{data.distance}km</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const useStyles = () => {
  const { rem, vh, vw } = useResponsive();

  const styles = StyleSheet.create({
    ...global_style_function(),
    absoluteFillObject: {
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      height: "100%",
    },
  });

  return styles;
};
