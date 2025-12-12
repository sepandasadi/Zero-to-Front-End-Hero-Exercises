// Simulated data service that emits data every 3 seconds
class DataService {
  constructor() {
    this.subscribers = [];
    this.interval = null;
    this.startEmitting();
  }

  startEmitting() {
    this.interval = setInterval(() => {
      const data = {
        id: Date.now(),
        value: Math.random() * 1000,
        timestamp: new Date().toISOString()
      };

      // Emit to all subscribers
      this.subscribers.forEach(callback => {
        callback(data);
      });
    }, 3000); // Every 3 seconds
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    console.log('New subscriber added. Total subscribers:', this.subscribers.length);

    // Return subscription object
    return {
      unsubscribe: () => {
        const index = this.subscribers.indexOf(callback);
        if (index > -1) {
          this.subscribers.splice(index, 1);
          console.log('Subscriber removed. Total subscribers:', this.subscribers.length);
        }
      }
    };
  }
}

// Singleton instance
export const dataService = new DataService();

