"use client";

import { css } from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardQuestion } from "@fortawesome/free-solid-svg-icons";
import { CountryType } from "./GeoGameMain";
import { Button } from "antd";

export default function Question({
  country,
  type,
  className,
  onSkip,
}: {
  country: CountryType;
  type: "capital" | "flag" | "name";
  className?: string;
  onSkip: () => void;
}) {
  //30 % chance
  let text;
  switch (type) {
    case "capital":
      text = `What country's capital is ${country.capital}?`;
      break;
    case "flag":
      text = `Which country's flag is this?`;
      break;
    case "name":
      text = `Find ${country.name}`;
      break;
    default:
      throw new Error("Invalid question type");
  }

  return (
    <div
      className={[
        css`
          display: flex;
          flex-direction: row;
          width: 300px;
          color: #212121;
          & svg {
            color: blue;
            font-size: 24px;
            padding-right: 8px;
          }
        `,
        className,
      ].join(" ")}
    >
      <div>
        <FontAwesomeIcon icon={faClipboardQuestion} />
      </div>

      <div
        className={css`
          width: 100%;
          text-align: center;
        `}
      >
        {type === "flag" && (
          <div
            className={css`
              font-size: 48px;
            `}
          >
            {country.emoji}
          </div>
        )}
        {text}
      </div>

      <Button
        onClick={onSkip}
        className={css`
          position: absolute;
          right: 0px;
          bottom: -28px;
        `}
        danger
        type="primary"
        size="small"
      >
        Skip (-10 Atempts)
      </Button>
    </div>
  );
}
