const STR_NUMBER = [
  "",
  "Satu",
  "Dua",
  "Tiga",
  "Empat",
  "Lima",
  "Enam",
  "Tujuh",
  "Delapan",
  "Sembilan",
  "Sepuluh",
  "Sebelas",
];

const dotFormat = (amount) => {
  const arrAmount = [amount.toString()];
  const modulo = arrAmount[0].length % 3;
  let rupiah = arrAmount[0].substr(0, modulo);
  const thousand = arrAmount[0].substr(modulo).match(/\d{3}/gi);

  if (thousand) {
    const separator = modulo ? "." : "";
    rupiah += separator + thousand.join(".");
  }

  result = arrAmount[1] !== undefined ? `${rupiah},${arrAmount[1]}` : rupiah;
  return result;
};

const symbolFormat = (amount, useDecimal = false) => {
  if (/[^0-9]/.test(amount)) {
    console.error(
      "Invalid parameter, this function runs with a numeric parameter"
    );
  } else {
    rupiah = dotFormat(amount);
    if (useDecimal) {
      rupiah += ",00";
    }
    result = `Rp${rupiah}`;
    return result;
  }
};

const idrFormat = (amount) => {
  if (/[^0-9]/.test(amount)) {
    console.error(
      "Invalid parameter, this function runs with a numeric parameter"
    );
  } else {
    rupiah = dotFormat(amount);
    result = `${rupiah} IDR`;
    return result;
  }
};

const generateSpelling = (amount) => {
  let spelling = "";
  if (amount === 0) {
    spelling = "Nol";
  } else if (amount < 12) {
    spelling = STR_NUMBER[amount];
  } else if (amount < 20) {
    spelling = `${STR_NUMBER[amount - 10]} Belas`;
  } else if (amount < 100) {
    spelling = `${STR_NUMBER[(amount - (amount % 10)) / 10]} Puluh`;
    const lastNumber = amount % 10;
    if (!!lastNumber) spelling += ` ${STR_NUMBER[lastNumber]}`;
  } else if (amount < 200) {
    spelling = "Seratus";
    const twoLastNumber = amount - 100;
    if (!!twoLastNumber) spelling += ` ${generateSpelling(twoLastNumber)}`;
  } else if (amount < 1000) {
    spelling = `${STR_NUMBER[(amount - (amount % 100)) / 100]} Ratus`;
    const twoLastNumber = amount % 100;
    if (!!twoLastNumber) spelling += ` ${generateSpelling(twoLastNumber)}`;
  } else if (amount < 2000) {
    spelling = "Seribu";
    const threeLastNumber = amount - 1000;
    if (!!threeLastNumber) spelling += ` ${generateSpelling(threeLastNumber)}`;
  } else if (amount < 1000000) {
    spelling = `${generateSpelling((amount - (amount % 1000)) / 1000)} Ribu`;
    const threeLastNumber = amount % 1000;
    if (!!threeLastNumber) spelling += ` ${generateSpelling(threeLastNumber)}`;
  } else if (amount < 1000000000) {
    spelling = `${generateSpelling(
      (amount - (amount % 1000000)) / 1000000
    )} Juta`;
    const threeLastNumber = amount % 1000000;
    if (!!threeLastNumber) spelling += ` ${generateSpelling(threeLastNumber)}`;
  } else if (amount < 1000000000000) {
    spelling = `${generateSpelling(
      (amount - (amount % 1000000000)) / 1000000000
    )} Milyar`;
    const threeLastNumber = amount % 1000000000;
    if (!!threeLastNumber) spelling += ` ${generateSpelling(threeLastNumber)}`;
  } else if (amount < 1000000000000000) {
    spelling = `${generateSpelling(
      (amount - (amount % 1000000000000)) / 1000000000000
    )} Triliun`;
    const threeLastNumber = amount % 1000000000000;
    if (!!threeLastNumber) spelling += ` ${generateSpelling(threeLastNumber)}`;
  }

  return spelling;
};

const spellingFormat = (amount) => {
  let spelling = "";
  const intAmount = parseInt(amount);
  if (
    /[^0-9]/.test(amount) ||
    String(amount).charAt(0) === "0" ||
    intAmount > 999999999999999
  ) {
    console.error(
      "Invalid parameter, this function runs with a numeric parameter (0 - 999999999999999)"
    );
    return;
  } else {
    spelling = generateSpelling(intAmount);
  }

  return `${spelling} Rupiah`;
};
