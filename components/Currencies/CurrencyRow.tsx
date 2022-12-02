import React from "react";
import classes from "components/Currencies/CurrencyRow.module.css";
import { Props } from "types/types";
import { server } from "config/index";

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
      <input
        type="number"
        step="1"
        value={amount}
        onChange={onChangeAmount}
        onWheel={(event) => event.currentTarget.blur()}
      />
      <select
        value={selectedCurrency}
        onChange={onChangeCurrency}
        style={{ color: "black !important" }}
      >
        {currencyOptions?.map((option) => (
          <option
            key={option}
            value={option}
            style={{ color: "black !important" }}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyRow;
