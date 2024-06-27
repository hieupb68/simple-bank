import React from "react";
import { Table } from "react-bootstrap";
import { formatCurrency } from "../utils/fomat";

const InterestDecreaseTable = ({ data }) => {
  const collumns = [
    { name: "Kỳ trả lãi" },
    { name: "Số tiền gốc còn lại" },
    { name: "Số tiền gốc phải trả" },
    { name: "Số tiền lãi phải trả" },
    { name: "Số tiền gốc và lãi" },
  ];
  function calculateTotalAmount(list, field) {
    return list.reduce((total, item) => {
      const amount = parseFloat(item[field]);
      return total + (isNaN(amount) ? 0 : amount);
    }, 0);
  }
  return (
    <div>
      <Table responsive className="w-auto">
        <thead>
          <tr>
            {collumns.map((col, index) => (
              <th key={index} className="text-center">
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="text-center">{index}</td>
              <td className="text-center">
                {formatCurrency(row.remainAmount)}
              </td>
              <td className="text-center">{formatCurrency(row.basedAmount)}</td>
              <td className="text-center">
                {formatCurrency(row.interestAmount)}
              </td>
              <td className="text-center">{formatCurrency(row.total)}</td>
            </tr>
          ))}
          <tr>
            <td className="h6 text-center">Tổng</td>
            <td></td>
            <td className="h6 text-center">
              {formatCurrency(calculateTotalAmount(data, "basedAmount"))}
            </td>
            <td className="h6 text-center">
              {formatCurrency(calculateTotalAmount(data, "interestAmount"))}
            </td>
            <td className="h6 text-center">
              {formatCurrency(calculateTotalAmount(data, "total"))}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default InterestDecreaseTable;
