import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NewLoanForm.css";
import "react-datepicker/dist/react-datepicker.css";
import RequiredSharp from "./RequiredSharp";
import ContactInfoForm from "./ContactInfoForm";
import LoanInfoForm from "./LoanInfoForm";
import CapitalUsageForm from "./CapitalUsageForm";
import PersonalInfoForm from "./PersonalInfoForm";
import { useNewLoan } from "../layout/NewLoanProvider";

const NewLoanForm = () => {
  const { newLoan, setNewLoan, hanldValidateMessage } = useNewLoan();

  useEffect(() => {
    const fetchAccountInfo = async (userId) => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/accountInfos/user/" + userId,
          requestOptions
        );
        const result = await response.json();
        setNewLoan((prev) => ({ ...prev, accountInfo: result }));
      } catch (error) {
        console.error(error);
      }
    };

    const userId = localStorage.getItem("id");
    fetchAccountInfo(userId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: 0,
      accountInfo: newLoan.accountInfo,
      personalInfo: newLoan.personalInfo,
      contactInfo1: newLoan.contactInfo1,
      contactInfo2: newLoan.contactInfo2,
      loanInfo: newLoan.loanInfo,
      capitalUsage: newLoan.capitalUsage,
      loanInsurance: newLoan.loanInsurance,
      referenceNumber: "AAAAA",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/loanApplications",
        requestOptions
      );
      if (response.ok) {
        // const result = await response.json();
        alert("Gửi đơn thành công. Đợi nhân viên duyệt đơn!");
        setTimeout(() => {
          window.location.href = "/home";
        }, 2000);
      } else {
        const error = await response.json();
        const errorMessage = `Something wrong with: ${error.message}`;

        const [errorType, errorField] = error.message.split(" ");
        if (errorType === "DUPLICATE") {
          if (errorField === "idNumber") {
            hanldValidateMessage(
              "personalInfo",
              "idNumber",
              "CCCD đã tồn tại, vui lòng thử số khác!"
            );
          } else {
            alert("Tài khoản đang vay hợp đồng khác!");
            window.location.href = "/home";
          }
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-3">
      <div className="container mt-7">
        <div className="row justify-content-center">
          <div className="col-sm-8 col-lg-6">
            <div className="card">
              <div className="card-body">
                <h1
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Đăng ký vay vốn
                </h1>
                <form className="needs-validation" onSubmit={handleSubmit}>
                  <div className="border border-black rounded p-3 mt-3">
                    <h3>Thông tin cá nhân</h3>
                    <PersonalInfoForm />
                    <div className="form-group mb-3 col-sm-8 col-lg-6">
                      <label htmlFor="inputAccountNumber">
                        <RequiredSharp />
                        STK:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAccountNumber"
                        placeholder="Số tài khoản"
                        value={newLoan.accountInfo.accountNumber || ""}
                        disabled
                      />
                    </div>
                    <div className="form-group mb-3 col-sm-8 col-lg-6">
                      <label htmlFor="inputCCCD">
                        <RequiredSharp />
                        CMND/CCCD:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputCCCD"
                        placeholder="CMND/CCCD"
                        value={newLoan.accountInfo.legal || ""}
                        disabled
                      />
                    </div>
                    <div className="form-group mb-3 col-sm-8 col-lg-6">
                      <label htmlFor="inputAddress">
                        <RequiredSharp />
                        Địa chỉ:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="Địa chỉ"
                        value={newLoan.accountInfo.address || ""}
                        disabled
                      />
                    </div>
                    <div className="form-group mb-3 col-sm-8 col-lg-6">
                      <label htmlFor="inputEmail4">
                        <RequiredSharp />
                        Email:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Email"
                        value={newLoan.accountInfo.emailAddress || ""}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="border border-black rounded p-3 mt-3">
                    <h3>Thông tin hợp đồng</h3>
                    <LoanInfoForm />
                  </div>
                  <div className="rounded border border-black p-3 mt-3">
                    <h3>Thông tin người thân 1</h3>
                    <ContactInfoForm number="1" />
                    <h3>Thông tin người thân 2</h3>
                    <ContactInfoForm number="2" />
                  </div>
                  <div className="border border-black rounded p-3 mt-3">
                    <h3>Phương án sử dụng vốn</h3>
                    <CapitalUsageForm />
                  </div>
                  <div className="border border-black rounded p-3 mt-3">
                    <h3>Bảo hiểm hợp đồng</h3>
                    <div className="form-group mb-3 col-sm-8 col-lg-6">
                      <label htmlFor="a">
                        <RequiredSharp />
                        Tiền bảo hiểm:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="a"
                        placeholder="Tiền bảo hiểm"
                        value={newLoan.loanInsurance.insuranceAmount}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gridCheck"
                        required
                      />
                      <label className="form-check-label" htmlFor="gridCheck">
                        <RequiredSharp />
                        Tôi đã đọc và đồng ý với điều khoản
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary float-end">
                    Nộp đơn
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLoanForm;
