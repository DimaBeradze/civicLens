import React, { useState } from 'react';
import { Input, Select, Button, Upload, Layout, Alert } from 'antd';
import { message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';




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
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
        console.log(info.file, info.fileList);
        }
        if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
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
    setInvestigated(true);
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


        </div>
      )}
    </Layout>
  );
};

export default Investigation;
