import { Alert, Col, Layout, Row } from 'antd';
import { Entry } from 'contentful';
import React, { ReactNode } from 'react';
import { IPageFields } from '../../@types/generated/contentful';
import SiteHeader from './header/header';
import './layout.less';
import styles from './layout.module.less';
import SiteSider from './sider/sider';
import LayoutType from './type/Layout';

const { Header, Content, Footer, Sider } = Layout;

const PROMO_MESSAGE = '';

type Props = {
  page: Entry<IPageFields>;
  layout: LayoutType;
  children: ReactNode;
};

const SiteLayout = ({ children, layout, page }: Props) => {
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
        <SiteSider slug={page?.fields.slug} layout={layout} />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <SiteHeader
            pageTitle={page?.fields.title}
            layout={layout}
            slug={page?.fields.slug}
          />
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
