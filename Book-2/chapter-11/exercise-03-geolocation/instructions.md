# Exercise 03: Geolocation API

## 🎯 Objective

Learn to access user location using the Geolocation API. Handle permissions, track position changes, and build location-based features.

## 📚 What You'll Learn

- Request user location permission
- Get current position (one-time)
- Watch position changes (continuous)
- Handle errors and permission denials
- Calculate distance between coordinates
- Display location on a map
- Privacy and security considerations

## 📋 Tasks

### Task 1: Get Current Position

Request user's location once:
- Check if Geolocation API is available
- Request permission and get coordinates
- Display latitude and longitude
- Handle permission denial gracefully

### Task 2: Handle Errors

Implement proper error handling:
- Permission denied
- Position unavailable
- Timeout
- Display user-friendly error messages

### Task 3: Display Location Details

Show useful information:
- Latitude & Longitude
- Accuracy (in meters)
- Altitude (if available)
- Speed (if available)
- Timestamp

### Task 4: Watch Position Changes

Track user movement:
- Use `watchPosition()` instead of `getCurrentPosition()`
- Update display as user moves
- Clear watch when not needed

### Task 5: Calculate Distance

Implement the Haversine formula:
- Calculate distance between two points
- Display distance in km and miles
- Compare current location to a fixed point

### Task 6: Integration Ideas

Optional enhancements:
- Show location on Google Maps / OpenStreetMap
- Find nearby places (requires external API)
- Track user's path
- Geofencing (alert when entering/leaving area)

## ✅ Success Criteria

1. ✅ Successfully request and display location
2. ✅ Handle all error cases gracefully
3. ✅ Watch position changes
4. ✅ Calculate distance correctly
5. ✅ Provide clear user feedback
6. ✅ Respect user privacy

## 💡 Hints

### Hint 1: Check API Availability
```js
if ('geolocation' in navigator) {
  // Available
} else {
  // Not available
}
```

### Hint 2: Get Position
```js
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
  },
  (error) => {
    console.error(error.message);
  }
);
```

### Hint 3: Watch Position
```js
const watchId = navigator.geolocation.watchPosition(success, error);
// Later: clear it
navigator.geolocation.clearWatch(watchId);
```

### Hint 4: Haversine Formula
```js
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in km
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}
```

## 🧪 Testing

1. **Allow Permission:** Test normal flow
2. **Deny Permission:** Verify error handling
3. **Move Around:** Test watchPosition (if on mobile)
4. **Chrome DevTools:** Use Sensors tab to simulate locations
5. **Different Browsers:** Test cross-browser compatibility

**Chrome DevTools Sensors:**
- Open DevTools → More tools → Sensors
- Override geolocation with custom coordinates
- Test different scenarios

## ⏱️ Estimated Time

**30-40 minutes**
- Basic position: 10 min
- Error handling: 5 min
- Position details: 5 min
- Watch position: 10 min
- Distance calculation: 10 min

## 🎯 Bonus Challenges

1. **Reverse Geocoding**: Convert coordinates to address (use external API)
2. **Weather**: Fetch weather for current location
3. **Directions**: Calculate bearing/direction to a point
4. **Speed Tracking**: Monitor and display current speed
5. **Position History**: Store and display past locations
6. **Privacy Mode**: Option to use approximate location

## ⚠️ Important Notes

**Privacy & Security:**
- Geolocation requires HTTPS (or localhost for testing)
- Always explain WHY you need location
- Provide value before requesting permission
- Allow users to deny and still use the app
- Don't store location without consent
- Consider privacy implications

**Accuracy:**
- GPS (mobile): Very accurate (5-10m)
- Wi-Fi: Moderate accuracy (20-50m)
- IP-based: Low accuracy (city-level)
- Indoors may have reduced accuracy

## 📖 Resources

- [MDN: Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [W3C Geolocation Spec](https://w3c.github.io/geolocation-api/)
- [web.dev: Geolocation](https://web.dev/user-location/)

---

**Ready to locate?** Open the starter file and build location features! 📍
