import { MigrationFunction } from 'contentful-migration';

module.exports = function(migration) {
  const page = migration.editContentType('page');

  page.editField('tag').validations([
    {
      in: ['home', 'content', 'products', 'blog home', 'blog'],
    },
  ]);
  page.changeFieldControl('tag', 'builtin', 'dropdown');
} as MigrationFunction;
