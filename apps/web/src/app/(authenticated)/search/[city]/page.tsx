'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Select, Card, Row, Col, Space } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CoworkingSpaceSearchPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [coworkingSpaces, setCoworkingSpaces] = useState([])

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesFound = await Api.City.findMany()
        setCities(citiesFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch cities', { variant: 'error' })
      }
    }

    fetchCities()
  }, [])

  useEffect(() => {
    const fetchCoworkingSpaces = async () => {
      if (selectedCity) {
        try {
          const coworkingSpacesFound =
            await Api.CoworkingSpace.findManyByCityId(selectedCity, {
              includes: ['city'],
            })
          setCoworkingSpaces(coworkingSpacesFound)
        } catch (error) {
          enqueueSnackbar('Failed to fetch coworking spaces', {
            variant: 'error',
          })
        }
      }
    }

    fetchCoworkingSpaces()
  }, [selectedCity])

  const handleCityChange = value => {
    setSelectedCity(value)
    router.push(`/search/${value}`)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Title level={2}>Find Coworking Spaces</Title>
      <Text>Select a city to see coworking spaces available.</Text>
      <Select
        showSearch
        style={{ width: '100%', margin: '20px 0' }}
        placeholder="Select a city"
        optionFilterProp="children"
        onChange={handleCityChange}
        filterOption={(input, option) =>
          option?.children
            ?.toString()
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        }
      >
        {cities?.map(city => (
          <Option key={city.id} value={city.id}>
            {city.name}
          </Option>
        ))}
      </Select>
      <Row gutter={[16, 16]}>
        {coworkingSpaces?.map(space => (
          <Col key={space.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={space.name} src={space.photosUrl} />}
              onClick={() => router.push(`/space/${space.id}`)}
            >
              <Card.Meta
                title={space.name}
                description={
                  <Space direction="vertical">
                    <Text>{space.address}</Text>
                    <Text>
                      <EnvironmentOutlined /> {space.city?.name}
                    </Text>
                  </Space>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}
