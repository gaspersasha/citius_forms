(function () {
  const stateBC = {
    userDetails: {
      firstName: {
        type: 'text',
        value: '',
        status: false,
        isRequired: true,
      },
      lastName: {
        type: 'text',
        value: '',
        status: false,
        isRequired: true,
      },
      email: {
        type: 'email',
        value: '',
        status: false,
        isRequired: true,
      },
      phone: {
        type: 'text',
        value: '',
        status: false,
        isRequired: false,
      },
      dateOfPurchase: {
        type: 'date',
        value: '',
        status: true,
        isRequired: false,
      },
      make: {
        type: 'text',
        value: '',
        status: true,
        isRequired: false,
      },
      model: {
        type: 'text',
        value: '',
        status: true,
        isRequired: false,
      },
    },
    unsubscribe: false,
  };

  const generateListBC = () => {
    const form = document.getElementById('bcFormBC');
    const firstName = document.getElementById('firstNameBC');
    const lastName = document.getElementById('lastNameBC');
    const email = document.getElementById('emailBC');
    const phone = document.getElementById('phoneBC');
    const dateOfPurchase = document.getElementById('dateOfPurchaseBC');
    const make = document.getElementById('makeBC');
    const model = document.getElementById('modelBC');
    const submitButton = document.getElementById('submitButtonBC');
    const checkbox = document.getElementById('checkboxBC');
    const switchButton = document.getElementById('bd-swith-popup');

    const elemNodeList = {
      firstName,
      lastName,
      email,
      phone,
      dateOfPurchase,
      make,
      model,
    };

    const { userDetails } = stateBC;

    const isInvalid = (elem, status, required) => {
      const targetElement = elem.name ? elem : elem.target;
      return !status && required
        ? targetElement.classList.add('invalid')
        : !status ? targetElement.classList.add('invalid')
          : targetElement.classList.remove('invalid');
    };

    const setState = (item, elem, value, status) => {
      const targetElement = item[elem.name ? elem.name : elem.target.name];
      const { isRequired } = targetElement;

      targetElement.value = value;
      targetElement.status = status;

      isInvalid(elem, status, isRequired);
    };

    const checkPhoneNumber = target => {
      const { currentTarget } = target;
      const { value } = currentTarget;
      const re = new RegExp('^(?:(?:\\(?(?:0(?:0|11)\\)?[\\s-]?\\(?|\\+)44\\)?[\\s-]?(?:\\(?0\\)?[\\s-]?)?)|(?:\\(?0))(?:(?:\\d{5}\\)?[\\s-]?\\d{4,5})|(?:\\d{4}\\)?[\\s-]?(?:\\d{5}|\\d{3}[\\s-]?\\d{3}))|(?:\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{3,4})|(?:\\d{2}\\)?[\\s-]?\\d{4}[\\s-]?\\d{4}))(?:[\\s-]?(?:x|ext\\.?|#)\\d{3,4})?\\s*$');
      if (re.test(value)) {
        setState(userDetails, currentTarget, value, true);
      } else {
        setState(userDetails, currentTarget, value, false);
      }
    };

    const handleTextInput = target => {
      const { currentTarget } = target;
      const { value } = currentTarget;

      const re = /^[a-zA-Z]+(-[a-zA-Z]+)*$/;

      if (re.test(value)) {
        setState(userDetails, currentTarget, value, true);
      } else {
        setState(userDetails, target, value, false);
      }
    };

    const handleModelInput = target => {
      const { currentTarget } = target;
      const { value } = currentTarget;

      const re = /^\w+$/;

      if (re.test(value)) {
        setState(userDetails, currentTarget, value, true);
      } else {
        setState(userDetails, target, value, false);
      }
    };

    const handleEmail = ({ target: { value } }) => {
      const retest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (retest.test(value)) {
        setState(userDetails, email, value, true);
      } else {
        setState(userDetails, email, value, false);
      }
    };

    const handleDateToPurchase = ({ target: { value } }) => {
      const re = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

      const today = new Date();
      const formattedToday = today.getFullYear() + '-' + (today.getMonth() + 1).toLocaleString().padStart(2, '0') + '-' + today.getDate();

      if (re.test(value) && new Date(value).getTime() >= new Date(formattedToday).getTime()) {
        const transValue = value.replace(/\-/g, '/');

        setState(userDetails, dateOfPurchase, transValue, true);
      } else {
        setState(userDetails, dateOfPurchase, value, false);
      }
    };

    firstName.oninput = handleTextInput;
    lastName.oninput = handleTextInput;
    make.oninput = handleTextInput;
    model.oninput = handleModelInput;
    email.onchange = handleEmail;
    phone.oninput = checkPhoneNumber;
    dateOfPurchase.onchange = handleDateToPurchase;

    const handleSubmit = e => {
      e.preventDefault();
      const { userDetails, unsubscribe } = stateBC;

      const requiredFields = Object.keys(userDetails).filter(
        el => userDetails[el] && userDetails[el].isRequired
      );

      Object.keys(requiredFields).map(el => {
        const field = userDetails[requiredFields[el]];
        if (!field.value) {
          field.status = false;
          return isInvalid(
            elemNodeList[requiredFields[el]],
            field.status,
            field.isRequired
          );
        }
      });

      const {
        firstName,
        lastName,
        email,
        phone,
        dateOfPurchase,
        make,
        model,
      } = userDetails;

      const dataPool = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        dateOfPurchase: dateOfPurchase.value,
        make: make.value,
        model: model.value,
        unsubscribe,
        campaignName: "Blueconic - exit survey"
      };

      if (!firstName.status || !lastName.status || !email.status) {
        submitButton.removeAttribute('disabled');
        submitButton.innerHTML = "Submit";
        return;
      }

      submitButton.setAttribute('disabled', true);
      submitButton.innerHTML = "Loading...";

      const url = 'https://www.secret.co.uk/createNewLead.json';

      fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPool),
      })
        .then((response) => {
          console.warn('response8', response)
          submitButton.innerHTML = "Done";
          switchButton.click();
        })
        .catch(err => console.warn(`sbcething wrong: ${err}, ${err?.response?.data}`));
    };

    form.onsubmit = handleSubmit;

    const handleUnsubscribe = () =>
      (stateBC.unsubscribe = !stateBC.unsubscribe);

    checkbox.onclick = handleUnsubscribe;
  }
  generateListBC();
})();
