import React from "react";
import RequiredSharp from "./RequiredSharp";
import { useNewLoan } from "../layout/NewLoanProvider";
const RELATIONSHIPS = [
  {
    en: "Father",
    vn: "Cha",
  },
  {
    en: "Mother",
    vn: "Mẹ",
  },
  {
    en: "Son",
    vn: "Con trai",
  },
  {
    en: "Daughter",
    vn: "Con gái",
  },
  {
    en: "Brother",
    vn: "Anh trai / Em trai",
  },
  {
    en: "Sister",
    vn: "Chị gái / Em gái",
  },
  {
    en: "Grandfather",
    vn: "Ông",
  },
  {
    en: "Grandmother",
    vn: "Bà",
  },
  {
    en: "Grandson",
    vn: "Cháu trai",
  },
  {
    en: "Granddaughter",
    vn: "Cháu gái",
  },
  {
    en: "Uncle",
    vn: "Chú / Bác",
  },
  {
    en: "Aunt",
    vn: "Cô / Dì",
  },
  {
    en: "Nephew",
    vn: "Cháu trai / Em trai",
  },
  {
    en: "Niece",
    vn: "Cháu gái / Em gái",
  },
  {
    en: "Cousin",
    vn: "Anh em họ",
  },
];

const ContactInfoForm = ({ number }) => {
  const {
    newLoan,
    handleChangeValue,
    refreshValidateMessage,
    hanldValidateMessage,
    validateMessage,
  } = useNewLoan();

  const handleNumberRange = (e, min, max, field) => {
    const inputValue = e.target.value;
    handleChangeValue(e.target.value, `contactInfo${number}`, field);

    if (inputValue === "") {
      refreshValidateMessage(`contactInfo${number}`, field);
    }

    const validateIdNumber = (minLength, maxLength, value) => {
      const regex = new RegExp(`^\\d{${minLength},${maxLength}}$`);
      return regex.test(value);
    };

    if (!validateIdNumber(min, max, inputValue)) {
      hanldValidateMessage(
        `contactInfo${number}`,
        field,
        min === max
          ? `Độ dài phải có đủ ${max} số!`
          : `Độ dài phải từ ${min}-${max} số!`
      );
    } else {
      refreshValidateMessage(`contactInfo${number}`, field);
    }
  };
  return (
    <>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="inputName1">
          <RequiredSharp />
          Họ tên:
        </label>
        <input
          type="text"
          className="form-control"
          id="inputName1"
          placeholder="Tên người thân"
          value={newLoan[`contactInfo${number}`].fullName}
          onChange={(e) =>
            handleChangeValue(
              e.target.value,
              `contactInfo${number}`,
              "fullName"
            )
          }
          required
        />
      </div>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="inputRelation1">
          <RequiredSharp />
          Mối quan hệ:
        </label>
        <select
          id="inputRelation1"
          className="form-select"
          value={newLoan[`contactInfo${number}`].relationship} // Set the value of the select to the selectedBranch state
          onChange={(e) =>
            handleChangeValue(
              e.target.value,
              `contactInfo${number}`,
              "relationship"
            )
          }
          required // Call handleBranchChange when the value changes
        >
          {RELATIONSHIPS.map((rel, _id) => (
            <option key={_id} value={rel.en.toUpperCase()}>
              {rel.vn}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="inputPhone1">
          <RequiredSharp />
          Số điện thoại:
        </label>
        <input
          type="text"
          className={`form-control ${
            validateMessage[`contactInfo${number}`].phoneNumber.invalid
              ? "is-invalid"
              : ""
          }`}
          id="inputPhone1"
          placeholder=""
          value={newLoan[`contactInfo${number}`].phoneNumber}
          pattern="^0\d{9}$"
          onChange={(e) => handleNumberRange(e, 10, 10, "phoneNumber")}
          required
        />
        <div className="invalid-feedback">
          {validateMessage[`contactInfo${number}`].phoneNumber.message}
        </div>
      </div>
    </>
  );
};

export default ContactInfoForm;
