

export default function validateLogin(formData) {
    let errors = {};
    if(!formData.username) {
        errors.username = "You must enter a username!"
    }else if (!(/^[a-z0-9]+$/i.test(formData.username))) {
        errors.username = "Your username cannot contain any special characters or numbers!"
    }

   if(!formData.email) {
       errors.email ="Email address is required!";
   } else if(!/\S+@\S+\.\S/.test(formData.email)) {
       errors.email = "Email address is invalid";
   }
    if (!formData.password || !formData['confirm-password']) {
        errors.password = "Password is required!";
        errors['confirm-password'] = "Password is required!";
    } else if (formData.password !== formData['confirm-password']) {
        errors['diferent-password'] = "You must enter the same password twice!"
    }


    return errors;
}
