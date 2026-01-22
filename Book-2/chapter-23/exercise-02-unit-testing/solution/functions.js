// functions.js - SOLUTION

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function reverseString(str) {
  return str.split('').reverse().join('');
}

function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

function countVowels(str) {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

function getUniqueValues(arr) {
  return [...new Set(arr)];
}

function groupByProperty(arr, key) {
  return arr.reduce((groups, item) => {
    const value = item[key];
    if (!groups[value]) {
      groups[value] = [];
    }
    groups[value].push(item);
    return groups;
  }, {});
}

module.exports = {
  capitalize,
  reverseString,
  isPalindrome,
  countVowels,
  getUniqueValues,
  groupByProperty
};
