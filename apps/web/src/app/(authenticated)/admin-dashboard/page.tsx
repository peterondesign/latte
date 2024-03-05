'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AdminDashboardPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [coWorkingSpaces, setCoWorkingSpaces] = useState([])

  useEffect(() => {
    if (!userId) {
      enqueueSnackbar('You must be logged in to access this page', { variant: 'error' })
      router.push('/')
      return
    }

    const fetchCoWorkingSpaces = async () => {
      try {
        const spaces = await Api.CoWorkingSpace.findManyByAdminId(userId, {
          includes: ['admin', 'images', 'reviews', 'checkIns']
        })
        setCoWorkingSpaces(spaces)
      } catch (error) {
        enqueueSnackbar('Failed to fetch co-working spaces', { variant: 'error' })
      }
    }

    fetchCoWorkingSpaces()
  }, [userId, router])

  const handleUpload = async options => {
    const { file } = options
    try {
      const url = await Api.Upload.upload(file)
      enqueueSnackbar('File uploaded successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to upload file', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Admin Dashboard</Title>
        <Text>Welcome to your central hub for managing co-working spaces.</Text>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {coWorkingSpaces.map(space => (
            <Col key={space.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={space.title}
                extra={<a onClick={() => router.push(`/edit-co-working-space/${space.id}`)}>Edit</a>}
                cover={<img alt="example" src={space.images?.[0]?.url || ''} />}
              >
                <Text>{space.description}</Text>
                <div style={{ marginTop: '10px' }}>
                  <Button type="primary" onClick={() => router.push(`/reviews/${space.id}`)}>View Reviews</Button>
                </div>
              </Card>
            </Col>
          ))}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
              onClick={() => router.push('/add-co-working-space')}
            >
              <PlusOutlined style={{ fontSize: '24px' }} />
              <Text>Add New Space</Text>
            </Card>
          </Col>
        </Row>

        <Upload customRequest={handleUpload} maxCount={1}>
          <Button icon={<PlusOutlined />}>Upload Image</Button>
        </Upload>
      </div>
    </PageLayout>
  )
}