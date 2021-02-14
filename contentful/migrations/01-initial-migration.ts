import { MigrationFunction } from 'contentful-migration';

module.exports = function(migration) {
  const uniqueProduct = migration
    .createContentType('uniqueProduct')
    .name('UniqueProduct')
    .description('Unique product that customer can buy')
    .displayField('title');
  uniqueProduct
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  uniqueProduct
    .createField('description')
    .name('Description')
    .type('RichText')
    .localized(false)
    .required(true)
    .validations([
      {
        nodes: {},
      },
    ])
    .disabled(false)
    .omitted(false);

  uniqueProduct
    .createField('price')
    .name('Price')
    .type('Integer')
    .localized(false)
    .required(true)
    .validations([
      {
        range: {
          min: 1,
        },

        message: 'Price should be greater than 0',
      },
    ])
    .disabled(false)
    .omitted(false);

  uniqueProduct
    .createField('images')
    .name('Images')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkMimetypeGroup: ['image'],
          message: 'Only images are accepted',
        },
      ],

      linkType: 'Asset',
    });

  uniqueProduct
    .createField('categories')
    .name('Categories')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',

      validations: [
        {
          linkContentType: ['category'],
        },
      ],

      linkType: 'Entry',
    });

  uniqueProduct.changeFieldControl('title', 'builtin', 'singleLine', {});
  uniqueProduct.changeFieldControl(
    'description',
    'builtin',
    'richTextEditor',
    {}
  );

  uniqueProduct.changeFieldControl('price', 'builtin', 'numberEditor', {
    helpText: 'Price in euros',
  });

  uniqueProduct.changeFieldControl('images', 'builtin', 'assetGalleryEditor', {
    showLinkEntityAction: false,
    showCreateEntityAction: true,
  });

  uniqueProduct.changeFieldControl(
    'categories',
    'builtin',
    'entryLinksEditor',
    {}
  );
  const category = migration
    .createContentType('category')
    .name('Category')
    .description('')
    .displayField('name');
  category
    .createField('name')
    .name('name')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  category.changeFieldControl('name', 'builtin', 'singleLine', {});
} as MigrationFunction;
