export const metadata = {
  title: "Colorado Weekend — Keystone → Vail → Breck",
  description: "Weekend itinerary: March 20–22, 2026. No skiing required.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#fff" }}>{children}</body>
    </html>
  );
}
