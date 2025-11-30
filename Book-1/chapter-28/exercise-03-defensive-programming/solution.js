// Exercise 3: Defensive Programming - SOLUTION

// Simple solution
function getUserCity(user) {
  return user?.profile?.address?.city ?? 'Unknown';
}

// Test all cases
console.log('=== Test 1: null ===');
console.log(getUserCity(null)); // 'Unknown'

console.log('\n=== Test 2: empty object ===');
console.log(getUserCity({})); // 'Unknown'

console.log('\n=== Test 3: profile only ===');
console.log(getUserCity({ profile: {} })); // 'Unknown'

console.log('\n=== Test 4: profile.address, no city ===');
console.log(getUserCity({ profile: { address: {} } })); // 'Unknown'

console.log('\n=== Test 5: complete object ===');
console.log(getUserCity({ profile: { address: { city: 'New York' } } })); // 'New York'

// ========================================
// BONUS 1: getUserEmail
// ========================================

function getUserEmail(user) {
  return user?.contact?.email ?? 'no-email@example.com';
}

console.log('\n=== Bonus 1: getUserEmail ===');
console.log(getUserEmail(null)); // 'no-email@example.com'
console.log(getUserEmail({ contact: { email: 'alice@example.com' } })); // 'alice@example.com'

// ========================================
// BONUS 2: Generic nested value getter
// ========================================

function getNestedValue(obj, path, defaultValue = null) {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current == null) {
      return defaultValue;
    }
    current = current[key];
  }

  return current ?? defaultValue;
}

console.log('\n=== Bonus 2: getNestedValue ===');
const testObj = {
  user: {
    profile: {
      address: {
        city: 'Boston'
      }
    }
  }
};

console.log(getNestedValue(testObj, 'user.profile.address.city', 'Unknown')); // 'Boston'
console.log(getNestedValue(testObj, 'user.profile.phone', 'Unknown')); // 'Unknown'
console.log(getNestedValue(null, 'user.name', 'Guest')); // 'Guest'

// ========================================
// BONUS 3: With type checking
// ========================================

function getUserCityWithValidation(user) {
  const city = user?.profile?.address?.city;

  // Check if it's a string
  if (typeof city === 'string' && city.trim().length > 0) {
    return city;
  }

  console.warn('City not available or invalid for user:', user);
  return 'Unknown';
}

console.log('\n=== Bonus 3: With Type Validation ===');
console.log(getUserCityWithValidation({ profile: { address: { city: 'LA' } } })); // 'LA'
console.log(getUserCityWithValidation({ profile: { address: { city: 123 } } })); // 'Unknown' (not a string)
console.log(getUserCityWithValidation({ profile: { address: { city: '' } } })); // 'Unknown' (empty string)


