import { Alert, Col, Layout, Row } from 'antd';
import React from 'react';
import SiteHeader from './header/header';
import './layout.less';
import styles from './layout.module.less';
import SiteSider from './sider/sider';

const { Header, Content, Footer, Sider } = Layout;

const PROMO_MESSAGE = '';

const SiteLayout = ({ children, title, location }) => {
  const DEFAULT_COL_PROPS = {
    xs: { span: 22, offset: 1 },
    sm: { span: 20, offset: 2 },
    md: { span: 16, offset: 4 },
    lg: { span: 14, offset: 5 },
    xl: { span: 12, offset: 6 },
    xxl: { span: 10, offset: 7 },
  };

  return (
    <Layout hasSider className={'full-height'}>
      <Sider
        theme="light"
        breakpoint="md"
        collapsedWidth="0"
        className={styles.sider}
        trigger={null}
      >
        <SiteSider location={location} />
      </Sider>
      <Layout>
        <Header theme="light" className={styles.header}>
          <SiteHeader pageTitle={title} location={location} />
        </Header>
        {PROMO_MESSAGE && (
          <Alert
            className={styles.alert}
            type="info"
            message={PROMO_MESSAGE}
            closable
          ></Alert>
        )}
        <Content className={styles.content}>
          <Row className={'full-height'}>
            <Col {...DEFAULT_COL_PROPS}>{children}</Col>
          </Row>
        </Content>
        <Footer className={styles.footer}>
          © Oriane Bernard {new Date().getFullYear()}. Tous droits réservés.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SiteLayout;
