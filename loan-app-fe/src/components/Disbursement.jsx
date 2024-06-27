import React, { useEffect, useMemo, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { decimalToPercent, formatCurrency } from "../utils/fomat";
import { useModalContext } from "../layout/ModalProvider";

const LabelTextLayout = ({ label, text: TextComp }) => {
  return (
    <Row className="w-100 mb-2 d-flex align-content-center justify-content-center">
      <Col className="h6">{label}</Col>
      <Col>
        <TextComp />
      </Col>
    </Row>
  );
};

const Disbursement = ({ loan }) => {
  const daysOfMonth = Array.from({ length: 30 }, (_, i) => i + 1); // Create array [1, 2, ..., 31]
  const [selectedDay, setSelectedDay] = useState(1);

  const { isShowing, setCallback } = useModalContext();

  useEffect(() => {
    const onSubmit = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        loanApplication: {
          id: loan.id,
        },
        disbursementDate: new Date(),
        monthlyRepaymentDay: selectedDay,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:8080/loan-disbursements",
          requestOptions
        );
        const result = await response.text();
        alert("Giao dịch thành công, Quý khách sẽ được giải ngân sau ít phút!");
      } catch (error) {
        console.error(error);
      }
    };

    if (isShowing === true) {
      setCallback(() => onSubmit);
    }
  }, [isShowing, selectedDay, setCallback]);

  return (
    <div className="w-100">
      <LabelTextLayout
        label="Số điện thoại"
        text={() => (
          <div className="text-secondary">{loan.personalInfo.phone}</div>
        )}
      />
      <LabelTextLayout
        label="Số CMND/HC/Thẻ CCCD"
        text={() => (
          <div className="text-secondary">{loan.personalInfo.idNumber}</div>
        )}
      />
      <LabelTextLayout
        label="Địa chỉ thường trú"
        text={() => (
          <div className="text-secondary">{loan.personalInfo.address}</div>
        )}
      />
      <LabelTextLayout
        label="Email"
        text={() => (
          <div className="text-secondary">{loan.personalInfo.email}</div>
        )}
      />
      <LabelTextLayout
        label="Số tiền phê duyệt"
        text={() => (
          <div className="text-secondary">
            {formatCurrency(loan.loanInfo.loanAmount)}
          </div>
        )}
      />
      <LabelTextLayout
        label="Lãi suất cho vay"
        text={() => (
          <div className="text-secondary">
            {decimalToPercent(loan.loanInfo.loanInterestRate)}
          </div>
        )}
      />
      <LabelTextLayout
        label="Biên độ lãi suất"
        text={() => (
          <div className="text-secondary">
            {decimalToPercent(loan.loanInfo.interestRateMargin)}
          </div>
        )}
      />
      <LabelTextLayout
        label="Ngày trả nợ hàng tháng"
        text={() => (
          <div className="">
            <select
              className="form-select"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              {daysOfMonth.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <div className="text-secondary mt-1">
              Tháng 2 được tính là ngày 28
            </div>
          </div>
        )}
      />
      <LabelTextLayout
        label="Tài khoản giải ngân"
        text={() => (
          <div className="text-secondary">
            <select className="form-select">
              <option value={loan.id}>
                {loan.personalInfo.firstName} {loan.personalInfo.lastName} -{" "}
                {loan.accountInfo.accountNumber}
              </option>
            </select>
          </div>
        )}
      />
    </div>
  );
};

export default Disbursement;
