import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const ConversionTypeButton = (props) => {
  const { to, from, toCurrency, fromCurrency, setConversionCurrencies } = props
  const isSelectedConversionType = fromCurrency === from && toCurrency === to;
  const backgroundColor = isSelectedConversionType ? 'lightblue' : null;
  const conditionalButtonStyle = { backgroundColor };

  const fromFlag = from === 'usd' ? '🇺🇸' : '🇻🇳';
  const toFlag = to === 'usd' ? '🇺🇸' : '🇻🇳';

  return (
    <TouchableOpacity
      style={[styles.button, conditionalButtonStyle]}
      onPress={() => setConversionCurrencies(from, to)}
    >
      <Text style={styles.buttonText}>
        {fromFlag} to {toFlag}
      </Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const [fromCurrency, setFromCurrency] = useState('vnd')
  const [toCurrency, setToCurrency] = useState('usd')
  const [currentCurrencyValue, setCurrentCurrencyValue] = useState(0)
  const [convertedCurrencyValue, setConvertedCurrencyValue] = useState(0)
  
  const convertCurrency = () => {
    let value;
    if (fromCurrency === 'vnd') {
      value = currentCurrencyValue / 23000;
    } else {
      value = 23000 * currentCurrencyValue;
    }
    setConvertedCurrencyValue(value)
  };

  useEffect(convertCurrency)

  const setConversionCurrencies = (from, to) => {
    setFromCurrency(from)
    setToCurrency(to)
  };

  const FormattedCurrency = props => {
    const format = props.type === 'usd' ? 'us' : 'vn';
    const currency = props.type === 'usd' ? 'USD' : 'VND';
    const flag = props.type === 'usd' ? '🇺🇸' : '🇻🇳';

    const formatter = new Intl.NumberFormat(format, {
      currency,
      style: 'currency'
    });

    return (
      <Text style={styles.currencyText}>
        {formatter.format(props.value)} {flag}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Please enter the value of the currency you want to convert</Text>
      <TextInput
        autoFocus
        style={styles.textInput}
        keyboardType='number-pad'
        placeholder='100,000,000 VND'
        selectionColor="red"
        onChangeText={setCurrentCurrencyValue}
      />
      <ConversionTypeButton
        to="vnd"
        from="usd"
        toCurrency={toCurrency}
        fromCurrency={fromCurrency}
        setConversionCurrencies={setConversionCurrencies}
      />
      <ConversionTypeButton
        to="usd"
        from="vnd"
        toCurrency={toCurrency}
        fromCurrency={fromCurrency}
        setConversionCurrencies={setConversionCurrencies}
      />
      <Text>
        Current currency:
        </Text>
      <FormattedCurrency
        type={fromCurrency}
        value={currentCurrencyValue}
      />
      <Text>
        Conversion currenecy:
        </Text>
      <FormattedCurrency
        type={toCurrency}
        value={convertedCurrencyValue}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30
  },
  textInput: {
    height: 30,
    width: 250,
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
    textAlign: 'center',
    fontSize: 20
  },
  button: {
    height: 35,
    width: 200,
    margin: 10,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    borderColor: 'lightblue',
    justifyContent: 'center'
  },
  currencyText: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold'
  }
});
