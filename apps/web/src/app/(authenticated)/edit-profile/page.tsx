'use client'

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, DatePicker, Select, Typography, Row, Col, Space, Avatar } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function EditProfilePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [user, setUser] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId)
        .then(setUser)
        .catch(() => enqueueSnackbar('Failed to fetch user data', { variant: 'error' }))
    }
  }, [userId])

  const onFinish = async (values) => {
    try {
      await Api.User.updateOne(userId, values)
      enqueueSnackbar('Profile updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update profile', { variant: 'error' })
    }
  }

  const logout = () => {
    // Assuming logout functionality is handled here
    enqueueSnackbar('Logged out successfully', { variant: 'success' })
    router.push('/')
  }

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} sm={18} md={12} lg={10} xl={8}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Title>Edit Profile</Title>
            <Text>Update your profile information below.</Text>
            {user && (
              <Avatar size={64} icon={<UserOutlined />} src={user.pictureUrl} />
            )}
            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{
              bio: user?.bio,
              city: user?.city,
              endDate: user?.endDate ? dayjs(user.endDate) : null,
              jobRole: user?.jobRole,
              skills: user?.skills,
              interests: user?.interests,
            }}>
              <Form.Item name="bio" label="Bio">
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item name="city" label="City">
                <Input />
              </Form.Item>
              <Form.Item name="endDate" label="Duration in the city (End Date)">
                <DatePicker />
              </Form.Item>
              <Form.Item name="jobRole" label="Job Role">
                <Input />
              </Form.Item>
              <Form.Item name="skills" label="Skills">
                <Select mode="tags" style={{ width: '100%' }} placeholder="Select or type skills">
                  {/* Assuming skills are predefined or fetched */}
                </Select>
              </Form.Item>
              <Form.Item name="interests" label="Interests">
                <Select mode="tags" style={{ width: '100%' }} placeholder="Select or type interests">
                  {/* Assuming interests are predefined or fetched */}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Update Profile</Button>
              </Form.Item>
            </Form>
            <Button icon={<LogoutOutlined />} onClick={logout}>Logout</Button>
          </Space>
        </Col>
      </Row>
    </PageLayout>
  )
}