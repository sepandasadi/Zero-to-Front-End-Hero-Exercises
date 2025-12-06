// TODO: Fix ALL the terrible naming!
// Problems:
// - Vague function names: get(), do(), check()
// - Poor parameter names: x, y, obj, arr
// - Inconsistent patterns

// SMELL: What does "get" get?
export function get(x) {
  return x.filter(i => i.active)
}

// SMELL: What does "do" do?
export function do(obj) {
  return {
    ...obj,
    timestamp: Date.now(),
    processed: true
  }
}

// SMELL: What does "check" check?
export function check(x) {
  return x && x.length > 0
}

// SMELL: Single letter parameters
export function calc(x, y) {
  return x * y
}

// SMELL: What kind of formatting?
export function fmt(x) {
  return `$${x.toFixed(2)}`
}

// SMELL: Abbreviation
export function chk(e) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(e)
}

// SMELL: What is this processing?
export function proc(arr) {
  return arr.map(i => ({
    ...i,
    processed: true,
    timestamp: Date.now()
  }))
}

// SMELL: Too generic
export function validate(data) {
  return data !== null && data !== undefined
}

// SMELL: What does transform do?
export function transform(obj) {
  const result = {}
  for (const key in obj) {
    result[key.toLowerCase()] = obj[key]
  }
  return result
}

// SMELL: Abbreviation + unclear
export function getById(arr, id) {
  return arr.find(i => i.id === id)
}

