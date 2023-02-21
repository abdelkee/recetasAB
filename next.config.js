const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      "worldfoodtour.co.uk",
      "static.onecms.io",
      "images.assetsdelivery.com",
      "cdn2.cocinadelirante.com",
      "iperu.pe",
    ],
  },
});
