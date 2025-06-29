const capitalInput = document.getElementById("capital");
const placementSelect = document.getElementById("placement");
const resultDiv = document.getElementById("result");

function formatNumber(n) {
  return n.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

function computeNetMonthly(capital, rate) {
  const brut = (capital * (rate / 100)) / 12;
  const net = brut * 0.7;
  return net;
}

function updateResult() {
  const capital = parseFloat(capitalInput.value);
  const rate = parseFloat(placementSelect.value);

  if (isNaN(capital) || capital < 1000) {
    resultDiv.textContent = "Saisissez un montant valide (≥ 1 000 €).";
    return;
  }
  const netMonthly = computeNetMonthly(capital, rate);
  resultDiv.innerHTML = `Revenu mensuel estimé&nbsp;: <br><span style="font-size:1.5em;font-weight:600">${formatNumber(
    netMonthly
  )}</span><br><span style="font-size:.95em;color:#4662b8">Net, sans toucher au capital</span>`;
}

capitalInput.addEventListener("input", updateResult);
placementSelect.addEventListener("change", updateResult);

updateResult();
