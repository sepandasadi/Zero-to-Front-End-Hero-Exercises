# Weather Dashboard - Requirements

## API Setup
**Provider:** OpenWeather API (free tier)
**Sign up:** https://openweathermap.org/api
**Endpoints:**
- Current: `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&units=metric`
- Forecast: `https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={key}&units=metric`

## Core Features
1. Search cities and add to dashboard
2. Display current weather (temp, description, humidity, wind speed)
3. Show 5-day forecast
4. Remove cities
5. Temperature unit toggle (°C ↔ °F)
6. Auto-refresh every 10 minutes
7. Save cities to localStorage
8. Loading/error states

## Technical Requirements
- Async/await for all API calls
- Error handling for network failures, city not found, invalid API key
- Cache API responses (10 min expiry)
- ES6 modules recommended
- No jQuery or libraries (vanilla JS)

## Testing Checklist
- [ ] Can search and add cities
- [ ] Current weather displays correctly
- [ ] 5-day forecast shows
- [ ] Can remove cities
- [ ] Temperature units toggle
- [ ] Auto-refresh works
- [ ] Data persists after refresh
- [ ] Loading states show
- [ ] Errors handled gracefully
- [ ] Responsive on all devices
