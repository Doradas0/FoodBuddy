import {Auth} from "aws-amplify";

export const signIn = async (username, password) => {
  try {
    await Auth.signIn(username, password);
    alert("Logged in");
  }catch (e) {
    alert(e.message);
  }
}
