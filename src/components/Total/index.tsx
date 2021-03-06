import React from "react";

import "./index.css";

type Props = {
  productsInTotalArray: {
    title: string;
    repeatTimes: number;
    quantity: number;
    price: number;
  }[];
  mobile?: boolean;
};

const Total = ({ productsInTotalArray, mobile }: Props): JSX.Element => {
  let finalTotal: number = 0;

  const getTotalPriceOfProduct = (price: number, quantity: number) => {
    return price * quantity;
  };

  const getTotalPriceAfterDiscount = (
    quantity: number,
    price: number,
    repeatTimes: number
  ): JSX.Element => {
    const initTotalPrice = getTotalPriceOfProduct(price, quantity);

    if (repeatTimes === 1) {
      finalTotal += initTotalPrice;

      return <p>Final Price: €{initTotalPrice}</p>;
    } else {
      finalTotal += Number(
        initTotalPrice - (initTotalPrice * repeatTimes) / 10
      );

      return (
        <p>
          Final Price: {initTotalPrice} - {(initTotalPrice * repeatTimes) / 10}{" "}
          = €{(initTotalPrice - (initTotalPrice * repeatTimes) / 10).toFixed(2)}
        </p>
      );
    }
  };

  return (
    <div className="total-container">
      {!mobile && <h3>Total</h3>}
      <div>
        <div data-testid="test-final-product-list">
          {productsInTotalArray.map((item, index) => (
            <div key={item.title + index}>
              <p>
                <strong>{item.title}</strong>
              </p>
              <p>
                Price: €{item.price} x {item.quantity} = €
                {getTotalPriceOfProduct(item.price, item.quantity).toFixed(2)}
              </p>
              {item.repeatTimes > 1 && (
                <p>You have discount: {item.repeatTimes * 10}%</p>
              )}
              {getTotalPriceAfterDiscount(
                item.quantity,
                item.price,
                item.repeatTimes
              )}
            </div>
          ))}
        </div>
        <h2 data-testid="test-final-price">
          Final Total: €{finalTotal.toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default Total;
