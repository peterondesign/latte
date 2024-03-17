'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Row, Col, Space, Button } from 'antd'
import { StarOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SubscriptionFeaturesPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [subscriptions, setSubscriptions] = useState([])

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('You need to be logged in to view this page', {
        variant: 'error',
      })
      router.push('/')
      return
    }

    const fetchSubscriptions = async () => {
      try {
        const subscriptionsFound = await Api.Subscription.findManyByUserId(
          userId,
          { includes: ['user'] },
        )
        setSubscriptions(subscriptionsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch subscription details', {
          variant: 'error',
        })
      }
    }

    fetchSubscriptions()
  }, [userId, router])

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Exclusive Nomad Subscription Features</Title>
        <Text>
          Explore the advanced functionalities available to enhance your app
          experience.
        </Text>
        <Row gutter={[16, 16]} justify="center">
          {subscriptions?.map(subscription => (
            <Col key={subscription.id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Card
                title={<Text strong>{subscription.type}</Text>}
                actions={[
                  <StarOutlined key="star" />,
                  <CalendarOutlined key="calendar" />,
                  <UserOutlined key="user" />,
                ]}
              >
                <p>
                  <Text strong>Start Date:</Text> {subscription.startDate}
                </p>
                <p>
                  <Text strong>End Date:</Text> {subscription.endDate}
                </p>
                <Button
                  type="primary"
                  onClick={() => router.push('/subscription')}
                >
                  Manage Subscription
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </PageLayout>
  )
}
