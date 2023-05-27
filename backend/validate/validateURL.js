const REGEX_URL = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;

function validateUrl(url) {
  if (REGEX_URL.test(url)) {
    return url;
  }
  throw new Error('Ссылка введена неверно');
}

module.exports = {
  REGEX_URL,
  validateUrl,
};
