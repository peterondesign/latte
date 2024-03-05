'use client'

import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Upload, Typography, Row, Col, Space } from 'antd';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EditSpaceDetailsPage() {
  const router = useRouter();
  const params = useParams<any>();
  const authentication = useAuthentication();
  const { enqueueSnackbar } = useSnackbar();
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (params.id) {
      fetchSpaceDetails(params.id);
    }
  }, [params.id]);

  const fetchSpaceDetails = async (id: string) => {
    try {
      const space = await Api.CoWorkingSpace.findOne(id, { includes: ['images'] });
      form.setFieldsValue({ ...space, images: space.images?.map(image => ({ uid: image.id, url: image.url, status: 'done' })) });
      setImages(space.images || []);
    } catch (error) {
      enqueueSnackbar('Failed to fetch co-working space details', { variant: 'error' });
    }
  };

  const handleFinish = async (values: any) => {
    try {
      await Api.CoWorkingSpace.updateOne(params.id, {
        ...values,
        adminId: authentication.user?.id,
      });
      enqueueSnackbar('Co-working space details updated successfully', { variant: 'success' });
      router.push(`/co-working-space/${params.id}`);
    } catch (error) {
      enqueueSnackbar('Failed to update co-working space details', { variant: 'error' });
    }
  };

  const handleUpload = async (options: any) => {
    const { file } = options;
    try {
      const url = await Api.Upload.upload(file);
      setImages(prevImages => [...prevImages, { uid: dayjs().toISOString(), url, status: 'done' }]);
    } catch (error) {
      enqueueSnackbar('Failed to upload image', { variant: 'error' });
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2}>Edit Co-Working Space Details</Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
              <Input placeholder="Title" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input the address!' }]}>
              <Input placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="description" label="Description">
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>
        <Form.Item name="amenities" label="Amenities">
          <Input placeholder="Amenities" />
        </Form.Item>
        <Form.Item name="noiseLevel" label="Noise Level">
          <Select placeholder="Select noise level">
            <Option value="quiet">Quiet</Option>
            <Option value="moderate">Moderate</Option>
            <Option value="loud">Loud</Option>
          </Select>
        </Form.Item>
        <Form.Item name="occupancy" label="Occupancy">
          <Input type="number" placeholder="Occupancy" />
        </Form.Item>
        <Form.Item label="Images">
          <Upload listType="picture-card" fileList={images} customRequest={handleUpload} maxCount={1}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
            <Button onClick={() => router.push('/manage-co-working-spaces')}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}