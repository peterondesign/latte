'use client'

import React, { useEffect, useState } from 'react';
import { Typography, Card, Row, Col, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function NomadCommunityPage() {
  const router = useRouter();
  const authentication = useAuthentication();
  const { enqueueSnackbar } = useSnackbar();
  const [nomads, setNomads] = useState([]);

  useEffect(() => {
    const fetchNomads = async () => {
      try {
        const usersFound = await Api.User.findMany({ includes: ['checkIns', 'checkIns.coWorkingSpace'] });
        setNomads(usersFound);
      } catch (error) {
        enqueueSnackbar('Failed to fetch nomads', { variant: 'error' });
      }
    };

    fetchNomads();
  }, []);

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Nomad Community</Title>
        <Text>Connect, share, and discover with fellow nomads around the world.</Text>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {nomads?.map((nomad) => (
            <Col xs={24} sm={12} md={8} lg={6} key={nomad.id}>
              <Card
                hoverable
                onClick={() => router.push(`/nomad-profile/${nomad.id}`)}
                cover={<Avatar size={64} src={nomad.pictureUrl || ''} icon={<UserOutlined />} />}
              >
                <Card.Meta
                  title={nomad.name || 'Anonymous Nomad'}
                  description={
                    <Space direction="vertical">
                      <Text>Joined: {dayjs(nomad.dateCreated).format('DD MMM YYYY')}</Text>
                      {nomad.checkIns?.map((checkIn, index) => (
                        <Text key={index}>
                          Checked into: {checkIn.coWorkingSpace?.title} on {dayjs(checkIn.checkInTime).format('DD MMM YYYY')}
                        </Text>
                      ))}
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </PageLayout>
  );
}