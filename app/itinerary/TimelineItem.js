import { tagColors } from "./data";
import TravelIndicator from "./TravelIndicator";

export default function TimelineItem({
  item,
  displayTime,
  origIdx,
  displayPos,
  totalItems,
  activeDay,
  day,
  isCancelled,
  isCurrentActivity,
  nextItem,
  onToggleCancel,
  onMove,
}) {
  const tc = tagColors[item.tag] || { bg: "#f0f0f0", text: "#555" };
  const itemKey = `${activeDay}-${origIdx}`;
  const isKeyEvent = item.tag === "\u26A1 KEY EVENT";

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 14,
          marginBottom: 0,
          position: "relative",
          opacity: isCancelled ? 0.4 : 1,
          transition: "opacity 0.2s",
        }}
      >
        {/* Timeline column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 36,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: tc.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
              border: isKeyEvent
                ? `2px solid ${day.accent}`
                : isCurrentActivity
                ? `2px solid ${day.accent}`
                : "2px solid #e8e8e8",
              boxShadow: isCurrentActivity
                ? `0 0 0 3px ${day.accent}33`
                : "none",
            }}
          >
            {item.icon}
          </div>
          {displayPos < totalItems - 1 && (
            <div
              style={{
                width: 2,
                flex: 1,
                background: "#e8e8e8",
                minHeight: 16,
              }}
            />
          )}
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            paddingBottom: 4,
            borderLeft: isKeyEvent ? `3px solid ${day.accent}` : "none",
            paddingLeft: isKeyEvent ? 12 : 0,
            background: isKeyEvent
              ? `${day.accent}08`
              : isCurrentActivity
              ? `${day.accent}06`
              : "none",
            borderRadius: isKeyEvent || isCurrentActivity ? 6 : 0,
            padding: isKeyEvent ? "8px 12px" : isCurrentActivity ? "8px 12px" : "0",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 3,
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: "#888",
                fontWeight: 600,
                minWidth: "fit-content",
              }}
            >
              {displayTime || item.time}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 0.5,
                padding: "2px 7px",
                borderRadius: 4,
                background: tc.bg,
                color: tc.text,
              }}
            >
              {item.tag}
            </span>

            {/* Action buttons */}
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: 3,
                alignItems: "center",
              }}
            >
              {displayPos > 0 && (
                <button
                  onClick={() => onMove(displayPos, displayPos - 1)}
                  style={{
                    width: 22,
                    height: 22,
                    border: "1px solid #ddd",
                    background: "#fafafa",
                    cursor: "pointer",
                    fontSize: 10,
                    borderRadius: 3,
                    padding: 0,
                    color: "#999",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title="Move up"
                >
                  {"\u25B2"}
                </button>
              )}
              {displayPos < totalItems - 1 && (
                <button
                  onClick={() => onMove(displayPos, displayPos + 1)}
                  style={{
                    width: 22,
                    height: 22,
                    border: "1px solid #ddd",
                    background: "#fafafa",
                    cursor: "pointer",
                    fontSize: 10,
                    borderRadius: 3,
                    padding: 0,
                    color: "#999",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title="Move down"
                >
                  {"\u25BC"}
                </button>
              )}
              <button
                onClick={() => onToggleCancel(itemKey)}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: "1px solid #ddd",
                  background: isCancelled ? "#e8f5e9" : "#f8f8f8",
                  cursor: "pointer",
                  fontSize: 12,
                  padding: 0,
                  color: isCancelled ? "#388e3c" : "#999",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title={isCancelled ? "Restore" : "Cancel"}
              >
                {isCancelled ? "\u21A9" : "\u00D7"}
              </button>
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.3,
              marginBottom: 3,
              textDecoration: isCancelled ? "line-through" : "none",
            }}
          >
            {item.title}
          </div>

          {/* Description (hidden when cancelled) */}
          {!isCancelled && (
            <div
              style={{
                fontSize: 13,
                color: "#555",
                lineHeight: 1.55,
              }}
            >
              {item.desc}
            </div>
          )}

          {/* Maps link */}
          {!isCancelled && item.mapQuery && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 11,
                color: day.accent,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              {"\uD83D\uDCCD"} View on Maps
            </a>
          )}
        </div>
      </div>

      {/* Travel indicator to next item */}
      {displayPos < totalItems - 1 && nextItem && (
        <div style={{ marginLeft: 18, paddingLeft: 0 }}>
          <TravelIndicator
            travelTime={nextItem.travelTime}
            travelMode={nextItem.travelMode}
          />
        </div>
      )}

      {/* Spacing */}
      <div style={{ height: nextItem?.travelTime ? 4 : 16 }} />
    </div>
  );
}
