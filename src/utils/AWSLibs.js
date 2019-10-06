import {Auth} from "aws-amplify";

export const signIn = async (username, password) => {
  try {
    await Auth.signIn(username, password);
    alert("Logged in");
  }catch (e) {
    alert(e.message);
  }
}

export const signUp = async (username, password) => {
  try {
    await Auth.signUp({
      username,
      password
    });
  }catch (e) {
    alert(e.message);
  }
}

export const confirmSignUp = async (username, code) => {
  try {
    await Auth.confirmSignUp({
      username,
      code
    });
  }catch (e) {
    alert(e.message);
  }
}
