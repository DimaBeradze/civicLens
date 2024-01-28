import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import Login from './Login';
import Demo from './Demo'
import Investigation from './Investigation';

import './App.css'


const { Header, Content } = Layout;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');


  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login flag
    setIsLoggedIn(false);
    history.pushState(null, null, '/');
    window.location.reload();
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Layout className="layout">
        {isLoggedIn && (
          <Header>
            <div className="logo">
            </div>
            <Menu theme="dark" mode="horizontal" style={{display: 'block'}}>
              <Menu.Item key="1">
                <Link to="/investigation">Investigation</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/history">History</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/profile">Profile</Link>
              </Menu.Item>
              <Menu.Item key="5" onClick={handleLogout} style={{ float: 'right' }}>
                <LogoutOutlined /> Log out
              </Menu.Item>
            </Menu>
          </Header>
        )}
        <Content style={{ padding: '24px', display: 'flex' }}>
          <div className="site-layout-content">
            <Routes>
              {!isLoggedIn ? (
                <>
                  <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                  <Route path="/demo" element={<Demo />} />
                </>

              ) : (
                <>
                  <Route path="/investigation" element={<Investigation />} />
                </>
              )}
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
