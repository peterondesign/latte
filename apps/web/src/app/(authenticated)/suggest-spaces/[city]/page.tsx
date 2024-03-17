'use client'

import { useState, useEffect } from 'react'
import { Typography, Select, Card, Row, Col, Rate, Space } from 'antd'
import {
  EnvironmentOutlined,
  WifiOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SuggestCoworkingSpacesPage() {
  const router = useRouter()
  const { city } = useParams<any>()
  const { enqueueSnackbar } = useSnackbar()
  const [coworkingSpaces, setCoworkingSpaces] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (city) {
      Api.CoworkingSpace.findManyByCityId(city, {
        includes: ['city', 'reviews', 'checkIns'],
      })
        .then(spaces => {
          setCoworkingSpaces(spaces)
          setLoading(false)
        })
        .catch(error => {
          console.error('Failed to fetch coworking spaces:', error)
          enqueueSnackbar('Failed to fetch coworking spaces', {
            variant: 'error',
          })
          setLoading(false)
        })
    }
  }, [city])

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Suggested Coworking Spaces in {city}</Title>
        <Text>Explore the best coworking spaces tailored for your needs.</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
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
                          <EnvironmentOutlined /> {space.address}
                        </Text>
                        <Text>
                          <WifiOutlined /> {space.averageWifiStrength}
                        </Text>
                        <Text>
                          <ClockCircleOutlined /> {space.hoursOfOperation}
                        </Text>
                        <Text>
                          <DollarOutlined /> {space.priceRange}
                        </Text>
                        <Rate disabled defaultValue={space.googleRating} />
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Space>
    </PageLayout>
  )
}
