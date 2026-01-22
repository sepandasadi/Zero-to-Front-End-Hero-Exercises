// Heavy module with lots of code (simulated)
// This will be code-split into a separate chunk

export function processData(data) {
  console.log('Heavy module: Processing data...')
  
  // Simulate heavy computation
  const processed = data.map(n => {
    let result = n
    for (let i = 0; i < 1000; i++) {
      result = Math.sqrt(result * result + 1)
    }
    return Math.round(result * 100) / 100
  })
  
  return processed
}

export function analyzeData(data) {
  const sum = data.reduce((acc, n) => acc + n, 0)
  const avg = sum / data.length
  const max = Math.max(...data)
  const min = Math.min(...data)
  
  return { sum, avg, max, min }
}

export function transformData(data, operation) {
  switch (operation) {
    case 'double':
      return data.map(n => n * 2)
    case 'square':
      return data.map(n => n * n)
    case 'sqrt':
      return data.map(n => Math.sqrt(n))
    default:
      return data
  }
}

// Lots more code to make this module "heavy"
export const CONSTANTS = {
  PI: Math.PI,
  E: Math.E,
  GOLDEN_RATIO: 1.618033988749,
}

export class DataProcessor {
  constructor(data) {
    this.data = data
    this.history = []
  }
  
  process() {
    const result = processData(this.data)
    this.history.push(result)
    return result
  }
  
  analyze() {
    return analyzeData(this.data)
  }
}

console.log('Heavy module loaded! This should be a separate chunk.')
