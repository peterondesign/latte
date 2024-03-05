'use client'

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Input, Row, Select, Typography } from 'antd'
import { StarOutlined, SearchOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function DiscoverSpacesPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const [coWorkingSpaces, setCoWorkingSpaces] = useState([])
  const [searchCity, setSearchCity] = useState('')

  useEffect(() => {
    const fetchCoWorkingSpaces = async () => {
      try {
        const spaces = await Api.CoWorkingSpace.findMany({
          filters: searchCity ? { address: { like: `%${searchCity}%` } } : undefined,
          includes: ['images', 'reviews']
        })
        setCoWorkingSpaces(spaces)
      } catch (error) {
        enqueueSnackbar('Failed to fetch co-working spaces', { variant: 'error' })
      }
    }

    fetchCoWorkingSpaces()
  }, [searchCity])

  const handleSearchChange = (value: string) => {
    setSearchCity(value)
  }

  const handleViewDetails = (id: string) => {
    router.push(`/co-working-space/${id}`)
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Discover Co-Working Spaces</Title>
        <Text>Find the perfect place to work in your city or while traveling.</Text>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Input.Group compact>
              <Select
                showSearch
                placeholder="Filter by city"
                onChange={handleSearchChange}
                style={{ width: 'calc(100% - 200px)' }}
              >
                {/* Assuming cities are hardcoded for demo purposes */}
                <Option value="New York">New York</Option>
                <Option value="San Francisco">San Francisco</Option>
                <Option value="London">London</Option>
              </Select>
              <Button type="primary" icon={<SearchOutlined />} onClick={() => setSearchCity(searchCity)}>
                Search
              </Button>
            </Input.Group>
          </Col>
          {coWorkingSpaces?.map((space) => (
            <Col key={space.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt={space.title} src={space.images?.[0]?.url || '/placeholder.jpg'} />}
                actions={[
                  <Button key="view" type="link" onClick={() => handleViewDetails(space.id)}>
                    View details
                  </Button>
                ]}
              >
                <Card.Meta
                  title={space.title}
                  description={
                    <>
                      <Text>{space.address}</Text>
                      <br />
                      <Text>
                        <StarOutlined /> {space.reviews?.length || 0} Reviews
                      </Text>
                      <br />
                      <Text>Occupancy: {space.occupancy}%</Text>
                    </>
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
