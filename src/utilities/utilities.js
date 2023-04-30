//Fucntion to check if password matches repasswords
export const checkPasswordMatch = (password, repassword) => {
  if (password !== repassword) {
    return false;
  } else {
    return true;
  }
};
