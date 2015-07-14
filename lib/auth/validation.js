// User Validation for signup form.

module.exports = function (userData, callback) {
  var error = [];
  var illegalChars = /\W/;

  if (userData.preaccount) {
    // - EMAIL -
    if (!userData.email.match(/@/)) {
      error.push('Invalid email address');
    }
  }
  else {

    // - USERNAME -
    if (userData.username == undefined || userData.username == '') {
      error.push('Username was not provided.');
    }
    // Verify User Length
    if (userData.username.length < 5 || userData.username.length > 25) {
      error.push('Username must be between 5-25 characters.');
    }
    // Verify allowed character
    if (illegalChars.test(userData.username)) {
      error.push('Username contains illegal characters.');
    }


    // - PASSWORD -
    if (userData.password.length < 8 || userData.password.length > 40) {
      error.push('Password must be between 8-40 characters.');
    }

    if (!userData.password.match(/[A-Z]/)) {
      error.push('Password must contain at least 1 capital letter.');
    }
    
    if (!userData.password.match(/[a-z]/)) {
      error.push('Password must contain at least 1 lowercase letter.');
    }

    if (!userData.password.match(/[0-9]/)) {
      error.push('Password must contain at least 1 number.');
    }

    // - EMAIL -
    if (!userData.email.match(/@/)) {
      error.push('Invalid email address');
    }

    // - NAME -
    if (!userData.name == undefined || userData.name == '') {
      error.push('Name not provided.');
    }
  }
  
  if (error.length > 0) {
    callback(error, userData);
  }
  else {
    callback(null, userData);
  }
};
