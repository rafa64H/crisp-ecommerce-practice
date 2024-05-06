export default function calculatePriceShoppingBagFromFirestore(
  arrayItemsShoppingBagFirestore
) {
  const arrayPrices = arrayItemsShoppingBagFirestore.map(
    (item) => item.price * item.quantity
  );

  const price = arrayPrices.reduce(
    (priceValue, totalPrice) => priceValue + totalPrice,
    0
  );

  return price.toFixed(2);
}
