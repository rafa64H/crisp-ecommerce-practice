import { store } from "../services/redux-toolkit/store";

export default function calculatePriceShoppingBagFromFirestore() {
  const user = store.getState().auth.user;

  if (!user.uid) {
    return;
  }

  const arrayPrices = user.cart.map((item) => item.price * item.quantity);

  const price = arrayPrices.reduce(
    (priceValue, totalPrice) => priceValue + totalPrice,
    0
  );

  return price.toFixed(2);
}
