"use client";
import "leaflet/dist/leaflet.css";

import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@apollo/client";

import countriesGeoJSONData from "../../../../data/countries.geo.json";

import { css } from "@emotion/css";
import ScoreView from "./ScoreView";
import Question from "./Question";
import { getRandomElement } from "../../../../utils/utils";
import { notification } from "antd";
import { GET_COUNTRIES } from "../../../../queries/countries";
import { makeQuestionType } from "./utils";
import CountriesMap from "./CountriesMap";

import { FeatureCollection } from 'geojson';
export type CountryType = {
  code: string;
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  languages: {
    code: string;
    name: string;
  };
};

export default function GeoGameMain() {
  const {
    data: { countries: countriesFromApi },
  } = useSuspenseQuery<{
    countries: Array<CountryType>;
  }>(GET_COUNTRIES);
  const codeToCountryMap = useMemo(() => {
    return countriesFromApi.reduce(
      (accum, el) => {
        accum[el.code] = {
          code: el.code,
          name: el.name,
          capital: el.capital,
          emoji: el.emoji,

          native: el.native,
          currency: el.currency,
          languages: el.languages,
        };
        return accum;
      },
      {} as { [key: string]: CountryType }
    );
  }, [countriesFromApi]);

  const [api, contextHolder] = notification.useNotification({
    stack: { threshold: 2 },
    placement: "bottomRight",
  });

  const [countriesInTheGame, setCountriesInTheGame] = useState(() =>
    countriesFromApi.reduce((accum, el) => {
      if (
        countriesGeoJSONData.features.some((feature) => {
          return feature.properties?.iso_a2_eh === el.code;
        })
      ) {
        return [el.code, ...accum];
      }
      return accum;
    }, [] as Array<string>)
  );

  const [currentCountryCode, setCurrentCountryCode] = useState(() =>
    getRandomElement(countriesInTheGame)
  );

  const [currentQuestionType, setCurrentQuestionType] = useState(() =>
    makeQuestionType()
  );

  const [wrongAnswersForRound, setWrongAnswersForRound] = useState<
    Array<string>
  >([]);

  const [correctAnswers, setCorrectAnswers] = useState<Array<string>>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const onAnswer = (countryCode: string) => {
    if (countryCode === currentCountryCode) {
      setCorrectAnswers((correctAnswers) => [
        ...correctAnswers,
        currentCountryCode,
      ]);

      setScore((score) => score + 1);
      const remainingCountriesIntheGame = countriesInTheGame.filter(
        (el) => el !== countryCode
      );
      setCountriesInTheGame(remainingCountriesIntheGame);

      setCurrentCountryCode(getRandomElement(remainingCountriesIntheGame));
      setCurrentQuestionType(makeQuestionType());
    } else {
      setWrongAnswersForRound((wrongCountries) => [
        ...wrongCountries,
        countryCode,
      ]);

      api["error"]({
        message: "Wrong answer",
        duration: 2,
        description: "You have selected the wrong country. Please try again",
      });
      setAttempts((attempts) => attempts + 1);
    }
  };

  const onSkip = () => {
    setAttempts((attempts) => attempts + 10);
    setWrongAnswersForRound([]);
    setCurrentCountryCode(getRandomElement(countriesInTheGame));
    setCurrentQuestionType(makeQuestionType());
  };

  return (
    <div
      className={css`
        /* leaflet requires a fi heaight for working properly */
        height: 100vh;
        margin: 0;
        padding: 0;
        top: 0;
      `}
    >
      <CountriesMap
      countriesGeoJSON={countriesGeoJSONData as FeatureCollection}
        onCountryClick={onAnswer}
        wrongCountriesGuesses={wrongAnswersForRound}
        correctCountriesAnswers={correctAnswers}
      ></CountriesMap>

      <ScoreView
        score={score}
        attempts={attempts}
        className={css`
          top: 22px;
          right: 10px;
          position: fixed;
          background: rgba(255, 255, 255, 0.8);
          padding: 20px;
          z-index: 1000;
        `}
      />
      <Question
        onSkip={onSkip}
        className={css`
          position: fixed;
          top: 22px;
          left: 50vw;
          transform: translateX(-50%);

          background: rgba(255, 255, 255, 0.8);
          padding: 14px;
          z-index: 1000;
        `}
        country={codeToCountryMap[currentCountryCode]!}
        type={currentQuestionType}
      />

      {contextHolder}
    </div>
  );
}
