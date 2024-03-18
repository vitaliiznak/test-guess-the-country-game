/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: "export",
  basePath: process.env.NODE_ENV === 'production' ?  "/test-guess-the-country-game" : ''
};
