// absolute url deployment solution by me
const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? process.env.NEXT_PUBLIC_BACKEND_URL
  : process.env.NEXT_PUBLIC_HEROKU_LINK;
// absolute url deployment solution by me
