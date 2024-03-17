'use client'

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography, Avatar, Input, Upload } from 'antd'
import { UserOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function MatchingChatPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [matches, setMatches] = useState([])
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [messages, setMessages] = useState([])
  const [messageContent, setMessageContent] = useState('')
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    if (userId) {
      fetchMatches()
    }
  }, [userId])

  const fetchMatches = async () => {
    try {
      const matchesAsUserA = await Api.NomadMatch.findManyByUserAId(userId, {
        includes: ['userB'],
      })
      const matchesAsUserB = await Api.NomadMatch.findManyByUserBId(userId, {
        includes: ['userA'],
      })
      setMatches([...matchesAsUserA, ...matchesAsUserB])
    } catch (error) {
      enqueueSnackbar('Failed to fetch matches', { variant: 'error' })
    }
  }

  const selectMatch = async match => {
    setSelectedMatch(match)
    try {
      const messages = await Api.Message.findManyBySenderId(userId, {
        includes: ['receiver', 'nomadMatch'],
      })
      setMessages(messages.filter(message => message.nomadMatchId === match.id))
    } catch (error) {
      enqueueSnackbar('Failed to fetch messages', { variant: 'error' })
    }
  }

  const sendMessage = async () => {
    if (!messageContent.trim() && fileList.length === 0) return
    try {
      const receiverId =
        selectedMatch.userAId === userId
          ? selectedMatch.userBId
          : selectedMatch.userAId
      const message = await Api.Message.createOneBySenderId(userId, {
        content: messageContent,
        receiverId,
        nomadMatchId: selectedMatch.id,
      })
      setMessages([...messages, message])
      setMessageContent('')
      setFileList([])
      enqueueSnackbar('Message sent', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to send message', { variant: 'error' })
    }
  }

  const handleUpload = async options => {
    const { file } = options
    const url = await Api.Upload.upload(file)
    setFileList(fileList => [...fileList, { url: url, status: 'done' }])
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Nomad Matches</Title>
      <Text>Swipe, match, and chat with other nomads.</Text>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={8}>
          {matches.map(match => (
            <Card
              key={match.id}
              onClick={() => selectMatch(match)}
              style={{ marginBottom: '10px', cursor: 'pointer' }}
            >
              <Card.Meta
                avatar={
                  <Avatar
                    src={
                      match.userB?.pictureUrl ||
                      match.userA?.pictureUrl || <UserOutlined />
                    }
                  />
                }
                title={match.userB?.name || match.userA?.name}
                description={`Matched on ${match.dateCreated}`}
              />
            </Card>
          ))}
        </Col>
        <Col span={16}>
          {selectedMatch && (
            <>
              <Title level={4}>Chat</Title>
              <div style={{ marginBottom: '20px' }}>
                {messages.map(message => (
                  <div key={message.id}>
                    <Text strong>
                      {message.senderId === userId
                        ? 'You'
                        : message.receiver?.name}
                      :
                    </Text>
                    <Text> {message.content}</Text>
                  </div>
                ))}
              </div>
              <Input.TextArea
                rows={4}
                value={messageContent}
                onChange={e => setMessageContent(e.target.value)}
              />
              <Upload
                fileList={fileList}
                customRequest={handleUpload}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
              <Button
                type="primary"
                onClick={sendMessage}
                icon={<SendOutlined />}
                style={{ marginTop: '10px' }}
              >
                Send
              </Button>
            </>
          )}
        </Col>
      </Row>
    </PageLayout>
  )
}
