'use client'

import React, { useEffect, useState } from 'react'
import { Select, Typography } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CitySelectionPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [cities, setCities] = useState([])

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

  const handleCityChange = (cityId: string) => {
    router.push(`/search/${cityId}`)
  }

  return (
    <PageLayout layout="full-width">
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <EnvironmentOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
        <Title level={2}>Select Your City</Title>
        <Text>
          Please select your current city to find coworking spaces near you.
        </Text>
        <Select
          showSearch
          style={{ width: '100%', marginTop: '20px' }}
          placeholder="Select a city"
          optionFilterProp="children"
          onChange={handleCityChange}
          filterOption={(input, option) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {cities?.map(city => (
            <Option key={city.id} value={city.id}>
              {city.name}
            </Option>
          ))}
        </Select>
      </div>
    </PageLayout>
  )
}
