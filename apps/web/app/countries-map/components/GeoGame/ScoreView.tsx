"use client";

import { css } from "@emotion/css";

export default function ScoreView({
  score = 0,
  attempts = 0,
  className
}: {
  score?: number;
  attempts?: number;
  className?: string;
}) {
  return (
    <div className={[className].join(' ')}>
      <div className={css`color: green;`}>Score: {score}/20</div>
      <div className={css`color: red;`}>Attempts: {attempts}</div>
    </div>
  );
}
