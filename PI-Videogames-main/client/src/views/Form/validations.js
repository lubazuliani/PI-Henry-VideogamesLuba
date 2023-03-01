export function validation(form) {
    let errors = {};
    if (!form.name) {
      errors.name = "Name is required";
    } else if (
      !/^[A-Za-z0-9\s]*$/.test(form.name) ||
      typeof form.name !== "string"
    ) {
      errors.name = "Invalid name";
    }
  
    if (!form.description) {
      errors.description = "Description is required";
    }
  
    if (!form.released) {
      errors.released = "Released Date is required";
    } else if (
      !/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(
        form.released
      )
    ) {
      errors.released = "Invalid date format";
    }
  
    if (!form.image) {
      errors.image = "Image URL is required";
    } else if (
      !/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(form.image)
    ) {
      errors.image = "Invalid URL format";
    }
  
    if (!form.rating) {
      errors.rating = "Rating is required";
    } else if (
      form.rating > 5 ||
      form.rating < 0 ||
      /^(?:[1-9]\d{0,4}|0)\.\d$/.test(form.rating)
    ) {
      errors.rating =
        "The rating must be a number not greater than 5 and with at least two decimals";
    }
  
    if (form.genres.length < 1) {
      errors.genres = "You must choose at least one option";
    }
  
    if (form.platforms.length < 1) {
      errors.platforms = "You must choose at least one option";
    }
  
    return errors;
  }