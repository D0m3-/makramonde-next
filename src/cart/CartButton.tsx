import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Spin } from 'antd';
import cx from 'classnames';
import React, { useContext, useState } from 'react';
import styles from './CartButton.module.less';
import { CartContext } from './CartContext';

const CartButton = () => {
  const [loading, setLoading] = useState(false);
  const { items, empty } = useContext(CartContext);
  return (
    <>
      {!loading && (
        <Badge count={items.length}>
          <ShoppingCartOutlined
            className={styles.cart}
            onClick={
              items.length
                ? async () => {
                    setLoading(true);
                    //await checkout(items);
                    setLoading(false);
                  }
                : undefined
            }
            type="shopping-cart"
          />
        </Badge>
      )}

      {loading && <Spin />}

      <DeleteOutlined
        className={cx(styles.delete, {
          [styles.hide]: !items.length,
        })}
        onClick={empty}
        type="delete"
      />
    </>
  );
};

export default CartButton;
