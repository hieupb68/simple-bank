import React, { useEffect, useState } from "react";
import RequiredSharp from "./RequiredSharp";
import DatePicker from "react-datepicker";
import { validateEmail } from "../utils/validate";
import { useNewLoan } from "../layout/NewLoanProvider";

const PersonalInfoForm = () => {
  const {
    newLoan,
    handleChangeValue,
    setNewLoan,
    validateMessage,
    refreshValidateMessage,
    hanldValidateMessage,
  } = useNewLoan();

  const [declaredPersonalInfo, setDeclaredPersonalInfo] = useState(null);
  const [selectPersonalInfo, setSelectPersonalInfo] = useState(-1);

  const handleSelectPersonalInfo = (e) => {
    setSelectPersonalInfo(e.target.value);
    const id = e.target.value;
    if (parseInt(id, 10) !== -1 && declaredPersonalInfo.length > 0) {
      setNewLoan((prev) => ({
        ...prev,
        personalInfo: declaredPersonalInfo.find(
          (e) => e.id === parseInt(id, 10)
        ),
      }));
    }
  };

  const handleEmail = (e, field) => {
    const inputValue = e.target.value;
    handleChangeValue(e.target.value, "personalInfo", field);

    if (inputValue === "") {
      refreshValidateMessage("personalInfo", field);
    }

    if (!validateEmail(inputValue)) {
      hanldValidateMessage(
        "personalInfo",
        field,
        `Email bạn nhập chưa đúng định dạng!`
      );
    } else {
      refreshValidateMessage("personalInfo", field);
    }
  };

  const handleNumberRange = (e, min, max, field) => {
    const inputValue = e.target.value;
    handleChangeValue(e.target.value, "personalInfo", field);

    if (inputValue === "") {
      refreshValidateMessage("personalInfo", field);
    }

    const validateIdNumber = (minLength, maxLength, value) => {
      const regex = new RegExp(`^\\d{${minLength},${maxLength}}$`);
      return regex.test(value);
    };

    if (!validateIdNumber(min, max, inputValue)) {
      hanldValidateMessage(
        "personalInfo",
        field,
        min === max
          ? `Độ dài phải có đủ ${max} số!`
          : `Độ dài phải từ ${min}-${max} số!`
      );
    } else {
      refreshValidateMessage("personalInfo", field);
    }
  };

  useEffect(() => {
    const fetchPersonalInfo = async (userId) => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/personal-info/user/" + userId,
          requestOptions
        );
        const result = await response.json();
        setDeclaredPersonalInfo(result);
      } catch (error) {
        console.error(error);
      }
    };

    const userId = localStorage.getItem("id");
    fetchPersonalInfo(userId);
  }, []);

  return (
    <>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="inputPersonal">
          {/* <RequiredSharp /> */}
          Sử dụng thông tin đã khai báo:
        </label>
        <select
          className={`form-select`}
          id="inputPersonal"
          required
          value={selectPersonalInfo}
          onChange={handleSelectPersonalInfo}
        >
          <option value="-1">Chọn thông tin</option>
          {declaredPersonalInfo &&
            declaredPersonalInfo.map((ps, _id) => (
              <option key={_id} value={ps.id}>
                {ps.firstName} {ps.lastName} - {ps.idNumber}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="inputFirstName">
          <RequiredSharp />
          Họ:
        </label>
        <input
          type="text"
          className={`form-control ${
            validateMessage.personalInfo.firstName.invalid ? "is-invalid" : ""
          }`}
          id="inputFirstName"
          placeholder="Họ"
          value={newLoan.personalInfo.firstName}
          onChange={(e) =>
            handleChangeValue(e.target.value, "personalInfo", "firstName")
          }
          required
        />
        <div className="invalid-feedback">
          {validateMessage.personalInfo.firstName.message}
        </div>
      </div>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="inputName">
          <RequiredSharp />
          Tên:
        </label>
        <input
          type="text"
          className={`form-control ${
            validateMessage.personalInfo.lastName.invalid ? "is-invalid" : ""
          }`}
          id="inputName"
          placeholder="Tên"
          value={newLoan.personalInfo.lastName}
          onChange={(e) =>
            handleChangeValue(e.target.value, "personalInfo", "lastName")
          }
          required
        />
        <div className="invalid-feedback">
          {validateMessage.personalInfo.lastName.message}
        </div>
      </div>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="dob" className="form-label">
          <RequiredSharp />
          Ngày sinh:
        </label>
        <br />
        <DatePicker
          className={`form-select ${
            validateMessage.personalInfo.dob.invalid ? "is-invalid" : ""
          }`}
          selected={newLoan.personalInfo.dob}
          onChange={(date) => handleChangeValue(date, "personalInfo", "dob")}
          required
          placeholderText="mm/dd/yyyy"
        />
        <div className="invalid-feedback">
          {validateMessage.personalInfo.dob.message}
        </div>
      </div>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="inputGender">
          <RequiredSharp />
          Giới tính:
        </label>
        <select
          className={`form-select ${
            validateMessage.personalInfo.gender.invalid ? "is-invalid" : ""
          }`}
          id="inputGender"
          required
          value={newLoan.personalInfo.gender}
          onChange={(e) =>
            handleChangeValue(e.target.value, "personalInfo", "gender")
          }
        >
          <option value="MALE">Nam</option>
          <option value="FEMALE">Nữ</option>
        </select>
      </div>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="inputIdNumber">
          <RequiredSharp />
          CCCD:
        </label>
        <input
          type="number"
          className={`form-control ${
            validateMessage.personalInfo.idNumber.invalid ? "is-invalid" : ""
          }`}
          id="inputIdNumber"
          placeholder="Nhập căn cước"
          required
          value={newLoan.personalInfo.idNumber}
          onChange={(e) => handleNumberRange(e, 8, 13, "idNumber")}
        />
        <div className="invalid-feedback">
          {validateMessage.personalInfo.idNumber.message}
        </div>
      </div>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="inputPhone">
          <RequiredSharp />
          Số điện thoại:
        </label>
        <input
          type="text"
          className={`form-control ${
            validateMessage.personalInfo.phone.invalid ? "is-invalid" : ""
          }`}
          id="inputPhone"
          placeholder="Số điện thoại"
          required
          value={newLoan.personalInfo.phone}
          onChange={(e) => handleNumberRange(e, 10, 10, "phone")}
        />
        <div className="invalid-feedback">
          {validateMessage.personalInfo.phone.message}
        </div>
      </div>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="email" className="form-label has-validation">
          <RequiredSharp /> Email:
        </label>
        <input
          type="text"
          className={`form-control ${
            validateMessage.personalInfo.email.invalid ? "is-invalid" : ""
          }`}
          id="email"
          placeholder="Nhập email"
          value={newLoan.personalInfo.email}
          onChange={(e) => handleEmail(e, "email")}
          required
        />
        <div className="invalid-feedback">
          {validateMessage.personalInfo.email.message}
        </div>
      </div>
      <div className="form-group mb-3 col-sm-8 col-lg-6">
        <label htmlFor="inputAddress">
          <RequiredSharp />
          Địa chỉ thường trú:
        </label>
        <input
          type="text"
          className={`form-control ${
            validateMessage.personalInfo.address.invalid ? "is-invalid" : ""
          }`}
          id="inputAddress"
          placeholder="Nhập địa chỉ thường trú"
          required
          value={newLoan.personalInfo.address}
          onChange={(e) =>
            handleChangeValue(e.target.value, "personalInfo", "address")
          }
        />
        <div className="invalid-feedback">
          {validateMessage.personalInfo.address.message}
        </div>
      </div>
    </>
  );
};

export default PersonalInfoForm;
