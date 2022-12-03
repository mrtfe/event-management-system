import { useEffect, useState } from "react";

export const useAdmins = () => {
  const [admins, setAdmins] = useState();

  useEffect(() => {
    fetch("/api/admins")
      .then((res) => res.json())
      .then((data) => setAdmins(data));
  }, []);
  return admins;
};
