'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Row, Col, Spin } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function SuggestCitiesForCoworkingPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('You need to be logged in to view suggested cities.', {
        variant: 'error',
      })
      router.push('/')
      return
    }

    const fetchCities = async () => {
      try {
        const preferences = await Api.Preference.findManyByUserId(userId, {
          includes: ['user'],
        })
        const preferenceData = preferences.map(pref => pref.preferenceData)
        const citiesFound = await Api.City.findMany({
          includes: ['coworkingSpaces'],
        })
        const suggestedCities = citiesFound.filter(city =>
          preferenceData.includes(city.name),
        )
        setCities(suggestedCities)
      } catch (error) {
        enqueueSnackbar('Failed to fetch cities. Please try again later.', {
          variant: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCities()
  }, [userId, router])

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Suggested Cities for Coworking</Title>
      <Paragraph>
        Based on your preferences and location, here are the top cities for you
        to explore coworking spaces.
      </Paragraph>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {cities?.map(city => (
            <Col key={city.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => router.push(`/search/${city.name}`)}
                cover={
                  <img
                    alt={city.name}
                    src={city.coworkingSpaces?.[0]?.photosUrl || ''}
                  />
                }
              >
                <Card.Meta
                  avatar={<EnvironmentOutlined />}
                  title={city.name}
                  description={`Explore coworking spaces in ${city.name}.`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
