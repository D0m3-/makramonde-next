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
import contentfulImageLoader from '../util/contentfulImageLoader';
import { formatPrice } from '../util/price';
import styles from './Product.module.less';

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
            loader={contentfulImageLoader}
            className={styles.imageModal}
          />
        )}
      </Modal>
    </div>
  );
};

const getImageDimensions = (image?: Asset) => {
  if (!image || !image.fields.file.details.image) {
    return { width: 100, height: 100 };
  }
  const {
    width: imageWidth,
    height: imageHeight,
  } = image.fields.file.details.image;
  const width = Math.min(imageWidth, 2048);
  const height = (imageHeight / imageWidth) * width;
  return { width, height };
};

export default Product;
