'use client'

import React, { useState } from 'react';
import { Button, Form, Input, Typography, Upload, message, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Title, Paragraph } = Typography;
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AddNewSpacePage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const authentication = useAuthentication();
  const userId = authentication.user?.id;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleUpload = async options => {
    const { file } = options;
    try {
      const url = await Api.Upload.upload(file);
      setFileList(fileList => [...fileList, { url: url, status: 'done' }]);
      message.success(`${file.name} file uploaded successfully`);
    } catch (error) {
      message.error(`${file.name} file upload failed.`);
    }
  };

  const onFinish = async values => {
    try {
      const spaceValues = { ...values, adminId: userId, images: fileList.map(file => ({ url: file.url })) };
      await Api.CoWorkingSpace.createOneByAdminId(userId, spaceValues);
      enqueueSnackbar('Co-working space added successfully', { variant: 'success' });
      router.push('/manage-co-working-spaces');
    } catch (error) {
      enqueueSnackbar('Failed to add co-working space', { variant: 'error' });
    }
  };

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Title>Add New Co-working Space</Title>
        <Paragraph>Fill in the details below to add a new co-working space.</Paragraph>
        <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 600, width: '100%' }}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input the address!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="amenities" label="Amenities">
            <Input />
          </Form.Item>
          <Form.Item name="noiseLevel" label="Noise Level">
            <Input />
          </Form.Item>
          <Form.Item name="occupancy" label="Occupancy">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="popular" label="Popular" valuePropName="checked">
            <Input type="checkbox" />
          </Form.Item>
          <Form.Item label="Upload Images">
            <Upload fileList={fileList} customRequest={handleUpload} listType="picture-card" maxCount={1}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Co-working Space
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </PageLayout>
  );
}