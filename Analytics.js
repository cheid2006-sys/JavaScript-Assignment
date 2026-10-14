// Question 2 - Coffee Shop Order Analytics
 
const orders = [
  { id: 1, customer: "Rami", items: ["latte", "croissant"], total: 7.5 },
  { id: 2, customer: "Lea", items: ["espresso"], total: 3.0 },
  { id: 3, customer: "Rami", items: ["latte", "muffin"], total: 8.0 },
  { id: 4, customer: "Karim", items: ["mocha", "croissant"], total: 9.0 },
  { id: 5, customer: "Lea", items: ["latte"], total: 4.5 },
  { id: 6, customer: "Nour", items: ["espresso", "latte", "muffin"], total: 10.5 },
];
const mondayCustomers = ["Rami", "Lea", "Karim", "Nour"];
const tuesdayCustomers = ["Lea", "Nour", "Tony", "Rami", "Lea"];
 
// ---------- Part A: arrays and array methods ----------
 
// Returns the sum of all order totals.
function getTotalRevenue(orders) {
  return orders.reduce((sum, order) => sum + order.total, 0);
}
 
// Returns the orders whose total is greater than or equal to min.
function getBigOrders(orders, min) {
  return orders.filter((order) => order.total >= min);
}
 
// Returns an array of readable summary strings, one per order.
function getOrderSummaries(orders) {
  return orders.map(
    (order) =>
      "#" + order.id + " " + order.customer + " - " +
      order.items.length + " item(s) - $" + order.total.toFixed(2)
  );
}
 
// Returns a NEW array sorted from highest total to lowest (original is untouched).
function getSortedByTotal(orders) {
  return [...orders].sort((a, b) => b.total - a.total);
}
 
// Returns the ids of all orders that contain the given item.
function findOrdersByItem(orders, item) {
  return orders.filter((order) => order.items.includes(item)).map((order) => order.id);
}
 
// ---------- Part B: objects as counters ----------
 
// Returns an object counting how many times each item was ordered.
function countItems(orders) {
  const counts = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
    });
  });
  return counts;
}
 
// Returns the most ordered item (uses countItems).
function getMostPopularItem(orders) {
  const counts = countItems(orders);
  let bestItem = null;
  let bestCount = 0;
  for (const item in counts) {
    if (counts[item] > bestCount) {
      bestCount = counts[item];
      bestItem = item;
    }
  }
  return bestItem;
}
 
// Returns an object with the total amount spent by each customer.
function getSpendingPerCustomer(orders) {
  const spending = {};
  orders.forEach((order) => {
    spending[order.customer] = (spending[order.customer] || 0) + order.total;
  });
  return spending;
}
 
// ---------- Part C: Set ----------
 
// Returns an array of unique customer names.
function getUniqueCustomers(orders) {
  return [...new Set(orders.map((order) => order.customer))];
}
 
// Returns an array of every distinct item ordered.
function getAllItems(orders) {
  return [...new Set(orders.flatMap((order) => order.items))];
}
 
// Returns customers present in both sets (intersection).
function bothDays(setA, setB) {
  return [...setA].filter((name) => setB.has(name));
}
 
// Returns customers present only in the first set (difference).
function onlyFirstDay(setA, setB) {
  return [...setA].filter((name) => !setB.has(name));
}
 
// Returns everyone present in either set (union).
function allCustomers(setA, setB) {
  return [...new Set([...setA, ...setB])];
}
 
const mondaySet = new Set(mondayCustomers);
const tuesdaySet = new Set(tuesdayCustomers);
 
// ---------- Calls and output ----------
console.log("Total revenue:", getTotalRevenue(orders));
console.log("Big orders (>= 8):", getBigOrders(orders, 8));
console.log("Big order ids (>= 8):", getBigOrders(orders, 8).map((o) => o.id));
console.log("Order summaries:", getOrderSummaries(orders));
console.log("Sorted by total (high to low):", getSortedByTotal(orders).map((o) => o.id));
console.log("Original order ids still:", orders.map((o) => o.id));
console.log("Orders with muffin:", findOrdersByItem(orders, "muffin"));
console.log("Orders with mocha (own test):", findOrdersByItem(orders, "mocha"));
console.log("Item counts:", countItems(orders));
console.log("Most popular item:", getMostPopularItem(orders));
console.log("Spending per customer:", getSpendingPerCustomer(orders));
console.log("Unique customers:", getUniqueCustomers(orders));
console.log("All items:", getAllItems(orders));
console.log("Came both days:", bothDays(mondaySet, tuesdaySet));
console.log("Only Monday:", onlyFirstDay(mondaySet, tuesdaySet));
console.log("Only Tuesday (own test):", onlyFirstDay(tuesdaySet, mondaySet));
console.log("All customers:", allCustomers(mondaySet, tuesdaySet));
console.log("Distinct Tuesday customers:", tuesdaySet.size);
// It is 4 and not 5 because the array has 5 names but "Lea" appears twice,
// and a Set keeps each value only once, so the duplicate "Lea" is dropped.
 