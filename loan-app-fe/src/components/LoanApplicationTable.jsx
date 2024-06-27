import React, { useEffect, useRef } from "react";
import "./style/loanTable.css";
import { formatCurrency } from "../utils/fomat";
import { useModalContext } from "../layout/ModalProvider";

const keyMoneyFomat = [
  "loanAmount",
  "currentEearning",
  "totalCapital",
  "insuranceAmount",
];

const LoanApplicationTable = ({ dataArray }) => {
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const rolesString = localStorage.getItem("roles");

  const roles = rolesString ? rolesString.split(",") : [];

  const isStaff = roles.includes("ROLE_STAFF");

  const { open } = useModalContext();

  const handleApprove = async (id) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn duyệt hợp đồng này?"
    );

    if (!isConfirmed) return;

    const requestOptions = {
      method: "PUT",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/loanApplications/" + id + "/approve",
        requestOptions
      );
      const result = await response.text();

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInject = async (id) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn từ chối hợp đồng này?"
    );

    if (!isConfirmed) return;

    const requestOptions = {
      method: "PUT",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/loanApplications/" + id + "/deny",
        requestOptions
      );
      const result = await response.text();

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const modalElement = modalRef.current;
    const inputElement = inputRef.current;

    if (modalElement && inputElement) {
      const focusInput = () => {
        inputElement.focus();
      };

      modalElement.addEventListener("shown.bs.modal", focusInput);

      return () => {
        // Cleanup: Remove event listener on unmount
        modalElement.removeEventListener("shown.bs.modal", focusInput);
      };
    }
  }, []);

  return (
    <div>
      <table className="table table-bordered text-center table-striped">
        <thead>
          <tr>
            <th>
              <p style={{ width: "30px" }}>STT</p>
            </th>
            {/* <th>STK</th>
            <th>CCCD</th> */}
            <th>
              <p style={{ width: "80px" }}>Email</p>
            </th>
            <th>
              <p style={{ width: "80px" }}>Điện thoại đăng ký</p>
            </th>
            {/* <th>Branch Name</th>
            <th>Branch Address</th> */}
            <th>
              <p style={{ width: "80px" }}>Họ</p>
            </th>
            <th>
              <p style={{ width: "50px" }}>Tên</p>
            </th>
            {/* <th>Date of Birth</th> */}
            <th>
              <p style={{ width: "60px" }}>Giới tính</p>
            </th>
            {/* <th>ID Number</th> */}
            <th>
              <p style={{ width: "80px" }}>Điện thoại liên lạc</p>
            </th>
            {/* <th>Email</th> */}
            <th>
              <p style={{ width: "80px" }}>Địa chỉ thường chú</p>
            </th>
            {/* <th>Contact 1 Full Name</th>
            <th>Contact 1 Relationship</th>
            <th>Contact 1 Phone Number</th>
            <th>Contact 2 Full Name</th>
            <th>Contact 2 Relationship</th>
            <th>Contact 2 Phone Number</th> */}
            <th>
              <p style={{ width: "80px" }}>Tiền vay</p>
            </th>
            <th>
              <p style={{ width: "50px" }}>Thời hạn</p>
            </th>
            {/* <th>Current Earning</th> */}
            <th>
              <p style={{ width: "80px" }}>Lãi xuất</p>
            </th>
            <th>
              <p style={{ width: "80px" }}>Biên độ lãi xuất</p>
            </th>
            {/* <th>Total Capital</th>
            <th>Purpose</th>
            <th>Source</th> */}
            <th>
              <p style={{ width: "80px" }}>Tiền bảo hiểm</p>
            </th>
            <th>
              <p style={{ width: "80px" }}>Trạng thái</p>
            </th>
            {/* <th>Reference Number</th> */}
            {isStaff && (
              <th>
                <p style={{ width: "auto" }}>Duyệt</p>
              </th>
            )}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((data, index) => (
            <tr key={index}>
              <td>{index}</td>
              {/* <td>{data.accountInfo.accountNumber}</td>
              <td>{data.accountInfo.legal}</td> */}
              <td>{data.accountInfo.emailAddress}</td>
              <td>{data.accountInfo.phoneNumber}</td>
              {/* <td>{data.accountInfo.branchInfo.branchName}</td>
              <td>{data.accountInfo.branchInfo.address}</td> */}
              <td>{data.personalInfo.firstName}</td>
              <td>{data.personalInfo.lastName}</td>
              {/* <td>{data.personalInfo.dob}</td> */}
              <td>{data.personalInfo.gender === "MALE" ? "Nam" : "Nữ"}</td>
              {/* <td>{data.personalInfo.idNumber}</td> */}
              <td>{data.personalInfo.phone}</td>
              {/* <td>{data.personalInfo.email}</td> */}
              <td>{data.personalInfo.address}</td>
              {/* <td>{data.contactInfo1.fullName}</td>
              <td>{data.contactInfo1.relationship}</td>
              <td>{data.contactInfo1.phoneNumber}</td>
              <td>{data.contactInfo2.fullName}</td>
              <td>{data.contactInfo2.relationship}</td>
              <td>{data.contactInfo2.phoneNumber}</td> */}
              <td className="text-end">
                {formatCurrency(data.loanInfo.loanAmount)}
              </td>
              <td>{data.loanInfo.loanTerm}</td>
              {/* <td>{data.loanInfo.currentEearning}</td> */}
              <td>{data.loanInfo.loanInterestRate}%</td>
              <td>{data.loanInfo.interestRateMargin}%</td>
              {/* <td>{data.capitalUsage.totalCapital}</td> */}
              {/* <td>{data.capitalUsage.purpose}</td> */}
              {/* <td>{data.capitalUsage.source}</td> */}
              <td className="text-end">
                {formatCurrency(data.loanInsurance.insuranceAmount)}
              </td>

              {data.status === "APPROVED" ? (
                <td className="text-success">Đã duyệt</td>
              ) : data.status === "PENDING" ? (
                <td className="text-warning">Đang chờ</td>
              ) : (
                <td className="text-danger">Từ chối</td>
              )}

              {/* <td>{data.referenceNumber}</td> */}
              {isStaff && (
                <td style={{ width: "fit-content" }}>
                  <div
                    className="d-flex justify-content-center"
                    style={{ width: "10rem" }}
                  >
                    <button
                      className="btn btn-success me-1"
                      disabled={data.status !== "PENDING"}
                      style={{ width: "fit-content" }}
                      onClick={() => handleApprove(data.id)}
                    >
                      Duyệt
                    </button>
                    <button
                      className="btn btn-danger"
                      disabled={data.status !== "PENDING"}
                      style={{ width: "fit-content" }}
                      onClick={() => handleInject(data.id)}
                    >
                      Từ chối
                    </button>
                  </div>
                </td>
              )}
              <td style={{ width: "fit-content" }}>
                <a
                  className="btn btn-outline-dark"
                  style={{ width: "100px" }}
                  href={`/loan/${data.id}`}
                >
                  Chi tiết
                </a>
                <br />
                {data.status === "APPROVED" && (
                  <button
                    type="button"
                    className="btn btn-success mt-1"
                    onClick={() => open({ loan: data })}
                  >
                    Xác nhận giải ngân
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="20" className="table-light">
              <div className="w-100 d-flex justify-content-between pt-3 px-3">
                <p className="text-start">Tổng: </p>
                <p className="text-end">{dataArray.length} hợp đồng</p>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default LoanApplicationTable;
