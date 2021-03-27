import { PlusCircleOutlined, ShoppingOutlined } from '@ant-design/icons';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Asset, Entry } from 'contentful';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { IUniqueProductFields } from '../../@types/generated/contentful';
import { checkout } from '../api/stripe';
import { CartContext } from '../cart/CartContext';
import { THEME_VARIABLES } from '../util/configConstants';
import { IMAGE_SIZES } from '../util/constants';
import contentfulImageLoader from '../util/contentfulImageLoader';
import { getImageDimensions } from '../util/image';
import { formatPrice } from '../util/price';
import styles from './Product.module.less';

const FULLSCREEN_IMAGE_SIZES = `(min-width: ${
  process.env.THEME_VARIABLES?.[THEME_VARIABLES.SCREEN_MD]
}) 80vw, 100vw`;

const Product = ({ product }: { product: Entry<IUniqueProductFields> }) => {
  const [image, setImage] = useState<Asset>();
  const [loading, setLoading] = useState(false);

  const { width, height } = getImageDimensions(image);

  const { addItem } = useContext(CartContext);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {documentToReactComponents(product.fields.description)}
        <p>
          <strong>Prix :</strong>
          <span className={styles.marginLeft}>
            {formatPrice(product.fields.price, 'EUR')}
          </span>
        </p>
        <p className={styles.buttons}>
          <Button
            type="default"
            icon={<PlusCircleOutlined />}
            onClick={() => addItem(product)}
          >
            panier
          </Button>
          <Button
            className={styles.marginLeft}
            type="primary"
            loading={loading}
            icon={<ShoppingOutlined />}
            onClick={async () => {
              setLoading(true);
              await checkout([product]);
              setLoading(false);
            }}
          >
            acheter
          </Button>
        </p>
        <div className={styles.images}>
          {product.fields.images?.map((image) => {
            const { width, height } = getImageDimensions(image);
            return (
              <div key={image.sys.id} onClick={() => setImage(image)}>
                <Image
                  src={image.fields.file.url}
                  width={width}
                  height={height}
                  layout="responsive"
                  sizes={IMAGE_SIZES}
                  alt={`${image.fields.description}`}
                  loader={contentfulImageLoader}
                  className={styles.image}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        className={styles.modal}
        visible={!!image}
        onCancel={() => setImage(undefined)}
        footer={null}
        width="100%"
      >
        {image && (
          <Image
            src={image.fields.file.url}
            alt={`${image.fields.description} - Plein écran`}
            width={image.fields.file.details.image?.width || 100}
            height={image.fields.file.details.image?.height || 100}
            layout="responsive"
            sizes={FULLSCREEN_IMAGE_SIZES}
            quality={90}
            loader={contentfulImageLoader}
            className={styles.imageModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default Product;
