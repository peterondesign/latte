'use client'

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Space, Typography, Modal, Form, Input, Switch, message } from 'antd'
import { EditOutlined, DeleteOutlined, StarOutlined, StarFilled } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ManageSpacesPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [spaces, setSpaces] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentSpace, setCurrentSpace] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    if (userId) {
      fetchSpaces()
    }
  }, [userId])

  const fetchSpaces = async () => {
    try {
      const spaces = await Api.CoWorkingSpace.findManyByAdminId(userId, { includes: ['images', 'reviews', 'checkIns'] })
      setSpaces(spaces)
    } catch (error) {
      enqueueSnackbar('Failed to fetch spaces', { variant: 'error' })
    }
  }

  const handleEdit = (space) => {
    setCurrentSpace(space)
    form.setFieldsValue({ ...space, popular: space.popular })
    setIsModalVisible(true)
  }

  const handleDelete = async (spaceId) => {
    try {
      await Api.CoWorkingSpace.deleteOne(spaceId)
      fetchSpaces()
      enqueueSnackbar('Space deleted successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to delete space', { variant: 'error' })
    }
  }

  const handleUpdate = async (values) => {
    try {
      await Api.CoWorkingSpace.updateOne(currentSpace.id, values)
      fetchSpaces()
      setIsModalVisible(false)
      enqueueSnackbar('Space updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update space', { variant: 'error' })
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Manage Co-Working Spaces</Title>
        <Text>View, edit, and delete co-working spaces. Highlight spaces as popular.</Text>
        <Row gutter={[16, 16]}>
          {spaces?.map((space) => (
            <Col key={space.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                actions={[
                  <EditOutlined key="edit" onClick={() => handleEdit(space)} />,
                  <DeleteOutlined key="delete" onClick={() => handleDelete(space.id)} />,
                  space.popular ? <StarFilled key="star" /> : <StarOutlined key="star" />,
                ]}
              >
                <Card.Meta
                  title={space.title}
                  description={
                    <>
                      <Text>{space.description}</Text>
                      <br />
                      <Text type="secondary">{dayjs(space.dateCreated).format('DD/MM/YYYY')}</Text>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
        <Modal title="Edit Space" visible={isModalVisible} onCancel={handleCancel} onOk={() => form.submit()}>
          <Form form={form} layout="vertical" onFinish={handleUpdate}>
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="popular" label="Popular" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </PageLayout>
  )
}