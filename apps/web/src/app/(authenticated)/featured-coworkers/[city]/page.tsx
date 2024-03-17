'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Row, Col, Avatar, Space } from 'antd'
import { EnvironmentOutlined, UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function FeaturedCoworkersPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { city } = params
  const { enqueueSnackbar } = useSnackbar()
  const [nomads, setNomads] = useState<Model.NomadMatch[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchNomads = async () => {
      try {
        setIsLoading(true)
        const nomadMatches = await Api.NomadMatch.findManyByUserAId(city, {
          includes: ['userA', 'userA.preferences'],
        })
        setNomads(nomadMatches)
      } catch (error) {
        enqueueSnackbar('Failed to fetch nomads. Please try again.', {
          variant: 'error',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchNomads()
  }, [city])

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Featured Nomads in {city}</Title>
        <Text>
          Discover and connect with digital nomads and remote workers who are
          currently in {city}.
        </Text>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {nomads?.map(nomad => (
            <Col xs={24} sm={12} md={8} lg={6} key={nomad.id}>
              <Card
                loading={isLoading}
                hoverable
                cover={
                  <img alt="example" src={nomad.userA?.pictureUrl || ''} />
                }
                actions={[
                  <EnvironmentOutlined
                    key="explore"
                    onClick={() => router.push(`/space/${nomad.userAId}`)}
                  />,
                  <UserOutlined
                    key="profile"
                    onClick={() => router.push(`/nomads/${nomad.userAId}`)}
                  />,
                ]}
              >
                <Card.Meta
                  avatar={<Avatar src={nomad.userA?.pictureUrl || ''} />}
                  title={nomad.userA?.name}
                  description={
                    <Space direction="vertical">
                      <Text>
                        Preferences:{' '}
                        {nomad.userA?.preferences
                          ?.map(pref => pref.preferenceData)
                          .join(', ')}
                      </Text>
                      <Text>
                        Joined: {dayjs(nomad.dateCreated).format('DD MMM YYYY')}
                      </Text>
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </PageLayout>
  )
}
