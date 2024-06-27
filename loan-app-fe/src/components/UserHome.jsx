import React, { useEffect, useState } from "react";
import LoanApplicationTable from "./LoanApplicationTable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useModalContext } from "../layout/ModalProvider";
import Disbursement from "./Disbursement";

const UserHome = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const rolesString = localStorage.getItem("roles");
  const roles = rolesString ? rolesString.split(",") : [];
  const isStaff = roles.includes("ROLE_STAFF");

  const userId = localStorage.getItem("id");

  const { toggle, isShowing, payload, asynClose } = useModalContext();

  useEffect(() => {
    const fetchLoanApplications = async (userId) => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/loanApplications/user/" + userId,
          requestOptions
        );
        const result = await response.json();
        setLoanApplications(result);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLoanApplicationsForAdmin = async () => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/loanApplications",
          requestOptions
        );
        const result = await response.json();
        setLoanApplications(result);
      } catch (error) {
        console.error(error);
      }
    };

    if (isStaff) {
      fetchLoanApplicationsForAdmin();
    } else {
      fetchLoanApplications(userId);
    }
  }, [userId]);

  return (
    <div className="p-3 mt-3">
      <LoanApplicationTable dataArray={loanApplications} />
      <div>
        <Modal
          show={isShowing}
          onHide={toggle}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận giải ngân</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="w-100">
              <Disbursement loan={payload?.loan} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggle}>
              Hủy bỏ
            </Button>
            <Button variant="success" onClick={asynClose}>
              Gửi
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default UserHome;
