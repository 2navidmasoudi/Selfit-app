const latinToPersianMap = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];
const latinNumbers = [/1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g, /0/g];
const persianToLatinMap = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const persianNumbers = [/۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g, /۰/g];

function prepareNumber(input) {
  let string;
  if (typeof input === 'number') {
    string = input.toString();
  } else if (typeof input === 'undefined') {
    string = '-';
  } else {
    string = input;
  }

  return string;
}

function latinToPersian(string) {
  let result = string;

  for (let index = 0; index < 10; index++) {
    result = result.replace(latinNumbers[index], latinToPersianMap[index]);
  }

  return result;
}

function persianToLatin(string) {
  let result = string;

  for (let index = 0; index < 10; index++) {
    result = result.replace(persianNumbers[index], persianToLatinMap[index]);
  }

  return result;
}

export function persianNumber(input) {
  return latinToPersian(prepareNumber(input));
}

export function latinNumber(input) {
  return persianToLatin(prepareNumber(input));
}

export function isRTL(s) {
  const ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
  const rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
  const rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');

  return rtlDirCheck.test(s);
}
