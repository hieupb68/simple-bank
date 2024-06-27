import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserHome.css';

const AdminHome = () => {
  const [name, setName] = useState('');
  const [loanApplications, setLoanApplications] = useState([]);

  // Sample loanApplications data
  useEffect(() => {
    // Fetch or set loanApplications data
    const sampleData = [
      { id: 1, amount: 1000, term: '6 months', date: '2024-03-26' },
      { id: 2, amount: 2000, term: '12 months', date: '2024-03-27' },
      { id: 3, amount: 1500, term: '9 months', date: '2024-03-28' }
    ];
    setLoanApplications(sampleData);
  }, []);

  const handleDetailClick = (userId) => {
    alert(`Detail button clicked for user ${userId}`);
    // Implement your logic for handling the detail button click here
  };

  return (
    <div className="user-home">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div class="col-md-8 offset-md-2">
            <table class="table table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Số tiền</th>
                  <th scope="col">Kỳ hạn</th>
                  <th scope="col">Ngày vay</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {loanApplications.map((application, index) => (
                  <tr key={application.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{application.amount}</td>
                    <td>{application.term}</td>
                    <td>{application.date}</td>
                    <td>
                      <button className="btn btn-primary btn-sm" onClick={() => handleDetailClick(application.id)}> Chi tiết </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
