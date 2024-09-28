// src/components/User/UserDashboard.js
import React from 'react';
import Header from '../Header';

const UserDashboard = () => {
  return (
    <div>
      {/* Include the Header at the top */}
      <Header />

      {/* Main Content of the User Dashboard */}
      <div style={{ padding: '20px' }}>
        <h2>User Dashboard</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <iframe src="https://www.prothomalo.com" title="BBC News" style={{ width: '45%', height: '300px' }}></iframe>
          <iframe src="https://www.nytimes.com/" title="New York Times" style={{ width: '45%', height: '300px' }}></iframe>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
