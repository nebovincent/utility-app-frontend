import React from "react";
import classes from "components/Currencies/CurrencyRow.module.css";
import { Props } from "types/types";

const CurrencyRow = (props: Props) => {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;
  return (
    <div className={classes.main}>
      <input type="number" step="1" value={amount} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyRow;
