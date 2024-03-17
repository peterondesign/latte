'use client'

import { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Rate, Avatar, Space, Tag } from 'antd'
import {
  EnvironmentOutlined,
  WifiOutlined,
  ClockCircleOutlined,
  SoundOutlined,
  StarOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CoworkingSpaceDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [coworkingSpace, setCoworkingSpace] = useState(null)

  useEffect(() => {
    const fetchCoworkingSpace = async () => {
      try {
        const space = await Api.CoworkingSpace.findOne(params.id, {
          includes: ['city', 'reviews', 'reviews.user'],
        })
        setCoworkingSpace(space)
      } catch (error) {
        enqueueSnackbar('Failed to fetch coworking space details', {
          variant: 'error',
        })
      }
    }

    if (params.id) {
      fetchCoworkingSpace()
    }
  }, [params.id])

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>{coworkingSpace?.name}</Title>
        <Paragraph>
          <Space>
            <EnvironmentOutlined />
            {coworkingSpace?.address}, {coworkingSpace?.city?.name}
          </Space>
        </Paragraph>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card cover={<img alt="example" src={coworkingSpace?.photosUrl} />}>
              <Card.Meta
                title="Amenities"
                description={coworkingSpace?.amenities
                  .split(',')
                  .map((amenity, index) => (
                    <Tag color="blue" key={index}>
                      {amenity.trim()}
                    </Tag>
                  ))}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Details">
              <Paragraph>
                <ClockCircleOutlined /> Hours of Operation:{' '}
                {coworkingSpace?.hoursOfOperation}
              </Paragraph>
              <Paragraph>
                <WifiOutlined /> Wi-Fi Strength:{' '}
                {coworkingSpace?.averageWifiStrength}
              </Paragraph>
              <Paragraph>
                <SoundOutlined /> Average Noise Level:{' '}
                {coworkingSpace?.averageNoiseLevel}
              </Paragraph>
              <Paragraph>
                <StarOutlined /> Google Rating:
                <Rate
                  disabled
                  defaultValue={Math.round(coworkingSpace?.googleRating)}
                />
                {coworkingSpace?.googleRating}
              </Paragraph>
            </Card>
            <Card title="User Reviews" style={{ marginTop: '20px' }}>
              {coworkingSpace?.reviews?.map(review => (
                <div key={review.id} style={{ marginBottom: '20px' }}>
                  <Space>
                    <Avatar src={review.user?.pictureUrl} />
                    <Text strong>{review.user?.name}</Text>
                  </Space>
                  <Paragraph>{review.content}</Paragraph>
                  <Rate disabled defaultValue={review.rating} />
                </div>
              ))}
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
