import React, { useState } from 'react';
import { Input, Select, Button, Upload, Layout, Alert } from 'antd';
import { message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

import { Descriptions, Typography } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

const { Title, Text, Link } = Typography;



const { Option } = Select;
const { Sider, Content } = Layout;

const props = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    listType: 'picture',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    async onPreview(file){
        let src = file.url;
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    },
    async onChange(info) {
        const { status } = info.file;
          
        if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);

        const formData = new FormData();
        formData.append('file', info.file.originFileObj);

        const targetUrl = 'https://b2b.loupefy.com/b2b/similarity'
        try {
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'x-access-key': 'c94a79a7-0508-432b-8402-60e4c9e42f89',
                    // Include any other headers required by the API
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data[0].results);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
        } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const Investigation = () => {
  const [investigated, setInvestigated] = useState(false);
  const [buttonLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    job: '',
    file: null
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, job: value });
  };

  const handleInvestigate = () => {
    setLoading(true)
    setTimeout(() => {
        buttonLoading
        setLoading(false);
        setInvestigated(true);
    }, 2000);
    // Perform investigation logic here
  };

  const { Dragger } = Upload;

  return (
    <Layout style={{height: '100%', flexDirection: 'row', justifyContent: 'center'}}>
        <Content style={{
            boxSizing: 'content-box',
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 120px',
            maxWidth: '40%'
        }}>
          <Input 
            placeholder="Full Name" 
            name="fullName" 
            value={formData.fullName}
            onChange={handleInputChange}
            style={{ marginBottom: 20 }}
          />
          <Select 
            placeholder="Select a job" 
            onChange={handleSelectChange} 
            style={{ width: '100%', marginBottom: 20 }}
          >
            {/* Replace with actual job options */}
            <Option value="job1">Job 1</Option>
            <Option value="job2">Job 2</Option>
          </Select>
          <div style={{display: 'table'}}>
          <ImgCrop rotationSlider style={{display: 'grid'}}> 
            <Dragger {...props} style={{display: 'grid'}}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                Support for a single photo
                </p>
            </Dragger>
        </ImgCrop>
        </div>


          <Button 
            style={{
                width: 'max-content',
                marginTop: 20
            }}
            type="primary" 
            size='large'
            loading={buttonLoading}
            onClick={handleInvestigate} 
          >
            Investigate
          </Button>
        </Content>

      {investigated && (
        <div style={{ background: '#f0f0f0', padding: '24px 64px', width: '50%' }}>
          <Alert
                message="Alert title"
                description="Interactively monetize corporate alignments and fully tested niche markets."
                type="warning"
                closable
                showIcon
            />

        <Title level={4}>Davit Mirianashvili</Title>
        <div style={{ 
            background: '#fff',
            padding: '24px', 
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{display: 'block'}}>
                <Text>Declared by </Text>
                <Link href="http://declaration.acb.gov.ge" target="_blank">
                    declaration.acb.gov.ge
                </Link>
            </div>

            <Descriptions column={1} bordered size='small' style={{ margin: '12px 0' }}>
                <Descriptions.Item label="Salary">5,500 GEL</Descriptions.Item>
                <Descriptions.Item label="Monthly outgoings">2,500 GEL</Descriptions.Item>
                <Descriptions.Item label="Cash / Equivalent">20,500 GEL</Descriptions.Item>
            </Descriptions>
            <Button style={{alignSelf: 'flex-end'}} 
                type="primary" icon={<LinkOutlined />} ghost={true} href="https://declaration.acb.gov.ge/Home/DownloadPdf/151757" target="_blank">
                View full declaration
            </Button>
        </div>




        </div>
      )}
    </Layout>
  );
};

export default Investigation;
