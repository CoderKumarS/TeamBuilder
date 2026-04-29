class PubSubBroker {
  constructor() {
    this.topics = {}; 
  }

  subscribe(topic, callback) { 
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(callback);

    return () => this.unsubscribe(topic, callback);
  }

  publish(topic, data) {
    if (!this.topics[topic]) return;
    [...this.topics[topic]].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in subscriber for ${topic}:`, error);
      }
    });
  }
  unsubscribe(topic, callback) {
    if (!this.topics[topic]) return;

    this.topics[topic] = this.topics[topic].filter(cb => cb !== callback);
  }
}

// --- Usage ---
const broker = new PubSubBroker();

const onOrder = (data) => console.log(`[Email Service] Receipt sent for order #${data.id}`);
const onOrderLog = (data) => console.log(`[Logging Service] Order #${data.id} recorded`);

// Subscribing
const removeEmailSub = broker.subscribe('ORDER_PLACED', onOrder);
const removeOrderLogSub = broker.subscribe('ORDER_PLACED', onOrderLog);

// Publishing
broker.publish('ORDER_PLACED', { id: 5001, total: 99.99 });
broker.publish('ORDER_PLACED', { id: 5001, total: 99.99 });

// Unsubscribing
removeEmailSub(); 
broker.publish('ORDER_PLACED', { id: 5001, total: 99.99 });
broker.publish('ORDER_PLACED', { id: 5001, total: 99.99 });

removeOrderLogSub();