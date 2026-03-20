const DAY_DATES = ["2026-03-20", "2026-03-21", "2026-03-22"];

export function parseTime(timeStr, dayIndex) {
  let cleaned = timeStr.replace(/[~+]/g, "").trim();

  if (cleaned.includes("\u2013")) cleaned = cleaned.split("\u2013")[0].trim();
  else if (cleaned.includes("-") && cleaned.includes(":"))
    cleaned = cleaned.split("-")[0].trim();

  if (!/[AP]M/i.test(cleaned)) {
    const ampmMatch = timeStr.match(/([AP]M)/i);
    if (ampmMatch) cleaned += " " + ampmMatch[1];
  }

  cleaned = cleaned.replace(/Late/gi, "").trim();

  const match = cleaned.match(/(\d{1,2}):(\d{2})\s*([AP]M)/i);
  if (!match) return null;

  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const dateBase = new Date(DAY_DATES[dayIndex] + "T00:00:00");
  dateBase.setHours(hours, minutes, 0, 0);
  return dateBase;
}

export function getCountdownInfo(now, dayIndex, items, dayOrders, dayTimeSlots) {
  const ordered = dayOrders[dayIndex];
  const timeSlots = dayTimeSlots ? dayTimeSlots[dayIndex] : null;
  const parsed = ordered
    .map((origIdx, displayPos) => {
      // Use time slot (position-based) if available, otherwise fall back to item time
      const timeStr = timeSlots ? (timeSlots[displayPos] || items[origIdx].time) : items[origIdx].time;
      return {
        origIdx,
        item: items[origIdx],
        startTime: parseTime(timeStr, dayIndex),
      };
    })
    .filter((p) => p.startTime !== null);

  parsed.sort((a, b) => a.startTime - b.startTime);

  let current = null;
  let next = null;

  for (let i = 0; i < parsed.length; i++) {
    if (parsed[i].startTime <= now) {
      current = parsed[i];
      next = parsed[i + 1] || null;
    }
  }

  if (!current && parsed.length > 0) {
    next = parsed[0];
  }

  return { current, next };
}

export function formatCountdown(ms) {
  if (ms <= 0) return "Now";
  const totalMin = Math.floor(ms / 60000);
  const hours = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}
