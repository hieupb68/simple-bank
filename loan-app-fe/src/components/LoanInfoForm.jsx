import React from "react";
import RequiredSharp from "./RequiredSharp";
import { validateCurrency } from "../utils/validate";
import { useNewLoan } from "../layout/NewLoanProvider";

const LoanInfoForm = () => {
  const {
    newLoan,
    handleChangeValue,
    refreshValidateMessage,
    hanldValidateMessage,
    validateMessage,
  } = useNewLoan();
  return (
    <>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="inputAmount">
          <RequiredSharp />
          Số tiền đề nghị vay:
        </label>
        <input
          type="text"
          className="form-control"
          id="inputAmount"
          placeholder="Số tiền vay"
          value={newLoan.loanInfo.loanAmount}
          onChange={(e) => {
            handleChangeValue(
              validateCurrency(e.target.value, newLoan.loanInfo.loanAmount),
              `loanInfo`,
              "loanAmount"
            );

            const loanInsurance =
              e.target.value === "" ? 0 : e.target.value * 0.1;
            handleChangeValue(
              loanInsurance,
              "loanInsurance",
              "insuranceAmount"
            );
          }}
          required
        />
      </div>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="inputTime">
          <RequiredSharp />
          Thời hạn vay (Tháng):
        </label>
        <input
          type="number"
          className="form-control"
          id="inputTime"
          placeholder="Thời hạn vay"
          value={newLoan.loanInfo.loanTerm}
          onChange={(e) =>
            handleChangeValue(e.target.value, `loanInfo`, "loanTerm")
          }
          required
        />
      </div>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="inputSalary">
          <RequiredSharp />
          Thu nhập hiện tại:
        </label>
        <input
          type="text"
          className="form-control"
          id="inputSalary"
          placeholder="Thu nhập hiện tại"
          value={newLoan.loanInfo.currentEarning}
          onChange={(e) =>
            handleChangeValue(
              validateCurrency(e.target.value, newLoan.loanInfo.currentEarning),
              `loanInfo`,
              "currentEarning"
            )
          }
          required
        />
      </div>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="inputSalary">Lãi xuất (%):</label>
        <input
          type="number"
          className="form-control"
          id="inputSalary"
          placeholder="Thu nhập hiện tại"
          value={Math.round(newLoan.loanInfo.loanInterestRate * 100)}
          onChange={(e) =>
            handleChangeValue(e.target.value, `loanInfo`, "loanInterestRate")
          }
          required
          disabled
        />
      </div>
    </>
  );
};

export default LoanInfoForm;
