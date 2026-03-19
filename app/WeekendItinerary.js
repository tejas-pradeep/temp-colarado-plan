"use client";

import { useState } from "react";

const DAYS = [
  {
    day: "FRIDAY",
    date: "March 20",
    resort: "Keystone",
    color: "#1a5276",
    accent: "#2980b9",
    passNote: "USE EPIC PASS #1",
    passExplain:
      "Covers River Run Gondola sightseeing access + 20% off on-mountain dining via Epic Mountain Rewards",
    items: [
      {
        time: "9:45 AM",
        title: "Drive from Airbnb to Keystone",
        desc: "Breckenridge → Keystone is only ~20 min. Arrive early to get settled before your meeting.",
        tag: "DRIVE",
        icon: "🚗",
      },
      {
        time: "10:15 – 11:30 AM",
        title: "Meeting @ Inxpot Coffeehouse",
        desc: "Inxpot is in River Run Village right near the gondola — library-lounge vibe, free WiFi, great coffee and breakfast burritos. Opens at 7am. Post up with a coffee, take your 10:30–11:30 meeting, and you're already in the village when you're done.",
        tag: "MEETING",
        icon: "💼",
      },
      {
        time: "11:30 AM – 1:00 PM",
        title: "Lunch & Fireside Hang",
        desc: "You're already in the village — grab lunch at New Moon Café (classic rock vibes, full menu all day) or Kickapoo Tavern. Warm up by the big firepit in River Run Village Plaza.",
        tag: "FOOD",
        icon: "🍽️",
      },
      {
        time: "1:00 – 3:00 PM",
        title: "Gondola Up & Mountain Views",
        desc: "Ride the River Run Gondola to the top of Dercum Mountain with your Epic Pass. Explore the Snow Fort, check out the views from the summit, grab a hot chocolate or drink at the mountaintop lodge. Take your time — ride back down whenever you're ready. Browse the shops in River Run Village after.",
        tag: "ACTIVITY",
        icon: "🏔️",
      },
      {
        time: "~2:00 PM",
        title: "🤝 Meetup #1 — Summit House, Top of Dercum",
        desc: "Text your friends to meet you at Summit House at the top of the gondola around 2 PM for a drink. Blue/black skiers can get there easily from anywhere on the mountain. You're already up there — grab a table and wait for them. Quick hangout before they hit more runs and you ride down.",
        tag: "MEETUP",
        icon: "🤝",
      },
      {
        time: "3:00 – 5:00 PM",
        title: "Brewery Hop",
        desc: "Summit County has ~8 craft breweries. Hit a couple to ease into the weekend. Remember: altitude makes drinks hit harder.",
        tag: "DRINKS",
        icon: "🍺",
      },
      {
        time: "~4:30 PM",
        title: "🤝 Meetup #2 — Kickapoo Tavern, River Run",
        desc: "Lifts close around 4 PM. Tell your crew to ski their last run down to River Run and meet you at Kickapoo Tavern — it's right across the bridge from the gondola, has a sun deck with views of skiers coming down. This is THE après spot at Keystone. Regroup here and head to dinner together.",
        tag: "MEETUP",
        icon: "🤝",
      },
      {
        time: "5:30 – 7:00 PM",
        title: "Dinner",
        desc: "Grab dinner before the show. Kickapoo Tavern in River Run is a solid option, or Zuma Roadhouse for casual Mexican. Use your Epic Pass for 20% off on-mountain dining options.",
        tag: "FOOD",
        icon: "🍽️",
      },
      {
        time: "7:30 – 10:00 PM",
        title: "Winter Comedy Series @ Warren Station",
        desc: "Comedy Works Denver brings the laughs to Keystone. Great warm-up night before the big Saturday. Tickets required. Quick 20-min drive back to your Airbnb after.",
        tag: "EVENT",
        icon: "🎤",
      },
    ],
  },
  {
    day: "SATURDAY",
    date: "March 21",
    resort: "Vail",
    color: "#7b241c",
    accent: "#e74c3c",
    passNote: "USE EPIC PASS #2",
    passExplain:
      "Covers Gondola One foot-passenger access (saves ~$65–75 sightseeing ticket) + 20% off on-mountain dining",
    items: [
      {
        time: "9:00 AM",
        title: "Drive to Vail",
        desc: "Breckenridge → Vail is ~45 min via I-70 West. Get there early to soak it in.",
        tag: "DRIVE",
        icon: "🚗",
      },
      {
        time: "10:00 – 11:30 AM",
        title: "Gondola One → Lunch at The 10th",
        desc: "Use your Epic Pass to ride Gondola One up to Mid-Vail. Have a long, leisurely lunch at The 10th — upscale mountain cuisine, craft cocktails, Gore Range views. Open to non-skiers. The DJ on the back patio has been playing select weekends this season too.",
        tag: "FOOD",
        icon: "🍽️",
      },
      {
        time: "~11:00 AM",
        title: "🤝 Meetup #1 — The 10th, Mid-Vail",
        desc: "Have your friends ski to Mid-Vail (top of Gondola One) and join you for lunch at The 10th around 11. It's a natural midpoint on the mountain — blue/black skiers pass through here constantly. Share a meal with mountain views, then they head back out and you ride down to the village.",
        tag: "MEETUP",
        icon: "🤝",
      },
      {
        time: "12:00 – 12:45 PM",
        title: "Explore Vail Village",
        desc: "Walk the pedestrian village. Window shop, coffee, or grab a drink at Pepi's Bar (classic Austrian après vibe since the 1960s). Then head over to Avanti at Golden Peak to get a good spot before it fills up.",
        tag: "EXPLORE",
        icon: "🏘️",
      },
      {
        time: "1:00 – 5:00 PM",
        title: "Experts Only Popup — Devault @ Avanti F&B",
        desc: "Your anchor for the afternoon. Avanti is at the base of Golden Peak — food hall with 5 stalls (burgers, ramen, pizza, Mediterranean, caviar bar), two full bars, and the biggest patio in Vail with mountain views and fire pits. Grab food, post up with drinks, and catch Devault's set. Camp here and enjoy it. Note: Flamingosis plays Express Lift Bar (2–5 PM) and RAW CUTS ft. salute plays Solaris Plaza (3–6 PM) — both free and walkable if you want to pop over, but Avanti is the move.",
        tag: "⚡ KEY EVENT",
        icon: "🔥",
      },
      {
        time: "~3:30 PM",
        title: "🤝 Meetup #2 — Avanti F&B, Golden Peak Base",
        desc: "Tell your friends to take their last few runs down to Golden Peak (Riva Bahn Express chair drops right at Avanti's door). They ski in, boots off, grab food and drinks, and join the Devault set with you. Perfect convergence point — they get last runs, you've been vibing all afternoon. Together for the rest of the night.",
        tag: "MEETUP",
        icon: "🤝",
      },
      {
        time: "5:00 – 6:00 PM",
        title: "Solaris Plaza or Ford Park",
        desc: "Option A: Walk to Solaris Plaza and catch the tail end of the RAW CUTS set (free, runs until 6 PM). Option B: If you scored resale tix for Experts Only @ Ford Park (SIDEPIECE, Aspens — SOLD OUT on primary, check AXS Resale/StubHub, 21+), head there at 5 PM. Option C: Stay at Avanti and keep the vibe going.",
        tag: "DRINKS",
        icon: "🎧",
      },
      {
        time: "6:30 – 8:30 PM",
        title: "Dinner in Vail Village",
        desc: "Refuel before the late night. Alpine Pizza for Detroit-style slices (local favorite), Avanti if you're still there, or go bigger at Mountain Standard or Sweet Basil. Use your Epic Pass for 20% off on-mountain dining.",
        tag: "FOOD",
        icon: "🍽️",
      },
      {
        time: "9:00 PM – Late",
        title: "Late Night in Vail Village",
        desc: "Chasing Rabbits — underground cocktail bar with DJs, arcade games, and likely an EO afterparty. Shakedown Bar — live music, cheap drinks, always packed. Bridge Street Bar — the dance floor spot. Plan a designated driver or rideshare back to Breck (~45 min).",
        tag: "NIGHTLIFE",
        icon: "🌙",
      },
    ],
  },
  {
    day: "SUNDAY",
    date: "March 22",
    resort: "Breckenridge",
    color: "#1e6e3e",
    accent: "#27ae60",
    passNote: "NO PASS NEEDED",
    passExplain:
      "BreckConnect Gondola is FREE for everyone — no ticket or pass required. Save your passes for Fri & Sat.",
    items: [
      {
        time: "10:00 AM",
        title: "Sleep In & Stroll Into Town",
        desc: "You're already near Breck at your Airbnb — no long drive needed. You earned the late start after Saturday in Vail.",
        tag: "CHILL",
        icon: "😴",
      },
      {
        time: "11:00 AM – 12:30 PM",
        title: "BreckConnect Gondola + Coffee",
        desc: "Ride the FREE gondola from town up to the base of Peak 8. Stunning views, fresh mountain air, zero cost. Grab coffee and breakfast at a café on Main Street before or after.",
        tag: "FREE",
        icon: "🚡",
      },
      {
        time: "12:30 – 2:30 PM",
        title: "Main Street Stroll & Lunch",
        desc: "Breckenridge's historic Main Street is the most walkable mountain town in Colorado. Browse shops, galleries, and the Breckenridge Arts District. Grab lunch — tons of options from casual to upscale.",
        tag: "EXPLORE",
        icon: "🛍️",
      },
      {
        time: "~12:30 PM",
        title: "🤝 Meetup #1 — Base of Peak 8, T-Bar or Ten Mile Station",
        desc: "Have your friends ski to the base of Peak 8 around 12:30 for a lunch break. You can walk from the top of the BreckConnect Gondola right to the base area. Ten Mile Station (mid-mountain, accessible by gondola) or the lodge at the base of Peak 8 both work. Quick meal together, then they head back up for afternoon laps.",
        tag: "MEETUP",
        icon: "🤝",
      },
      {
        time: "2:30 – 4:00 PM",
        title: "Recovery Activity — Pick Your Vibe",
        desc: "Option A: Spa day at Blue Sage (book ahead). Option B: Slope-side drinks at the base of Peak 8 or 9 — watch your friends ski, soak up the sun. Option C: Gallery hop in the Arts District or hit a brewery.",
        tag: "CHILL",
        icon: "🧖",
      },
      {
        time: "4:00 – 6:00 PM",
        title: "Après on Main Street & Closing Drinks",
        desc: "Wrap the weekend on a high note. Breck's Main Street après scene is lively — Broken Compass Brewing, The Canteen, or Cecilia's for cocktails. Toast to a legendary weekend.",
        tag: "DRINKS",
        icon: "🥂",
      },
      {
        time: "~4:00 PM",
        title: "🤝 Meetup #2 — Main Street Après",
        desc: "Lifts close around 4 PM. Skiers take their last run down to the base of Peak 9 — it drops right onto Main Street. Pick a bar (Broken Compass is a great call), grab a table, and text the crew your location. Everyone together for the closing drinks of the weekend.",
        tag: "MEETUP",
        icon: "🤝",
      },
      {
        time: "6:00 PM+",
        title: "Back to the Airbnb",
        desc: "Short trip back to your Airbnb. Hot tub, takeout, relive the weekend. Legendary three days in the books.",
        tag: "CHILL",
        icon: "🏠",
      },
    ],
  },
];

const tagColors = {
  HOME: { bg: "#f5f5f5", text: "#555" },
  MEETING: { bg: "#e8eaf6", text: "#283593" },
  MEETUP: { bg: "#fff8e1", text: "#f57f17" },
  DRIVE: { bg: "#ecf0f1", text: "#7f8c8d" },
  ACTIVITY: { bg: "#ebf5fb", text: "#2980b9" },
  EXPLORE: { bg: "#fef9e7", text: "#b7950b" },
  FOOD: { bg: "#fdedec", text: "#c0392b" },
  DRINKS: { bg: "#fef5e7", text: "#e67e22" },
  EVENT: { bg: "#f4ecf7", text: "#8e44ad" },
  "FREE MUSIC": { bg: "#eafaf1", text: "#1a8a4a" },
  "⚡ KEY EVENT": { bg: "#fff3e0", text: "#d35400" },
  TICKETED: { bg: "#fce4ec", text: "#c62828" },
  NIGHTLIFE: { bg: "#ede7f6", text: "#5e35b1" },
  CHILL: { bg: "#e8f5e9", text: "#388e3c" },
  FREE: { bg: "#e0f7fa", text: "#00838f" },
};

export default function WeekendItinerary() {
  const [activeDay, setActiveDay] = useState(0);
  const day = DAYS[activeDay];

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
          Keystone → Vail → Breck
        </h1>
        <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
          March 20–22, 2026 · No skiing required · Based near Breckenridge
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
          marginBottom: 20,
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
            🎿 {day.passNote}
          </span>
        </div>
        <div
          style={{
            fontSize: 13,
            opacity: 0.92,
            lineHeight: 1.5,
          }}
        >
          {day.passExplain}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {day.items.map((item, i) => {
          const tc = tagColors[item.tag] || { bg: "#f0f0f0", text: "#555" };
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                marginBottom: 16,
                position: "relative",
              }}
            >
              {/* Timeline line */}
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
                    border:
                      item.tag === "⚡ KEY EVENT"
                        ? `2px solid ${day.accent}`
                        : "2px solid #e8e8e8",
                  }}
                >
                  {item.icon}
                </div>
                {i < day.items.length - 1 && (
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
                  borderLeft:
                    item.tag === "⚡ KEY EVENT"
                      ? `3px solid ${day.accent}`
                      : "none",
                  paddingLeft: item.tag === "⚡ KEY EVENT" ? 12 : 0,
                  background:
                    item.tag === "⚡ KEY EVENT" ? `${day.accent}08` : "none",
                  borderRadius: item.tag === "⚡ KEY EVENT" ? 6 : 0,
                  padding: item.tag === "⚡ KEY EVENT" ? "8px 12px" : "0",
                }}
              >
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
                    {item.time}
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
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#1a1a1a",
                    lineHeight: 1.3,
                    marginBottom: 3,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#555",
                    lineHeight: 1.55,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </div>
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
            <strong>Base camp →</strong> Airbnb near Breckenridge (20 min to
            Keystone, 45 min to Vail)
          </div>
          <div>
            <strong>Friday meeting →</strong> Inxpot Coffeehouse, 195 River Run
            Rd #B9, Keystone (free WiFi, opens 7am)
          </div>
          <div>
            <strong>Epic Pass #1 →</strong> Friday at Keystone (gondola + dining
            discount)
          </div>
          <div>
            <strong>Epic Pass #2 →</strong> Saturday at Vail (gondola + dining
            discount)
          </div>
          <div>
            <strong>Sunday at Breck →</strong> BreckConnect Gondola is FREE, no
            pass needed
          </div>
          <div style={{ marginTop: 8, color: "#777", fontSize: 12 }}>
            ⚡ <strong>Avanti F&B Vail</strong> — 458 Vail Valley Dr, base of
            Golden Peak. On the free Town of Vail shuttle line & walkable from
            Gondola One. Parking avail 11am–2pm at Golden Peak lot, after 5pm in
            front of lodge.
          </div>
          <div style={{ marginTop: 4, color: "#777", fontSize: 12 }}>
            📱 Follow <strong>@expertsonlyrecs</strong> and{" "}
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
              🤝 MEETUP CHEAT SHEET — TEXT YOUR FRIENDS
            </div>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>
              <div>
                <strong>Fri ~2 PM →</strong> Summit House, top of Dercum
                (gondola accessible)
              </div>
              <div>
                <strong>Fri ~4:30 PM →</strong> Kickapoo Tavern, River Run (ski
                down to base)
              </div>
              <div>
                <strong>Sat ~11 AM →</strong> The 10th, Mid-Vail (ski to Gondola
                One top)
              </div>
              <div>
                <strong>Sat ~3:30 PM →</strong> Avanti F&B, Golden Peak base
                (ski down Riva Bahn)
              </div>
              <div>
                <strong>Sun ~12:30 PM →</strong> Base of Peak 8 (ski down for
                lunch)
              </div>
              <div>
                <strong>Sun ~4 PM →</strong> Main Street après (last run to Peak
                9 base)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
