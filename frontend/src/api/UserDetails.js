import axios from "./axios";

export const userdetails = async () => {
  const userdetails = await axios.get("/userData", {
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token"),
    },
  });
  console.log("The user Details are : ",userdetails.data.data);
  return userdetails.data.data;
};
