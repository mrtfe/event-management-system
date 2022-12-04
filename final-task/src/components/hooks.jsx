import { useEffect, useState } from "react";

export const useAdmins = () => {
  const [admins, setAdmins] = useState();

  useEffect(() => {
    fetch("/api/admins")
      .then((res) => res.json())
      .then((data) => setAdmins(data))
      .catch(function (error) {
        console.log(
          "error occured while fetching registered ussers: " + error.name
        );
      });
  }, []);
  return admins;
};
