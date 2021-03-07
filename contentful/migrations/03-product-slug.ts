import { MigrationFunction } from 'contentful-migration';

module.exports = function(migration) {
  const uniqueProduct = migration.editContentType('uniqueProduct');

  uniqueProduct
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .required(true)
    .validations([{ unique: true }]);

  uniqueProduct.changeFieldControl('slug', 'builtin', 'slugEditor', {});
} as MigrationFunction;
