import React, { useEffect, useState, useCallback } from "react";
import classes from "components/Currencies/Currencies.module.css";
import Container from "components/utility/Container";
import CurrencyRow from "components/Currencies/CurrencyRow";
import nextConfig from "next.config";
import { basename } from "path";

const Currencies = () => {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  const url = `${nextConfig.env?.exchangeRateApi}`;

  let toAmount;
  let fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  const fetchCurrencyApi = async () => {
    const response = await fetch("https://api.exchangerate.host/latest");
    const data = await response.json();

    const firstCurrency = Object.keys(data.rates)[0];
    setCurrencyOptions([...Object.keys(data.rates)]);
    setFromCurrency(data.base);
    setToCurrency(firstCurrency);
    setExchangeRate(data.rates[firstCurrency]);
  };

  useEffect(() => {
    fetchCurrencyApi();
  }, []);

  const fetchCurrencyApiAgain = useCallback(async () => {
    const response = await fetch(
      `https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`
    );
    const data = await response.json();
    setExchangeRate(data.rates[toCurrency]);
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetchCurrencyApiAgain();
    }
  }, [fromCurrency, toCurrency, fetchCurrencyApiAgain]);

  const handleFromAmountChange = (e: any) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (e: any) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  return (
    <Container className={classes.currencies__container_main}>
      <div className={classes.main__wrapper}>
        <div className={classes.main}>
          <h1>Currency Converter (FX)</h1>
          <h3>Convert</h3>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e: any) => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />
          <div className={classes.equals}>=</div>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e: any) => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
          />
        </div>
      </div>
    </Container>
  );
};

export default Currencies;
