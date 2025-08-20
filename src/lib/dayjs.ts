// lib/dayjs.ts
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import updateLocale from "dayjs/plugin/updateLocale";

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(updateLocale);

// Optional: Customize locale for short-form display
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "now",
    m: "1m",
    mm: "%dm",
    h: "1H",
    hh: "%dH",
    d: "1D",
    dd: "%dD",
    w: "1W",
    ww: "%dW",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy",
  },
});

export default dayjs;
