document.getElementById('exchange-btn').addEventListener('click', () => {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Replace 'YOUR_API_KEY' with your actual API key from ExchangeRate-API
    const apiUrl = `https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${fromCurrency}`;

    // Fetch the exchange rates from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                // Access the rates object from the API response
                const exchangeRates = data.conversion_rates;

                // Calculate the converted amount
                const rateFrom = exchangeRates[fromCurrency];
                const rateTo = exchangeRates[toCurrency];
                const result = (amount / rateFrom) * rateTo;

                // Display the result
                document.getElementById('result').innerText = `${amount} ${fromCurrency} equals ${result.toFixed(2)} ${toCurrency}.`;
            } else {
                throw new Error('Error fetching data.');
            }
        })
        .catch(error => {
            console.error(error);
            document.getElementById('result').innerText = 'Error fetching data. Please try again later.';
        });
});
