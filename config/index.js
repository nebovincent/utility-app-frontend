// absolute url deployment solution by me
const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:8080"
  : process.env.NEXT_PUBLIC_BACKEND_URL;
// absolute url deployment solution by me
