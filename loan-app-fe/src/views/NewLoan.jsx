import React, { useEffect, useState } from "react";
import NewLoanForm from "../components/NewLoanForm";
import SignupDetail from "../components/SignupDetail";
import { NewLoanProvider } from "../layout/NewLoanProvider";

const NewLoan = () => {
  const [isDeclare, setIsDeclare] = useState(0);

  useEffect(() => {
    const isDelcareStored = localStorage.getItem("isDeclared");
    setIsDeclare(parseInt(isDelcareStored, 10));
  }, []);

  return (
    <div
      style={{
        height: "auto",
        background:
          "linear-gradient(90deg, rgba(55,59,68,1) 0%, rgba(66,134,244,1) 100%)",
      }}
    >
      {isDeclare === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="h1">
            Bạn phải khai báo thông tin trước khi vay tiền
          </div>
          <div className="w-100">
            <SignupDetail onSuccess={() => setIsDeclare(1)} />
          </div>
        </div>
      ) : (
        <NewLoanProvider>
          <NewLoanForm />
        </NewLoanProvider>
      )}
    </div>
  );
};

export default NewLoan;
