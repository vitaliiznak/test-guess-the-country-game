"use client";

import { css } from "@emotion/css";
import Link from "next/link";

export default function CountriesMap() {
  return (
    <div
      className={css`
        position: relative;
        height: 90vh;
        width: 80vw;
        margin: 5vh auto;
        background-image: url("./main-page-background.webp");
        background-size: auto;
        background-position: center center;
        max-height: 100vh; /* Ensure at least full viewport height coverage */
        display: flex;
        justify-content: center; /* Centers content horizontally inside the div */
        align-items: center;
      `}
    >
      <Link
        className={css`
          font-size: 42px;
          background-color: #199319;
          color: white;
          padding: 15px 25px;
          text-decoration: none;
          &:hover {
            background-color: #223094;
          }
        `}
        href="/countries-map"
      >
        Play
      </Link>
    </div>
  );
}
