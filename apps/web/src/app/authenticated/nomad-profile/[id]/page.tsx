'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Avatar, Card, List, Form, Input, Button, DatePicker, Select } from 'antd'
import { UserOutlined, MailOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { TextArea } = Input
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function NomadProfilePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [nomadProfile, setNomadProfile] = useState(null)
  const [comments, setComments] = useState([])
  const [commentContent, setCommentContent] = useState('')
  const [cities, setCities] = useState(['New York', 'London', 'Tokyo']) // Pre-populated cities
  const [selectedCity, setSelectedCity] = useState('')
  const [endDate, setEndDate] = useState(null)

  useEffect(() => {
    const fetchNomadProfile = async () => {
      try {
        const profile = await Api.User.findOne(params.id, { includes: ['comments', 'comments.user'] })
        setNomadProfile(profile)
        const commentsFound = await Api.Comment.findManyByProfileUserId(params.id, { includes: ['user'] })
        setComments(commentsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch nomad profile', { variant: 'error' })
      }
    }
    fetchNomadProfile()
  }, [params.id])

  const handleCommentSubmit = async () => {
    try {
      const newComment = await Api.Comment.createOneByProfileUserId(params.id, { content: commentContent, userId })
      setComments([...comments, newComment])
      setCommentContent('')
      enqueueSnackbar('Comment added successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to add comment', { variant: 'error' })
    }
  }

  const handleCityChange = (value) => {
    setSelectedCity(value)
    if (!cities.includes(value)) {
      setCities([...cities, value]) // Add new city to the list
    }
  }

  const handleEndDateChange = (date, dateString) => {
    setEndDate(dateString)
  }

  const handleProfileUpdate = async () => {
    try {
      await Api.User.updateOne(params.id, { ...nomadProfile, city: selectedCity, endDate })
      enqueueSnackbar('Profile updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update profile', { variant: 'error' })
    }
  }

  return (
    <div>
      <Row justify="center">
        <Col xs={24} md={16} lg={12}>
          <Title level={2}>Nomad Profile</Title>
          {nomadProfile && (
            <Card>
              <Row gutter={[16, 16]}>
                <Col span={24} style={{ textAlign: 'center' }}>
                  <Avatar size={64} src={nomadProfile.pictureUrl} icon={<UserOutlined />} />
                  <Title level={4}>{nomadProfile.name}</Title>
                  <Text><MailOutlined /> {nomadProfile.email}</Text>
                  <br />
                  <Text><EnvironmentOutlined /> {nomadProfile.location}</Text>
                  <br />
                  <Text><CalendarOutlined /> Joined: {dayjs(nomadProfile.dateCreated).format('DD MMM YYYY')}</Text>
                </Col>
                <Col span={24}>
                  <Form layout="vertical" onFinish={handleProfileUpdate}>
                    <Form.Item label="City">
                      <Select
                        showSearch
                        value={selectedCity}
                        onChange={handleCityChange}
                        options={cities.map(city => ({ value: city }))}
                        style={{ width: '100%' }}
                        placeholder="Select or add a city"
                        dropdownRender={menu => (
                          <>
                            {menu}
                            <Select.Option key="new" value={selectedCity}>
                              Add "{selectedCity}"
                            </Select.Option>
                          </>
                        )}
                      />
                    </Form.Item>
                    <Form.Item label="End Date">
                      <DatePicker onChange={handleEndDateChange} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Update Profile
                      </Button>
                    </Form.Item>
                  </Form>
                  <Title level={5}>Comments</Title>
                  <List
                    dataSource={comments}
                    renderItem={item => (
                      <li>
                        <Card>
                          <Row>
                            <Col span={4}>
                              <Avatar src={item.user?.pictureUrl} icon={<UserOutlined />} />
                            </Col>
                            <Col span={20}>
                              <Text strong>{item.user?.name}</Text>
                              <p>{item.content}</p>
                              <Text type="secondary">{dayjs(item.dateCreated).format('DD MMM YYYY')}</Text>
                            </Col>
                          </Row>
                        </Card>
                      </li>
                    )}
                  />
                  {authentication.isAuthenticated && (
                    <Form onFinish={handleCommentSubmit}>
                      <Form.Item>
                        <TextArea rows={4} value={commentContent} onChange={e => setCommentContent(e.target.value)} />
                      </Form.Item>
                      <Form.Item>
                        <Button htmlType="submit" type="primary">
                          Add Comment
                        </Button>
                      </Form.Item>
                    </Form>
                  )}
                </Col>
              </Row>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  )
}