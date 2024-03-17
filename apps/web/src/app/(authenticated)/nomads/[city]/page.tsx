'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Row, Col, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function NomadListPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [nomads, setNomads] = useState([])

  useEffect(() => {
    if (!userId) {
      router.push('/select-city')
      return
    }

    const fetchNomads = async () => {
      try {
        const userCheckIns = await Api.CheckIn.findManyByUserId(userId, {
          includes: ['user', 'coworkingSpace', 'coworkingSpace.city'],
        })
        const currentCheckIn = userCheckIns.find(
          checkIn => checkIn.coworkingSpace?.city?.name === params.city,
        )
        if (!currentCheckIn) {
          enqueueSnackbar('No check-ins found in this city', {
            variant: 'info',
          })
          return
        }

        const nomadsCheckIns = await Api.CheckIn.findMany({
          filters: {
            coworkingSpaceId: { eq: currentCheckIn.coworkingSpaceId },
          },
          includes: ['user'],
        })
        setNomads(
          nomadsCheckIns
            .map(checkIn => checkIn.user)
            .filter(user => user && user.id !== userId),
        )
      } catch (error) {
        enqueueSnackbar('Failed to fetch nomads', { variant: 'error' })
      }
    }

    fetchNomads()
  }, [userId, params.city, router])

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Nomads in {params.city}</Title>
        <Text>Connect with other nomads currently in your city.</Text>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {nomads?.map((nomad, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card>
                <Card.Meta
                  avatar={
                    <Avatar
                      src={nomad.pictureUrl || undefined}
                      icon={!nomad.pictureUrl ? <UserOutlined /> : undefined}
                    />
                  }
                  title={nomad.name || 'Anonymous Nomad'}
                  description={`Joined: ${dayjs(nomad.dateCreated).format('MMMM D, YYYY')}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </PageLayout>
  )
}
