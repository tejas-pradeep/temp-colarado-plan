import { getCountdownInfo, formatCountdown } from "./utils";

export default function CountdownBanner({
  now,
  dayIndex,
  items,
  dayOrders,
  accent,
  color,
}) {
  if (!now) return null;

  const { current, next } = getCountdownInfo(now, dayIndex, items, dayOrders);

  if (!current && !next) return null;

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${color}, ${accent})`,
        borderRadius: 10,
        padding: "12px 16px",
        marginBottom: 16,
        color: "white",
      }}
    >
      {current && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: next ? 6 : 0,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1,
              background: "rgba(255,255,255,0.25)",
              padding: "2px 8px",
              borderRadius: 10,
            }}
          >
            NOW
          </span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>
            {current.item.icon} {current.item.title}
          </span>
        </div>
      )}
      {next && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1,
              background: "rgba(255,255,255,0.15)",
              padding: "2px 8px",
              borderRadius: 10,
            }}
          >
            NEXT
          </span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>
            {next.item.icon} {next.item.title}
          </span>
          <span style={{ fontSize: 11, opacity: 0.85, marginLeft: "auto" }}>
            in {formatCountdown(next.startTime - now)}
          </span>
        </div>
      )}
      {current && !next && (
        <div
          style={{ fontSize: 11, opacity: 0.8, marginTop: 4, fontStyle: "italic" }}
        >
          Last activity of the day
        </div>
      )}
    </div>
  );
}
