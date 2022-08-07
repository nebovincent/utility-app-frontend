const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    visualCrossingWeatherApi:
      process.env.NEXT_PUBLIC_VISUAL_CROSSING_WEATHER_API,
    visualCrossingApiKey: process.env.NEXT_PUBLIC_VISUAL_CROSSING_API_KEY,
    exchangeRateApi: process.env.NEXT_PUBLIC_EXCHANGERATE_HOST,
    mongodb_host: process.env.NEXT_PUBLIC_MONGO_DB_HOST,
    appUrl: process.env.NEXT_PUBLIC_URL,
    backend_url: process.env.NEXT_PUBLIC_BACKEND_URL,
    profilePictureLink: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/profiles/`,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
