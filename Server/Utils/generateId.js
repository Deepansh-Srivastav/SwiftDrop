
export function generateReadableOrderId() {
    return `ORD-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
};