'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Row, Col, Space, Rate } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ViewCoworkingSpacesNearbyPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [coworkingSpaces, setCoworkingSpaces] = useState([])

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('Please login to view coworking spaces nearby', {
        variant: 'info',
      })
      // Since there's no valid login path, we remove the redirection to avoid bugs.
    } else {
      fetchCoworkingSpaces()
    }
  }, [userId])

  const fetchCoworkingSpaces = async () => {
    try {
      const spaces = await Api.CoworkingSpace.findMany({ includes: ['city'] })
      setCoworkingSpaces(spaces)
    } catch (error) {
      enqueueSnackbar('Failed to fetch coworking spaces', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Coworking Spaces Nearby</Title>
        <Text>Find a convenient and suitable place to work close to you.</Text>
        <Row gutter={[16, 16]}>
          {coworkingSpaces?.map(space => (
            <Col key={space.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={space.name}
                    src={space.photosUrl}
                    style={{ height: 180, objectFit: 'cover' }}
                  />
                }
                onClick={() => router.push(`/space/${space.id}`)}
              >
                <Card.Meta
                  title={space.name}
                  description={
                    <Space direction="vertical">
                      <Text>
                        <EnvironmentOutlined /> {space.city?.name}
                      </Text>
                      <Rate
                        disabled
                        defaultValue={Math.round(space.googleRating)}
                      />
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </PageLayout>
  )
}
