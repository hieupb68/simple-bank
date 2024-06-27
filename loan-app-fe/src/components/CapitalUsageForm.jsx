import React from "react";
import RequiredSharp from "./RequiredSharp";
import { useNewLoan } from "../layout/NewLoanProvider";
import { validateCurrency } from "../utils/validate";

const CapitalUsageForm = () => {
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
        <label htmlFor="inputBase">
          <RequiredSharp />
          Vốn tự có:
        </label>
        <input
          type="text"
          className="form-control"
          id="inputBase"
          placeholder=""
          value={newLoan.capitalUsage.totalCapital}
          onChange={(e) =>
            handleChangeValue(
              validateCurrency(
                e.target.value,
                newLoan.capitalUsage.totalCapital
              ),
              "capitalUsage",
              "totalCapital"
            )
          }
          required
        />
      </div>
      <div className="mb-3 col-sm-8 col-lg-6">
        <label htmlFor="why" className="form-label">
          <RequiredSharp />
          Mục đích sử dụng:
        </label>
        <input
          id="why"
          className="form-control"
          value={newLoan.capitalUsage.purpose}
          onChange={(e) =>
            handleChangeValue(e.target.value, "capitalUsage", "purpose")
          }
          required
        />
      </div>
      <div className="mb-3 col-sm-8 col-lg-6">
        <label htmlFor="source" className="form-label">
          <RequiredSharp />
          Nguồn trả lãi:
        </label>
        <input
          id="source"
          className="form-control"
          value={newLoan.capitalUsage.source}
          onChange={(e) =>
            handleChangeValue(e.target.value, "capitalUsage", "source")
          }
          required
        />
      </div>
    </>
  );
};

export default CapitalUsageForm;
