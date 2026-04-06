# GoTicket — Data & Analytics Potential

## Data You Can Collect

With the current schema (User + Ticket), you already have:

**Per ticket:**
- Route (source → destination)
- Transport mode (Bus AC/Non-AC, Cab, Bike)
- Price paid
- Timestamp
- User who booked

**Per user:**
- Role (passenger/driver)
- Registration date
- Booking history

---

## Insights You Can Derive Right Now

**Demand patterns**
- Most popular routes
- Peak booking hours/days
- Which transport modes are preferred on which routes

**Revenue**
- Revenue per route, per mode, per time period
- Average ticket price by transport type
- Revenue trends over time

**User behavior**
- Repeat vs one-time users
- Average booking frequency per passenger
- Drop-off rate (registered but never booked)

**Operational**
- Underserved routes (high demand, few options)
- Dead routes (low/no bookings)
- Price sensitivity per route

---

## Where This Gets Interesting vs Existing Systems

Most public transport systems (DMRC, BEST, KSRTC) collect transaction data but **don't link it to individual behavior** — cards are anonymous or semi-anonymous.

GoTicket has named, logged-in users, which means:

| Traditional Systems | GoTicket Potential |
|--------------------|--------------------|
| Anonymous tap data | Full user journey mapping |
| Route-level aggregates | Individual demand forecasting |
| No mode comparison | Cross-modal preference data |
| Siloed operators | Unified multi-modal view |

---

## What Can Be Built On Top

**Short term (schema changes needed):**
- Add `latitude/longitude` to tickets → real geospatial heatmaps
- Add `vehicle_id` to tickets → link driver + passenger data
- Add `status` tracking (booked → in-transit → completed) → actual ride completion rates

**Analytics dashboard:**
- Admin panel with charts (Recharts/Chart.js)
- Route demand heatmap on Leaflet
- Real-time booking feed

**Predictive:**
- Demand forecasting by route + time (needs ~weeks of data)
- Dynamic pricing signals (surge on popular routes)
- Driver positioning recommendations

**Anomaly detection:**
- Unusually high bookings on a route → event detection
- Price outliers → fraud signals

---

## The Most Unique Angle

The combination of **QR validation by a named driver + timestamped booking by a named passenger** gives you a ground-truth dataset of who actually traveled, not just who paid — which most transit systems can't say. That's the dataset worth building on.
