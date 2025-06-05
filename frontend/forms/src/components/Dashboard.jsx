import React from 'react';

const Dashboard = () => {
  return (
    <div className="Container">
      <h1>Welcome to Your Dashboard</h1>
      <p>You have successfully logged in!</p>
      <a href="/login">Log Out</a>
    </div>
  );
};

export default Dashboard;