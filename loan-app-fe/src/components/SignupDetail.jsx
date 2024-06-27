import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequiredSharp from "./RequiredSharp";
import { validateEmail } from "../utils/validate";

const VALIDATE_MESSAGE = {
  accountNumber: {
    invalid: false,
    message: "",
  },
  legal: {
    invalid: false,
    message: "",
  },
  emailAddress: {
    invalid: false,
    message: "",
  },
  phoneNumber: {
    invalid: false,
    message: "",
  },
  address: { invalid: false, message: "" },
  branchInfo: {
    invalid: false,
    message: "",
  },
};

export default function SignupDetail({ onSuccess }) {
  const [phone, setPhone] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("-1");
  const [selectedProvince, setSelectedProvince] = useState("-1");
  const [branches, setBranches] = useState(null);
  const [address, setAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [legal, setLegal] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [province, setProvince] = useState(null);

  const [validateMessage, setValidMessage] = useState(VALIDATE_MESSAGE);

  const navigate = useNavigate();

  const refreshValidateMessage = (field) => {
    if (field) {
      setValidMessage((prev) => ({
        ...prev,
        [field]: {
          invalid: false,
          message: "",
        },
      }));
    } else {
      setValidMessage(VALIDATE_MESSAGE);
    }
  };

  const checkAllFieldsValid = () => {
    for (const key in validateMessage) {
      if (validateMessage.hasOwnProperty(key)) {
        if (validateMessage[key].invalid) {
          return false; // If any invalid field is found, return false
        }
      }
    }
    return true; // If no invalid field is found, return true
  };

  const fetchBranchInfos = async (provinceId) => {
    if (provinceId === "-1" || provinceId === -1) {
      return;
    }

    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/branchInfos/?provinceId=" + provinceId,
        requestOptions
      );
      const result = await response.json();
      setBranches(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      const requestOptions = {
        method: "GET",
      };

      try {
        const response = await fetch(
          "http://localhost:8080/api/provinces",
          requestOptions
        );
        const result = await response.json();
        setProvince(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProvinces();
  }, []);

  const handleSignup = async (event) => {
    event.preventDefault();
    if (!checkAllFieldsValid()) {
      return;
    }

    refreshValidateMessage();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      accountNumber: accountNumber,
      legal: legal,
      emailAddress: emailAddress,
      phoneNumber: phone,
      address: address,
      branchInfo: {
        id: selectedBranch,
      },
      user: {
        id: localStorage.getItem("id"),
      },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "http://localhost:8080/api/accountInfos?user_id=" +
          localStorage.getItem("id"),
        requestOptions
      );
      const result = await response.json();
      localStorage.setItem("isDeclared", 1);
      alert("Bạn khai báo thông tin thành công!");
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value); // Update selectedBranch state when the value changes
  };

  const handleProvinceChange = (event) => {
    if (event.target.value === "-1") {
      setSelectedProvince(event.target.value);
      setSelectedBranch("-1");
      setBranches(null);
      return;
    }
    setSelectedProvince(event.target.value); // Update selectedBranch state when the value changes
    fetchBranchInfos(event.target.value);
  };

  const handleNumberRange = (e, setValue, min, max, field) => {
    const inputValue = e.target.value;
    setValue(e.target.value);

    if (inputValue === "") {
      refreshValidateMessage(field);
    }

    const validateIdNumber = (minLength, maxLength, value) => {
      const regex = new RegExp(`^\\d{${minLength},${maxLength}}$`);
      return regex.test(value);
    };

    if (!validateIdNumber(min, max, inputValue)) {
      setValidMessage((prev) => ({
        ...prev,
        [field]: {
          invalid: true,
          message:
            min === max
              ? `Độ dài phải có đủ ${max} số!`
              : `Độ dài phải từ ${min}-${max} số!`,
        },
      }));
    } else {
      refreshValidateMessage(field);
    }
  };

  const handleEmail = (e, setValue, field) => {
    const inputValue = e.target.value;
    setValue(e.target.value);

    if (inputValue === "") {
      refreshValidateMessage(field);
    }

    if (!validateEmail(inputValue)) {
      setValidMessage((prev) => ({
        ...prev,
        [field]: {
          invalid: true,
          message: `Email bạn nhập chưa đúng định dạng!`,
        },
      }));
    } else {
      refreshValidateMessage(field);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Nhập thông tin</h5>
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="accountNumber" className="form-label">
                    <RequiredSharp /> Số tài khoản:
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      validateMessage.accountNumber.invalid ? "is-invalid" : ""
                    }`}
                    id="accountNumber"
                    placeholder="Nhập số tài khoản"
                    value={accountNumber}
                    onChange={(e) =>
                      handleNumberRange(
                        e,
                        setAccountNumber,
                        8,
                        15,
                        "accountNumber"
                      )
                    }
                    required
                  />
                  <div className="invalid-feedback">
                    {validateMessage.accountNumber.message}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="legal" className="form-label">
                    <RequiredSharp /> CCCD/CMND:
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      validateMessage.legal.invalid ? "is-invalid" : ""
                    }`}
                    id="legal"
                    placeholder="Nhập số CCCD"
                    value={legal}
                    onChange={(e) =>
                      handleNumberRange(e, setLegal, 12, 12, "legal")
                    }
                    required
                  />
                  <div className="invalid-feedback">
                    {validateMessage.legal.message}
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="emailAddress"
                    className="form-label has-validation"
                  >
                    <RequiredSharp /> Email:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validateMessage.emailAddress.invalid ? "is-invalid" : ""
                    }`}
                    id="emailAddress"
                    placeholder="Nhập emailAddress"
                    value={emailAddress}
                    onChange={(e) =>
                      handleEmail(e, setEmailAddress, "emailAddress")
                    }
                    required
                  />
                  <div className="invalid-feedback">
                    {validateMessage.emailAddress.message}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    <RequiredSharp /> Số điện thoại:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    placeholder="Nhập số điện thoại"
                    pattern="^0\d{9}$"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="branch" className="form-label">
                    <RequiredSharp /> Chọn Tỉnh:
                  </label>
                  <select
                    id="inputProvince"
                    className="form-select"
                    value={selectedProvince} // Set the value of the select to the selectedBranch state
                    onChange={handleProvinceChange}
                    required // Call handleBranchChange when the value changes
                  >
                    <option value="-1">Chọn Tỉnh</option>
                    {province &&
                      province.map(({ id, name, region }, _id) => (
                        <option key={_id} value={id}>
                          {name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="branch" className="form-label">
                    <RequiredSharp /> Chi nhánh:
                  </label>
                  <select
                    id="inputBranch"
                    className="form-select"
                    value={selectedBranch} // Set the value of the select to the selectedBranch state
                    onChange={handleBranchChange}
                  >
                    <option value="-1">Chọn chi nhánh</option>
                    {branches &&
                      branches.map((option, _id) => (
                        <option key={_id} value={option.id}>
                          {option.branchName}
                        </option>
                      ))}
                  </select>
                </div>
                {branches && selectedBranch !== "-1" && (
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      <RequiredSharp /> Địa chỉ chi nhánh:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={branches[selectedBranch]?.address}
                      disabled
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    <RequiredSharp /> Địa chỉ:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Nhập địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Lưu thông tin
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
