"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { css } from "@emotion/css";
import useStableCallback from "../../../../hooks/useStableCallback";

const defaultCountryStyle = {
  fillColor: "blue",
  weight: 2,
  opacity: 1,
  color: "white",
  fillOpacity: 0.9,
};

const wrongCountryStyle = {
  fillColor: "red",
  weight: 2,
  opacity: 1,
  color: "white",
  fillOpacity: 0.9,
};

const correctCountryStyle = {
  fillColor: "green",
  weight: 2,
  opacity: 1,
  color: "white",
  fillOpacity: 0.3,
};

export default function CountriesMap({
  wrongCountriesGuesses,
  correctCountriesAnswers,
  countriesGeoJSON,
  onCountryClick,
}: {
  wrongCountriesGuesses: Array<string>;
  correctCountriesAnswers: Array<string>;
  countriesGeoJSON: GeoJSON.FeatureCollection;
  onCountryClick: (_code: string) => void;
}) {
  const onCountryClickStable = useStableCallback(onCountryClick);

  const makeStyle = (feature: GeoJSON.Feature) => {
    if (
      wrongCountriesGuesses.some(
        (countryCode) => feature.properties?.iso_a2_eh === countryCode
      )
    ) {
      return wrongCountryStyle;
    } else if (
      correctCountriesAnswers.some(
        (countryCode) => feature.properties?.iso_a2_eh === countryCode
      )
    ) {
      return correctCountryStyle;
    }

    return defaultCountryStyle;
  };

  const onEachFeature = (feature: GeoJSON.Feature, layer: any) => {
    if (feature.properties && feature.properties.popupContent) {
      layer.bindPopup(feature.properties.popupContent);
    }

    layer.on({
      click: () => {
        onCountryClickStable(feature.properties?.iso_a2_eh);
      },
    });
  };

  return (
    <MapContainer
      className={css`
        /* leaflet requires a fi heaight for working properly */
        height: 100vh; 
        margin: 0;
        padding: 0;
        top: 0;
      `}
      center={[51.505, -0.09]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GeoJSON
        data={countriesGeoJSON}
        onEachFeature={onEachFeature}
        style={makeStyle as any}
      />
    </MapContainer>
  );
}
