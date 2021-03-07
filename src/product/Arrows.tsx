import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { Entry } from 'contentful';
import Link from 'next/link';
import React from 'react';
import { IUniqueProductFields } from '../../@types/generated/contentful';
import Layout from '../layout/type/Layout';
import { getProductSlugFactory } from '../util/product';
import styles from './Arrows.module.less';

const Arrow = ({
  url,
  direction,
}: {
  url: string;
  direction: 'left' | 'right';
}) => (
  <Link href={url}>
    <a className={styles.arrowContainer}>
      <Button
        type="link"
        icon={
          direction === 'right' ? <RightCircleFilled /> : <LeftCircleFilled />
        }
        disabled={!url}
        block
        className={styles.arrow}
      ></Button>
    </a>
  </Link>
);

const Arrows = ({
  layout,
  product,
  floating,
  children,
  className,
}: {
  layout: Layout;
  product?: Entry<IUniqueProductFields>;
  floating?: boolean;
  children?: JSX.Element;
  className?: string;
}) => {
  if (!product) {
    return children || null;
  }
  const getProductSlug = getProductSlugFactory({ layout });
  const productIndex = layout.products.findIndex(
    (p) => product.sys.id === p.sys.id
  );
  const previousProduct =
    layout.products[(productIndex || layout.products.length) - 1];
  const nextProduct =
    layout.products[(productIndex + 1) % layout.products.length];

  return (
    <>
      <div className={(floating && styles.arrowLeft) || className}>
        <div className={floating ? styles.arrowFloater : styles.arrowSpacing}>
          <Arrow url={getProductSlug(previousProduct)} direction="left" />
        </div>
      </div>
      {children}
      <div className={(floating && styles.arrowRight) || className}>
        <div className={floating ? styles.arrowFloater : styles.arrowSpacing}>
          <Arrow url={getProductSlug(nextProduct)} direction="right" />
        </div>
      </div>
    </>
  );
};

export default Arrows;
