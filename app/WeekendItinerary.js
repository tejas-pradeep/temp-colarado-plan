"use client";

import { useState, useEffect } from "react";
import { DAYS } from "./itinerary/data";
import CountdownBanner from "./itinerary/CountdownBanner";
import TimelineItem from "./itinerary/TimelineItem";

export default function WeekendItinerary() {
  const [activeDay, setActiveDay] = useState(0);
  const [dayOrders, setDayOrders] = useState(
    DAYS.map((d) => d.items.map((_, i) => i))
  );
  const [cancelled, setCancelled] = useState(new Set());
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const day = DAYS[activeDay];

  const toggleCancel = (key) => {
    setCancelled((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const moveItem = (fromPos, toPos) => {
    if (toPos < 0 || toPos >= DAYS[activeDay].items.length) return;
    setDayOrders((prev) => {
      const next = prev.map((arr) => [...arr]);
      const temp = next[activeDay][fromPos];
      next[activeDay][fromPos] = next[activeDay][toPos];
      next[activeDay][toPos] = temp;
      return next;
    });
  };

  const currentOrder = dayOrders[activeDay];

  return (
    <div
      style={{
        fontFamily: "'Trebuchet MS', 'Lucida Grande', sans-serif",
        maxWidth: 720,
        margin: "0 auto",
        padding: "24px 16px",
        color: "#1a1a1a",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#888",
            marginBottom: 6,
          }}
        >
          Weekend Itinerary
        </div>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            margin: 0,
            lineHeight: 1.2,
            background: "linear-gradient(135deg, #1a5276, #e74c3c, #27ae60)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Keystone &rarr; Vail &rarr; Breck
        </h1>
        <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
          March 20&ndash;22, 2026 &middot; No skiing required &middot; Based near
          Breckenridge
        </div>
      </div>

      {/* Day Tabs */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 20,
          borderBottom: "2px solid #eee",
          paddingBottom: 0,
        }}
      >
        {DAYS.map((d, i) => (
          <button
            key={i}
            onClick={() => setActiveDay(i)}
            style={{
              flex: 1,
              padding: "10px 8px 12px",
              border: "none",
              borderBottom:
                activeDay === i
                  ? `3px solid ${d.color}`
                  : "3px solid transparent",
              background: activeDay === i ? `${d.color}0a` : "transparent",
              cursor: "pointer",
              transition: "all 0.2s",
              borderRadius: "6px 6px 0 0",
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: 2,
                color: activeDay === i ? d.color : "#999",
                fontWeight: 700,
              }}
            >
              {d.day}
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: activeDay === i ? d.color : "#666",
                marginTop: 2,
              }}
            >
              {d.resort}
            </div>
          </button>
        ))}
      </div>

      {/* Epic Pass Card */}
      <div
        style={{
          background: `linear-gradient(135deg, ${day.color}, ${day.accent})`,
          borderRadius: 10,
          padding: "14px 18px",
          marginBottom: 16,
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.25)",
              padding: "3px 10px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            &#127935; {day.passNote}
          </span>
        </div>
        <div style={{ fontSize: 13, opacity: 0.92, lineHeight: 1.5 }}>
          {day.passExplain}
        </div>
      </div>

      {/* Countdown Banner */}
      <CountdownBanner
        now={now}
        dayIndex={activeDay}
        items={day.items}
        dayOrders={dayOrders}
        accent={day.accent}
        color={day.color}
      />

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {currentOrder.map((origIdx, displayPos) => {
          const item = day.items[origIdx];
          const itemKey = `${activeDay}-${origIdx}`;
          const isCancelled = cancelled.has(itemKey);
          const nextOrigIdx = currentOrder[displayPos + 1];
          const nextItem =
            nextOrigIdx != null ? day.items[nextOrigIdx] : null;

          return (
            <TimelineItem
              key={origIdx}
              item={item}
              origIdx={origIdx}
              displayPos={displayPos}
              totalItems={currentOrder.length}
              activeDay={activeDay}
              day={day}
              isCancelled={isCancelled}
              isCurrentActivity={false}
              nextItem={nextItem}
              onToggleCancel={toggleCancel}
              onMove={moveItem}
            />
          );
        })}
      </div>

      {/* Footer tips */}
      <div
        style={{
          marginTop: 24,
          padding: "16px 18px",
          background: "#f8f9fa",
          borderRadius: 10,
          border: "1px solid #e8e8e8",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#888",
            marginBottom: 10,
          }}
        >
          Quick Reference
        </div>
        <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
          <div>
            <strong>Base camp &rarr;</strong> Airbnb near Breckenridge (20 min to
            Keystone, 45 min to Vail)
          </div>
          <div>
            <strong>Friday meeting &rarr;</strong> Inxpot Coffeehouse, 195 River
            Run Rd #B9, Keystone (free WiFi, opens 7am)
          </div>
          <div>
            <strong>Epic Pass #1 &rarr;</strong> Friday at Keystone (gondola +
            dining discount)
          </div>
          <div>
            <strong>Epic Pass #2 &rarr;</strong> Saturday at Vail (gondola +
            dining discount)
          </div>
          <div>
            <strong>Sunday at Breck &rarr;</strong> BreckConnect Gondola is FREE,
            no pass needed
          </div>
          <div style={{ marginTop: 8, color: "#777", fontSize: 12 }}>
            &#9889; <strong>Avanti F&amp;B Vail</strong> &mdash; 458 Vail Valley
            Dr, base of Golden Peak. On the free Town of Vail shuttle line &amp;
            walkable from Gondola One. Parking avail 11am&ndash;2pm at Golden
            Peak lot, after 5pm in front of lodge.
          </div>
          <div style={{ marginTop: 4, color: "#777", fontSize: 12 }}>
            &#128241; Follow <strong>@expertsonlyrecs</strong> and{" "}
            <strong>@VailMtn</strong> on IG for any last-minute popup updates
          </div>
          <div
            style={{
              marginTop: 12,
              borderTop: "1px solid #e0e0e0",
              paddingTop: 10,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1,
                color: "#f57f17",
                marginBottom: 6,
              }}
            >
              &#129309; MEETUP CHEAT SHEET &mdash; TEXT YOUR FRIENDS
            </div>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>
              <div>
                <strong>Fri ~2 PM &rarr;</strong> Summit House, top of Dercum
                (gondola accessible)
              </div>
              <div>
                <strong>Fri ~4:30 PM &rarr;</strong> Kickapoo Tavern, River Run
                (ski down to base)
              </div>
              <div>
                <strong>Sat ~11 AM &rarr;</strong> The 10th, Mid-Vail (ski to
                Gondola One top)
              </div>
              <div>
                <strong>Sat ~3:30 PM &rarr;</strong> Avanti F&amp;B, Golden Peak
                base (ski down Riva Bahn)
              </div>
              <div>
                <strong>Sun ~12:30 PM &rarr;</strong> Base of Peak 8 (ski down
                for lunch)
              </div>
              <div>
                <strong>Sun ~4 PM &rarr;</strong> Main Street apr&egrave;s (last
                run to Peak 9 base)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
