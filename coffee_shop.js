// Question 1 - Coffee Order Price Calculator
 
// Computes the final price of an order, applying validation and all discount rules in order.
function calculatePrice(size, quantity, isMember, hour) {
  // Step 1: validate inputs
  if (size !== "small" && size !== "medium" && size !== "large") {
    return "Invalid size";
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return "Invalid quantity";
  }
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    return "Invalid hour";
  }
 
  // Step 2: base price per cup
  let pricePerCup;
  switch (size) {
    case "small":
      pricePerCup = 2.5;
      break;
    case "medium":
      pricePerCup = 3.5;
      break;
    case "large":
      pricePerCup = 4.5;
      break;
  }
  let total = pricePerCup * quantity;
 
  // Step 3: bulk discount (10% off for 5+ cups)
  if (quantity >= 5) {
    total = total * 0.9;
  }
 
  // Step 4: member discount (further 5% off)
  if (isMember === true) {
    total = total * 0.95;
  }
 
  // Step 5: happy hour (15:00 to 17:59) = $1 off
  if (hour >= 15 && hour <= 17) {
    total = total - 1;
  }
 
  // Step 6: never negative
  if (total < 0) {
    return 0;
  }
 
  // Step 7: round to 2 decimals
  return Math.round(total * 100) / 100;
}
 
// Prints the price of 1 to 10 cups for the given size, membership and hour.
function printPriceTable(size, isMember, hour) {
  for (let qty = 1; qty <= 10; qty++) {
    const price = calculatePrice(size, qty, isMember, hour);
    if (typeof price === "number") {
      console.log("Qty " + qty + " -> $" + price.toFixed(2));
    } else {
      console.log("Qty " + qty + " -> " + price);
    }
  }
}
 
// Loops over hours 0-23 and returns the first hour that gives the lowest price.
function cheapestHour(size, quantity, isMember) {
  let bestHour = 0;
  let bestPrice = calculatePrice(size, quantity, isMember, 0);
  if (typeof bestPrice !== "number") {
    return bestPrice; // invalid size or quantity message
  }
  for (let hour = 1; hour <= 23; hour++) {
    const price = calculatePrice(size, quantity, isMember, hour);
    if (price < bestPrice) { // strict < keeps the FIRST lowest hour
      bestPrice = price;
      bestHour = hour;
    }
  }
  return bestHour;
}
 
// Prints the best-deal sentence for an order.
function printBestDeal(size, quantity, isMember) {
  const hour = cheapestHour(size, quantity, isMember);
  if (typeof hour !== "number") {
    console.log(hour);
    return;
  }
  const price = calculatePrice(size, quantity, isMember, hour);
  console.log(
    "The best time to order " + quantity + " " + size + " coffees is at " +
    hour + ":00 for $" + price.toFixed(2) + "."
  );
}
 
// ---------------- Tests ----------------
console.log("--- Part A tests ---");
console.log(calculatePrice("large", 2, false, 10), "(expected 9)");
console.log(calculatePrice("medium", 5, true, 16), "(expected 13.96)");
console.log(calculatePrice("small", 4, true, 9), "(expected 9.5)");
console.log(calculatePrice("small", 1, false, 15), "(expected 1.5)");
console.log(calculatePrice("xl", 1, false, 9), "(expected Invalid size)");
console.log(calculatePrice("large", 0, false, 9), "(expected Invalid quantity)");
console.log(calculatePrice("large", 2.5, true, 9), "(expected Invalid quantity)");
console.log(calculatePrice("medium", 2, true, 25), "(expected Invalid hour)");
// My own tests
console.log(calculatePrice("small", 5, true, 9), "(own test: 12.5*0.9*0.95 = 10.69)");
console.log(calculatePrice("small", 1, true, 17), "(own test: 2.375-1 = 1.38)");
console.log(calculatePrice("large", 1, false, -1), "(own test: expected Invalid hour)");
 
console.log("--- Part B: price table ---");
printPriceTable("medium", false, 16);
 
console.log("--- Part C: best deal ---");
printBestDeal("large", 3, false);
printBestDeal("small", 6, true);
 