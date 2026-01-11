export const getCookieToken = () => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("guestToken="))
    ?.split("=")[1];
};


export const setCookieToken = (token) => {
  document.cookie = `guestToken=${token}; path=/; secure; SameSite=Lax`;
};

export const removeCookieToken = () => {
  document.cookie = "guestToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
