import React, { useState } from 'react';
import { Upload, Card, Col, Row, Typography, Space, Spin } from 'antd';
import { message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';


const Demo = () => {
    const { Dragger } = Upload;
    const { Meta } = Card;
    const { Text, Link } = Typography;

    
  const [data, setDate] = useState([]);
  const [loading, setLoading] = useState(false);

  const props = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    listType: 'picture-card',
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

        if (status === 'uploading') {
            setLoading(true);
          }
          
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
            setDate(data[0].results);
            setLoading(false);
        } catch (error) {
            console.error('Error uploading file:', error);
            setLoading(false);
        }
        } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const cardStyle = {
    width: '100%', // Fixed width for each card
    margin: '0 auto', // Center cards in the column
  };

  return (
    <div> 
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

        {loading ? <>
            <div style={{ textAlign: 'center', marginTop: 50 }}>
            <Spin size="large" />
            </div>
        </> : 
        <div style={{ width: '100%', margin: '24px auto' }}>
          <Row gutter={[16, 16]}>
            {data.map((item, index) => (
              <Col span={12} key={index} style={{ maxWidth: '375px', margin: '0 auto', flexGrow: 1 }}> {/* Adjusted for two columns */}
                <Card
                  hoverable
                  style={{ width: '100%' }} // Cards will fill the column space
                  cover={
                    <img
                      alt={item.product.name}
                      src={item.product.picture}
                      style={{ objectFit: 'contain', height: 150 }}
                    />
                  }
                  actions={[
                    <Link href={item.product.url} target="_blank" rel="noopener noreferrer">
                      View Product
                    </Link>
                  ]}
                >
                  <Meta
                    title={
                      <Text ellipsis={{ tooltip: item.product.name }}>
                        {item.product.name}
                      </Text>
                    }
                    description={
                      <Space direction="vertical">
                        <Text ellipsis={{ tooltip: item.product.manufacturer }}>
                          {item.product.manufacturer}
                        </Text>
                        <Text ellipsis={{ tooltip: item.product.category }}>
                          {item.product.category}
                        </Text>
                        <Text delete={item.product.old_price}>{item.product.old_price && `$${item.product.old_price}`}</Text>
                        <Text strong>{`$${item.product.price}`}</Text>
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        }
    </div>
  );
};

export default Demo;
