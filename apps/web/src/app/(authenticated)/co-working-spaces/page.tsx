'use client'

import React, { useState } from 'react';
import { Button, Checkbox, Col, Drawer, InputNumber, Modal, Row, Select, Slider, Spin, Typography } from 'antd';
import { EnvironmentOutlined, UserOutlined, SoundOutlined, TeamOutlined, FilterOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const globalCitiesList = ["New York", "London", "Paris", "Tokyo", "Berlin", "Dubai", "Sydney", "San Francisco", "Moscow", "Beijing"];
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function DiscoverSpacesPage() {
  const router = useRouter();
  const authentication = useAuthentication();
  const userId = authentication.user?.id;
  const [coWorkingSpaces, setCoWorkingSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(undefined);
  const [selectedOpenStatus, setSelectedOpenStatus] = useState(undefined);
  const [selectedVenueTypes, setSelectedVenueTypes] = useState([]);
  const [maximumOccupancy, setMaximumOccupancy] = useState(0);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);

  const openStatusOptions = ["Open Now", "Opening Soon", "Closed", "Closing Soon"];
  const venueTypesOptions = ["Lounge", "Cafe", "Restaurant", "Bar", "Coworking Space", "Hotel", "With Outdoor Space"];

  const fetchCoWorkingSpaces = async () => {
    try {
      const spaces = await Api.CoWorkingSpace.findMany({ includes: ['admin', 'images', 'reviews', 'checkIns'] });
      setCoWorkingSpaces(spaces);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch co-working spaces.', error);
      setLoading(false);
    }
  };

  const navigateToSpaceDetails = (id) => {
    router.push(`/co-working-space/${id}`);
  };

  const applyFilters = () => {
    console.log("Filters applied:", { selectedCity, selectedOpenStatus, selectedVenueTypes, maximumOccupancy });
    setFilterDrawerVisible(false);
    // Here you would filter the coWorkingSpaces based on the selected filters
    // This is a placeholder for the actual filtering logic
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Title level={2}>Discover Co-Working Spaces</Title>
      <Text>Explore various co-working spaces to find the perfect spot for your work needs.</Text>
      <Button icon={<FilterOutlined />} style={{ margin: '20px 0' }} onClick={() => setFilterDrawerVisible(true)}>Filter</Button>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {coWorkingSpaces?.map((space) => (
            <Col xs={24} sm={12} md={8} lg={6} key={space.id}>
              <div
                hoverable
                cover={<img alt={space.title} src={space.images?.[0]?.url || ''} style={{ height: '200px', objectFit: 'cover' }} />}
                onClick={() => navigateToSpaceDetails(space.id)}
              >
                <div
                  title={space.title}
                  description={
                    <div direction="vertical">
                      <Text><EnvironmentOutlined /> {space.address}</Text>
                      <Text><UserOutlined /> Admin: {space.admin?.name}</Text>
                      <Text><SoundOutlined /> Noise Level: {space.noiseLevel}</Text>
                      <Text><TeamOutlined /> Occupancy: {space.occupancy}</Text>
                    </div>
                  }
                />
              </div>
            </Col>
          ))}
        </Row>
      )}
      <Drawer
        title="Filter Options"
        placement="right"
        closable={false}
        onClose={() => setFilterDrawerVisible(false)}
        visible={filterDrawerVisible}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        <Select
          showSearch
          style={{ width: '100%', marginBottom: '20px' }}
          placeholder="Select a city"
          optionFilterProp="children"
          value={selectedCity}
          onChange={setSelectedCity}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          dropdownRender={menu => (
            <>
              {menu}
              <Select.Option key="new" value="newCity">Add city...</Select.Option>
            </>
          )}
        >
          {globalCitiesList.map(city => (
            <Select.Option key={city} value={city}>{city}</Select.Option>
          ))}
        </Select>
        <Select
          style={{ width: '100%', marginBottom: '20px' }}
          placeholder="Open status"
          value={selectedOpenStatus}
          onChange={setSelectedOpenStatus}
        >
          {openStatusOptions.map(status => (
            <Select.Option key={status} value={status}>{status}</Select.Option>
          ))}
        </Select>
        <Checkbox.Group
          options={venueTypesOptions}
          value={selectedVenueTypes}
          onChange={setSelectedVenueTypes}
        />
        <Slider
          min={0}
          max={100}
          onChange={setMaximumOccupancy}
          value={typeof maximumOccupancy === 'number' ? maximumOccupancy : 0}
          style={{ marginTop: '20px' }}
        />
        <Button type="primary" onClick={applyFilters} style={{ marginTop: '20px' }}>Apply Filters</Button>
      </Drawer>
    </div>
  );
}