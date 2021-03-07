import { Entry } from 'contentful';
import {
  INavBarFields,
  IUniqueProductFields,
} from '../../../@types/generated/contentful';

type Layout = {
  navBar: Entry<INavBarFields>;
  products: Entry<IUniqueProductFields>[];
};

export default Layout;
