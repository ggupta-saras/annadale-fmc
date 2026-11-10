import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel's image optimizer returns HTTP 402
    // (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED) for any new transformation on
    // this account, so newly-added images rendered as blank frames while
    // previously-cached ones kept working — a confusing, silent failure that
    // would have hit every logo and practitioner photo the clinic uploads.
    //
    // Serving images unoptimised avoids it entirely. Little is lost here:
    // Sanity images already come back correctly sized from Sanity's own CDN via
    // urlFor(), and the three local files in /public are pre-sized for their
    // slots. Remove this if image optimisation is topped up on Vercel.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Old addresses for the policies, kept working for anyone who saved or shared
  // them. Temporary (307), so they can be repointed if the clinic later wants a
  // separate Patient Information page.
  async redirects() {
    return [
      { source: "/privacy", destination: "/policies/privacy-policy", permanent: false },
      { source: "/patient-information", destination: "/policies/privacy-policy", permanent: false },
      { source: "/social-media-policy.pdf", destination: "/policies/social-media-policy", permanent: false },
    ];
  },
};

export default nextConfig;
