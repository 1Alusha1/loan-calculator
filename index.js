const config = {
  sum: {
    value: 0,
    min: 1000,
    max: 50000,
    step: 100,
  },
  period: {
    value: 0,
    min: 7,
    max: 60,
    step: 1,
  },
  percent: 2.2,
};

const loanSum = document.querySelector("#loanSum");
const loanSumSlider = document.querySelector("#loanSumSlider");
const repayment = document.querySelector("#repayment");
const repaymentSlider = document.querySelector("#repaymentSlider");
const getLoanButton = document.querySelector("#getLoan");

function initializeSliders() {
  loanSumSlider.setAttribute("min", config.sum.min);
  loanSumSlider.setAttribute("max", config.sum.max);
  loanSumSlider.setAttribute("step", config.sum.step);
  repaymentSlider.setAttribute("min", config.period.min);
  repaymentSlider.setAttribute("max", config.period.max);
  repaymentSlider.setAttribute("step", config.period.step);
}

initializeSliders();
window.onload = () => updateButtonState();

function updateButtonState() {
  if (config.sum.value > 0 && config.period.value > 0) {
    getLoanButton.removeAttribute("disabled");
  } else {
    getLoanButton.setAttribute("disabled", "false");
  }
}
loanSum.addEventListener("input", (e) => {
  const value = +e.target.value;
  if (config.sum.value !== value) {
    config.sum.value = value;
    loanSumSlider.value = value;
    render(config);
    updateButtonState();
  }
});

loanSumSlider.addEventListener("input", (e) => {
  const value = +e.target.value;
  if (config.sum.value !== value) {
    config.sum.value = value;
    loanSum.value = value;
    render(config);
    updateButtonState();
  }
});

repayment.addEventListener("input", (e) => {
  const value = +e.target.value;
  if (config.period.value !== value) {
    config.period.value = value;
    repaymentSlider.value = value;
    render(config);
    updateButtonState();
  }
});

repaymentSlider.addEventListener("input", (e) => {
  const value = +e.target.value;
  if (config.period.value !== value) {
    config.period.value = value;
    repayment.value = value;
    render(config);
    updateButtonState();
  }
});

function calculate({
  sum: { value: sum },
  period: { value: period },
  percent,
}) {
  if (!sum || !period) {
    return {};
  }
  const dailyAmount = (sum + sum * (percent / 100) * period) / period;
  const fullAmount = dailyAmount * period;

  return {
    dailyRepaymentAmount: Math.round(dailyAmount),
    fullRepaymentAmount: Math.round(fullAmount),
  };
}

function render(config) {
  const result = document.querySelector(".result");
  result.style.display = "none";
  const { dailyRepaymentAmount, fullRepaymentAmount } = calculate(config);
  if (config.sum.value && config.period.value) {
    result.style.display = "block";
    result.innerHTML = `
        <p>Сума кредиту: ${config.sum.value}</p>
        <p>Період погашення: ${config.period.value}</p>
        <p>Сумма щоденного погашення: ${dailyRepaymentAmount}</p>
        <p>Загальна сума погашення: ${fullRepaymentAmount}</p>
      `;
  } else {
    result.innerHTML = "";
    getLoan.removeAttribute("disabled");
  }
}

render(config);
