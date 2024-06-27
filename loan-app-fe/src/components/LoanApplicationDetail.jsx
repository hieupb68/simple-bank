import React from "react";
import { formatCurrency, formatDate } from "../utils/fomat";

const nameDirectory = {
  id: "ID",
  accountInfo: {
    id: "ID Tài khoản",
    accountNumber: "Số tài khoản",
    legal: "Thông tin pháp lý",
    emailAddress: "Địa chỉ email",
    phoneNumber: "Số điện thoại",
    address: "Địa chỉ",
    branchInfo: {
      _name: "Chi nhánh",
      id: "ID Chi nhánh",
      province: {
        _name: "Tỉnh",
        id: "ID Tỉnh/Thành phố",
        name: "Tên Tỉnh/Thành phố",
        region: "Vùng miền",
      },
      branchName: "Tên Chi nhánh",
      address: "Địa chỉ Chi nhánh",
    },
    user: {
      _name: "Người dùng",
      id: "Id người dùng",
      username: "Tài khoản",
      email: "Email",
      isDeclared: "Khai báo",
      roles: {
        _name: "Vị trí",
      },
    },
  },
  personalInfo: {
    id: "ID Thông tin cá nhân",
    firstName: "Tên",
    lastName: "Họ",
    dob: "Ngày sinh",
    gender: "Giới tính",
    idNumber: "Số CMND/CCCD",
    phone: "Số điện thoại",
    email: "Email",
    address: "Địa chỉ",
  },
  contactInfo1: {
    _name: "Thông tin liên hệ",
    id: "ID Thông tin liên hệ 1",
    fullName: "Họ và tên",
    relationship: "Quan hệ",
    phoneNumber: "Số điện thoại",
  },
  contactInfo2: {
    id: "ID Thông tin liên hệ 2",
    fullName: "Họ và tên",
    relationship: "Quan hệ",
    phoneNumber: "Số điện thoại",
  },
  loanInfo: {
    id: "ID Thông tin khoản vay",
    loanAmount: "Số tiền vay",
    loanTerm: "Thời hạn vay",
    currentEarning: "Thu nhập hiện tại",
    loanInterestRate: "Lãi suất vay",
    interestRateMargin: "Biên độ lãi suất",
  },
  capitalUsage: {
    id: "ID Mục đích sử dụng vốn",
    totalCapital: "Tổng số vốn",
    purpose: "Mục đích",
    source: "Nguồn vốn",
  },
  loanInsurance: {
    _name: "Bảo hiểm hợp đồng",
    id: "ID Bảo hiểm khoản vay",
    insuranceAmount: "Số tiền bảo hiểm",
  },
  status: "Trạng thái",
  referenceNumber: "Số tham chiếu",
};

const keyMoneyFomat = [
  "loanAmount",
  "currentEarning",
  "totalCapital",
  "insuranceAmount",
];

const relationships = {
  FATHER: "Bố",
  MOTHER: "Mẹ",
};

const genders = {
  MALE: "Nam",
  FEMALE: "Nữ",
};

const roles = {
  ROLE_USER: "Người dùng",
  ROLE_STAFF: "Nhân viên",
};

const SubDataCard = ({ title, data, name }) => {
  return (
    <div className="mb-3">
      {data ? (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>
                {typeof name[key] === "object"
                  ? key === "roles"
                    ? name[key]["_name"]
                    : name["_name"]
                  : name[key]}
                :
              </strong>{" "}
              {key === "isDeclared" ? (
                value === 1 ? (
                  "Rồi"
                ) : (
                  "Chưa"
                )
              ) : key === "roles" ? (
                value.map((role, _id) => (
                  <SubDataCard
                    key={_id}
                    title={key}
                    data={{ [role.id]: roles[role.name] }}
                    name={{ 1: "1", 2: "2" }}
                  />
                ))
              ) : typeof value === "object" ? (
                <SubDataCard title={key} data={value} name={name[key]} />
              ) : (
                value
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>Không có</div>
      )}
    </div>
  );
};

const DataCard = ({ title, data, name }) => {
  return (
    <div className="card mb-3 m-1">
      <div className="card-header">
        <h4 className="card-title">{title}</h4>
      </div>
      <div className="card-body">
        <ul>
          {Object.entries(data).map(
            ([key, value], _id) =>
              key !== "id" && (
                <li key={key}>
                  <strong>
                    {typeof name[key] === "object"
                      ? name[key]._name
                      : name[key]}
                    :
                  </strong>{" "}
                  {key === "dob" ? (
                    formatDate(value)
                  ) : keyMoneyFomat.includes(key) ? (
                    formatCurrency(value)
                  ) : key === "relationship" ? (
                    relationships[value]
                  ) : key === "gender" ? (
                    genders[value]
                  ) : typeof value === "object" ? (
                    <>
                      <SubDataCard
                        key={_id}
                        title={key}
                        data={value}
                        name={name[key]}
                      />
                    </>
                  ) : (
                    value
                  )}
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

const DisplayData = ({ data }) => {
  const rolesString = localStorage.getItem("roles");

  const roles = rolesString ? rolesString.split(",") : [];

  const isStaff = roles.includes("ROLE_STAFF");

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

  return (
    <div>
      <div className="card w-auto m-1 py-3">
        <div className="px-3 d-flex align-items-center">
          <div className="h5 mt-1">Trạng thái: </div>
          <div
            className={`ms-3 rounded px-2 w-25 ${
              data.status === "APPROVED"
                ? "bg-success"
                : data.status === "PENDING"
                ? "bg-warning"
                : "bg-danger"
            }`}
          >
            <div className="text-white py-2">
              {data.status === "APPROVED"
                ? "Đã duyệt"
                : data.status === "PENDING"
                ? "Đang chờ"
                : "Từ chối"}
            </div>
          </div>
        </div>
        <div className="mt-3 ms-3">
          {isStaff && (
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
          )}
        </div>
      </div>
      <div className="d-flex flex-wrap">
        <div className="col-12 col-md-6 col-lg-4">
          <DataCard
            title="Thông tin tài khoản"
            data={data.accountInfo}
            name={nameDirectory.accountInfo}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <DataCard
            title="Thông tin cá nhân"
            data={data.personalInfo}
            name={nameDirectory.personalInfo}
          />
          <DataCard
            title="Người liên hệ 1"
            data={data.contactInfo1}
            name={nameDirectory.contactInfo1}
          />
          <DataCard
            title="Người liên hệ 2"
            data={data.contactInfo2}
            name={nameDirectory.contactInfo2}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <DataCard
            title="Thông tin hợp đồng vay"
            data={data.loanInfo}
            name={nameDirectory.loanInfo}
          />
          <DataCard
            title="Mục đích sử dụng"
            data={data.capitalUsage}
            name={nameDirectory.capitalUsage}
          />
          <DataCard
            title="Bảo hiểm hợp đồng"
            data={data.loanInsurance}
            name={nameDirectory.loanInsurance}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
