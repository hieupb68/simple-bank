import React, { createContext, useState, useContext } from "react";

// Define the initial state for the newLoan form
const initialNewLoanState = {
  accountInfo: {
    id: 0,
    accountNumber: "string",
    legal: "string",
    emailAddress: "Aasd@gmail.com",
    phoneNumber: "1231451354",
    address: "string",
    branchInfo: {
      id: 0,
      province: {
        id: 0,
        name: "ANGIANG",
        region: "string",
      },
      branchName: "string",
      address: "string",
    },
  },
  personalInfo: {
    id: 0,
    firstName: "Nguyen Van",
    lastName: "Ads",
    dob: "2000-03-25T04:11:46.020Z",
    gender: "MALE",
    idNumber: "4343476567",
    phone: "13123211",
    email: "Aasd@gmail.com",
    address: "HANOI",
  },
  contactInfo1: {
    id: 0,
    fullName: "NGUYEN VAN B",
    relationship: "FATHER",
    phoneNumber: "0987654321",
  },
  contactInfo2: {
    id: 0,
    fullName: "NGUYEN THI C",
    relationship: "MOTHER",
    phoneNumber: "0987667567",
  },
  loanInfo: {
    id: 0,
    loanAmount: 80000000,
    loanTerm: 36,
    currentEarning: 1500000,
    loanInterestRate: 0.07,
    interestRateMargin: 0.04,
  },
  capitalUsage: {
    id: 0,
    totalCapital: 50000000,
    purpose: "Mua nha",
    source: "Luong",
  },
  loanInsurance: {
    id: 0,
    insuranceAmount: 6800000,
  },
  referenceNumber: "AAAAA",
};

const VALIDATE_MESSAGE = {
  accountInfo: {
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
    address: {
      invalid: false,
      message: "",
    },
  },
  personalInfo: {
    firstName: {
      invalid: false,
      message: "",
    },
    lastName: {
      invalid: false,
      message: "",
    },
    dob: {
      invalid: false,
      message: "",
    },
    gender: {
      invalid: false,
      message: "",
    },
    idNumber: {
      invalid: false,
      message: "",
    },
    phone: {
      invalid: false,
      message: "",
    },
    email: {
      invalid: false,
      message: "",
    },
    address: {
      invalid: false,
      message: "",
    },
  },
  contactInfo1: {
    fullName: {
      invalid: false,
      message: "",
    },
    relationship: {
      invalid: false,
      message: "",
    },
    phoneNumber: {
      invalid: false,
      message: "",
    },
  },
  contactInfo2: {
    fullName: {
      invalid: false,
      message: "",
    },
    relationship: {
      invalid: false,
      message: "",
    },
    phoneNumber: {
      invalid: false,
      message: "",
    },
  },
  loanInfo: {
    loanAmount: {
      invalid: false,
      message: "",
    },
    loanTerm: {
      invalid: false,
      message: "",
    },
    currentEarning: {
      invalid: false,
      message: "",
    },
  },
  capitalUsage: {
    totalCapital: {
      invalid: false,
      message: "",
    },
    purpose: {
      invalid: false,
      message: "",
    },
    source: {
      invalid: false,
      message: "",
    },
  },
  loanInsurance: {
    insuranceAmount: {
      invalid: false,
      message: "",
    },
  },
  referenceNumber: {
    invalid: false,
    message: "",
  },
};

// Create the context
const NewLoanContext = createContext();

// Create a provider component for the context
export const NewLoanProvider = ({ children }) => {
  const [newLoan, setNewLoan] = useState(initialNewLoanState);
  const [validateMessage, setValidMessage] = useState(VALIDATE_MESSAGE);

  const handleChangeValue = (value, field1, field2) => {
    setNewLoan((prev) => ({
      ...prev,
      [field1]: {
        ...prev[field1],
        [field2]: value,
      },
    }));
  };

  const refreshValidateMessage = (field1, field2) => {
    if (field1 || field2) {
      setValidMessage((prev) => ({
        ...prev,
        [field1]: {
          ...prev[field1],
          [field2]: {
            invalid: false,
            message: "",
          },
        },
      }));
    } else {
      setValidMessage(VALIDATE_MESSAGE);
    }
  };

  const hanldValidateMessage = (field1, field2, message) => {
    setValidMessage((prev) => ({
      ...prev,
      [field1]: {
        ...prev[field1],
        [field2]: {
          invalid: true,
          message: message,
        },
      },
    }));
  };

  return (
    <NewLoanContext.Provider
      value={{
        newLoan,
        validateMessage,
        setNewLoan,
        handleChangeValue,
        setValidMessage,
        refreshValidateMessage,
        hanldValidateMessage,
      }}
    >
      {children}
    </NewLoanContext.Provider>
  );
};

// Create a hook to use the context
export const useNewLoan = () => useContext(NewLoanContext);
