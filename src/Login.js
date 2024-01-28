import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Success:', values);
    // Handle login logic here
    localStorage.setItem('isLoggedIn', 'true');
    onLoginSuccess();
    navigate('/investigation');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container">
      <Row gutter={24} justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={0} sm={0} md={24} lg={8} xl={8}>
          <div className="login-image" />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
