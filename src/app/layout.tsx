// Minimal root layout — intentionally empty of CSS and styles.
// Tailwind, fonts, and body classes live in src/app/(site)/layout.tsx
// so that /studio gets a clean document without CSS interference.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
