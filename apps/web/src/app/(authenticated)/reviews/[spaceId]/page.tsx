'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Avatar, Row, Col, Rate } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SpaceReviewsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { enqueueSnackbar } = useSnackbar()
  const [reviews, setReviews] = useState([])
  const [spaceTitle, setSpaceTitle] = useState('')

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const coWorkingSpace = await Api.CoWorkingSpace.findOne(params.spaceId, { includes: ['reviews', 'reviews.user'] })
        if (coWorkingSpace) {
          setReviews(coWorkingSpace.reviews || [])
          setSpaceTitle(coWorkingSpace.title)
        }
      } catch (error) {
        enqueueSnackbar('Failed to fetch reviews', { variant: 'error' })
      }
    }

    if (params.spaceId) {
      fetchReviews()
    }
  }, [params.spaceId])

  return (
    <div style={{ margin: '20px' }}>
      <Title level={2}>{spaceTitle} Reviews</Title>
      <Text>Read what others have to say about working here.</Text>
      <Row gutter={[16, 16]} justify="center">
        {reviews?.map((review) => (
          <Col key={review.id} xs={24} sm={12} md={8} lg={6}>
            <Card>
              <Card.Meta
                avatar={<Avatar src={review.user?.pictureUrl || undefined} icon={!review.user?.pictureUrl && <UserOutlined />} />}
                title={review.user?.name || 'Anonymous'}
                description={
                  <>
                    <Text>{dayjs(review.dateCreated).format('DD MMM YYYY')}</Text>
                    <Rate disabled defaultValue={3} />
                    <Paragraph>{review.content}</Paragraph>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}