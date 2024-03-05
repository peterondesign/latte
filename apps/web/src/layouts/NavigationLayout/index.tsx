import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { SubNavigation } from './components/SubNavigation'
import { Topbar } from './components/Topbar/index.layout'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const authentication = useAuthentication()
  const user = authentication?.user as Model.User

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  const itemsLeftbar = [

{
      key: '/co-working-spaces',
      label: 'Discover',
      onClick: () => goTo('/co-working-spaces'),
    },

{
      key: '/admin-dashboard',
      label: 'Admin Dashboard',
      onClick: () => goTo('/admin-dashboard'),
    },

{
      key: '/edit-profile',
      label: 'Edit Profile',
      onClick: () => goTo('/edit-profile'),
    },

{
      key: '/nomads',
      label: 'Nomad Community',
      onClick: () => goTo('/nomads'),
    },

{
      key: '/manage-co-working-spaces',
      label: 'Manage Spaces',
      onClick: () => goTo('/manage-co-working-spaces'),
    },

{
      key: '/add-co-working-space',
      label: 'Add New Space',
      onClick: () => goTo('/add-co-working-space'),
    },

{
      key: '/',
      label: 'Home',
      onClick: () => goTo('/'),
    },

]

  const itemsUser = [

]

  const itemsTopbar = [
    
  ]

  const itemsSubNavigation = [
    
    {
      key: '/co-working-spaces',
      label: 'Discover',
    },
    
    {
      key: '/co-working-space/:id',
      label: 'Space Details',
    },
    
    {
      key: '/nomad-profile/:id',
      label: 'Nomad Profile',
    },
    
    {
      key: '/admin-dashboard',
      label: 'Admin Dashboard',
    },
    
    {
      key: '/edit-profile',
      label: 'Edit Profile',
    },
    
    {
      key: '/nomads',
      label: 'Nomad Community',
    },
    
    {
      key: '/manage-co-working-spaces',
      label: 'Manage Spaces',
    },
    
    {
      key: '/add-co-working-space',
      label: 'Add New Space',
    },
    
    {
      key: '/edit-co-working-space/:id',
      label: 'Manage Spaces',
    },
    
    {
      key: '/reviews/:spaceId',
      label: 'Space Reviews',
    },
    
    {
      key: '/',
      label: 'Home',
    },
    
  ]

  const itemsMobile = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              items={itemsTopbar}
              itemsMobile={itemsMobile}
              logo={!isLeftbar && <Logo width={40} height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubNavigation items={itemsSubNavigation} />

              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
