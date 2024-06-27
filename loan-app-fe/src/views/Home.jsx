import React, { useEffect } from "react";
import UserHome from "../components/UserHome";
import { ModalProvider } from "../layout/ModalProvider";

const Home = () => {
  useEffect(() => {
    document.title = "Danh sách hợp đồng";
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: "1900px",
        background:
          "linear-gradient(90deg, rgba(55,59,68,1) 0%, rgba(66,134,244,1) 100%)",
      }}
    >
      <div
        className="h1"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Danh sách hợp đồng
      </div>
      <ModalProvider>
        <UserHome />
      </ModalProvider>
    </div>
  );
};

export default Home;
