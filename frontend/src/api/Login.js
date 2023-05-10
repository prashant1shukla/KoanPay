import axios from "./axios";

export const login = async (email, password) => {
  const res = await axios.post("/login-user", {
    email: email,
    password: password,
  });
  return res.data;
};
