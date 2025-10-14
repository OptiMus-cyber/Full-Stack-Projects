let Validator = {}

Validator.validateName = (name) => {
  let reg1 = /^[A-Za-z]+$/;
  let reg2 = /^[A-Za-z]{4,}$/
  if(!reg1.test(name)){
      let error = new Error("Name cannot have special characters");
      error.status = 406;
      throw error;
  } else {
    if(!reg2.test(name)){
      let error = new Error("Name should be of min 4 character length");
      error.status = 406;
      throw error;
    }
  }
}

Validator.validatePromotionDate = (sDate, eDate) => {
    if(new Date(sDate)<new Date())
    {
        let error = new Error("Promotion Date should be greater than or equal to current date");
        error.status = 406;
        throw error;
    }

    if(new Date(eDate)<=new Date(sDate))
    {
        let error = new Error("Promotion End Date should be greater than Start Date");
        error.status = 406;
        throw error;
    }
}

Validator.validateEmail = function (email) {
    const regexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexp.test(email)) {
        let err = new Error("Invalid Email Format!!");
        err.status = 400;
        throw err;
    }
}

Validator.validatePassword = function (password) {
    const regexp = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!#%*?&]{8,}$/;
    if (!regexp.test(password)) {
        let err = new Error("Invalid Password Format!!");
        err.status = 400;
        throw err;
    }
}

/* export validator */
module.exports = Validator;