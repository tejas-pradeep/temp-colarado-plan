const modeEmoji = { drive: "\uD83D\uDE97", walk: "\uD83D\uDEB6", shuttle: "\uD83D\uDE8C" };

export default function TravelIndicator({ travelTime, travelMode }) {
  if (!travelTime) return null;
  const emoji = modeEmoji[travelMode] || "\uD83D\uDEB6";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px 0",
      }}
    >
      <span
        style={{
          fontSize: 10,
          color: "#999",
          background: "#f5f5f5",
          padding: "2px 8px",
          borderRadius: 10,
          display: "inline-flex",
          alignItems: "center",
          gap: 3,
          whiteSpace: "nowrap",
        }}
      >
        {emoji} {travelTime}
      </span>
    </div>
  );
}
