// Effets bulles et étoiles rebondissantes sur les bords de l'écran
(function () {
  const NB_BUBBLES = 10;
  const NB_STARS = 7;
  const bubbles = [];
  const stars = [];
  const colors = ["#009fe3", "#ffd600", "#e53935", "#43a047", "#7c3fa0"];
  const deco = document.createElement("div");
  deco.style.position = "fixed";
  deco.style.left = "0";
  deco.style.top = "0";
  deco.style.width = "100vw";
  deco.style.height = "100vh";
  deco.style.zIndex = "0";
  deco.style.pointerEvents = "none";
  document.body.appendChild(deco);

  for (let i = 0; i < NB_BUBBLES; i++) {
    const b = document.createElement("div");
    b.className = "bubble-anim";
    b.style.position = "absolute";
    b.style.width = 24 + Math.random() * 32 + "px";
    b.style.height = b.style.width;
    b.style.borderRadius = "50%";
    b.style.background =
      colors[Math.floor(Math.random() * colors.length)] + "33";
    b.style.left = Math.random() * window.innerWidth + "px";
    b.style.top = Math.random() * window.innerHeight + "px";
    b.style.zIndex = "0";
    deco.appendChild(b);
    bubbles.push({
      el: b,
      dx: (Math.random() - 0.5) * 1.2,
      dy: (Math.random() - 0.5) * 1.2,
    });
  }

  for (let i = 0; i < NB_STARS; i++) {
    const s = document.createElement("div");
    s.className = "star-anim";
    s.style.position = "absolute";
    s.style.width = s.style.height = 18 + Math.random() * 18 + "px";
    s.style.left = Math.random() * window.innerWidth + "px";
    s.style.top = Math.random() * window.innerHeight + "px";
    s.style.zIndex = "0";
    s.innerHTML = "★";
    s.style.color = colors[Math.floor(Math.random() * colors.length)];
    s.style.opacity = 0.85;
    s.style.fontSize = "1.2em";
    s.style.textShadow = "0 2px 8px #fff, 0 0 2px #0055b8";
    deco.appendChild(s);
    stars.push({
      el: s,
      dx: (Math.random() - 0.5) * 1.4,
      dy: (Math.random() - 0.5) * 1.4,
    });
  }

  function animate() {
    for (const b of bubbles) {
      let x = parseFloat(b.el.style.left);
      let y = parseFloat(b.el.style.top);
      x += b.dx;
      y += b.dy;
      if (x < 0 || x > window.innerWidth - b.el.offsetWidth) b.dx *= -1;
      if (y < 0 || y > window.innerHeight - b.el.offsetHeight) b.dy *= -1;
      b.el.style.left = x + "px";
      b.el.style.top = y + "px";
    }
    for (const s of stars) {
      let x = parseFloat(s.el.style.left);
      let y = parseFloat(s.el.style.top);
      x += s.dx;
      y += s.dy;
      if (x < 0 || x > window.innerWidth - s.el.offsetWidth) s.dx *= -1;
      if (y < 0 || y > window.innerHeight - s.el.offsetHeight) s.dy *= -1;
      s.el.style.left = x + "px";
      s.el.style.top = y + "px";
      s.el.style.opacity =
        0.7 + 0.3 * Math.abs(Math.sin(Date.now() / 700 + x + y));
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

// Simulateur de revenu mensuel
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
console.log("fdj-effects.js chargé");
