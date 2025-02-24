async function convertCurrency() {
  const baseCurrency = document.getElementById('baseCurrency').value.toUpperCase();
  const targetCurrency = document.getElementById('targetCurrency').value.toUpperCase();
  const amount = parseFloat(document.getElementById('amount').value);
  const resultDiv = document.getElementById('result');
  const conversionResultElement = document.getElementById('conversionResult');

  // Basic validation
  if (!baseCurrency || !targetCurrency || isNaN(amount) || amount <= 0) {
    alert('Please enter valid data.');
    return;
  }

  try {
    // Fetch data from your API
    const response = await fetch(`https://api.budjet.in/fiat/${baseCurrency}/${targetCurrency}/${amount}`);
    const data = await response.json();

    if (data.result === 'success') {
      // Show the result only
      const { base_code, target_code, conversion_result } = data;
      conversionResultElement.innerText = `${amount} ${base_code} = ${conversion_result.toFixed(2)} ${target_code}`;
      
      // Show result smoothly
      resultDiv.classList.add('show');
    } else {
      alert('Error fetching data');
    }
  } catch (error) {
    alert('Failed to fetch data. Please try again later.');
    console.error(error);
  }
}
