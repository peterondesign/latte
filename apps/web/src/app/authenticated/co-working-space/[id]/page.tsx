'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Image, List, Rate, Button, Input } from 'antd'
import { EnvironmentOutlined, SoundOutlined, TeamOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SpaceDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [spaceDetails, setSpaceDetails] = useState<any>(null)

  useEffect(() => {
    const fetchSpaceDetails = async () => {
      try {
        const coWorkingSpaceFound = await Api.CoWorkingSpace.findOne(params.id, {
          includes: ['images', 'reviews', 'checkIns', 'admin']
        })
        setSpaceDetails(coWorkingSpaceFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch co-working space details', { variant: 'error' })
      }
    }

    if (params.id) {
      fetchSpaceDetails()
    }
  }, [params.id])

  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={24} lg={16}>
          <Title>{spaceDetails?.title}</Title>
          <Paragraph>
            <EnvironmentOutlined /> {spaceDetails?.address}
          </Paragraph>
          <Row gutter={[16, 16]}>
            {spaceDetails?.images?.map((image: any) => (
              <Col key={image.id} xs={24} sm={12} lg={8}>
                <Image src={image.url} alt={spaceDetails.title} style={{ width: '100%' }} />
              </Col>
            ))}
          </Row>
          <Paragraph style={{ marginTop: '20px' }}>{spaceDetails?.description}</Paragraph>
          <Title level={3}>Amenities</Title>
          <Text>{spaceDetails?.amenities}</Text>
          <Row gutter={[16, 16]} align="middle" style={{ marginTop: '20px' }}>
            <Col>
              <SoundOutlined /> Noise Level: <Text>{spaceDetails?.noiseLevel}</Text>
            </Col>
            <Col>
              <TeamOutlined /> Occupancy: <Text>{spaceDetails?.occupancy}</Text>
            </Col>
          </Row>
          <Title level={3} style={{ marginTop: '20px' }}>Reviews</Title>
          <List
            itemLayout="horizontal"
            dataSource={spaceDetails?.reviews}
            renderItem={(review: any) => (
              <List.Item>
                <List.Item.Meta
                  title={dayjs(review.dateCreated).format('MMMM D, YYYY')}
                  description={review.content}
                />
                <Rate disabled defaultValue={review.rating} />
              </List.Item>
            )}
          />
          <Title level={3} style={{ marginTop: '20px' }}>Check-In</Title>
          <Button type="primary" onClick={() => enqueueSnackbar('Check-in feature coming soon!', { variant: 'info' })}>
            Check-In Now
          </Button>
        </Col>
      </Row>
    </PageLayout>
  )
}