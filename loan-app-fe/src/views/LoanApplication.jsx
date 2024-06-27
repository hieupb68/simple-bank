import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayData from "../components/LoanApplicationDetail";

const LoanApplication = () => {
  const { id } = useParams();
  const [la, setLa] = useState(null);

  useEffect(() => {
    const fetchLoan = async (loanId) => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/loanApplications/" + loanId,
          requestOptions
        );
        const result = await response.json();
        setLa(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLoan(id);
  }, [id]);

  return (
    <div
      style={{
        height: "auto",
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
        Chi tiết hợp đồng
      </div>
      {la && (
        <>
          <div className="m-2">
            <a className="btn btn-danger" href={`/interest/${la.id}`}>
              Tính lãi suất
            </a>
            <br />
          </div>
          <DisplayData data={la} />
        </>
      )}
    </div>
  );
};

export default LoanApplication;
