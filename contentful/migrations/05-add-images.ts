import { MigrationFunction } from 'contentful-migration';

module.exports = function(migration) {
  const page = migration.editContentType('page');

  page
    .createField('assets')
    .name('Assets')
    .type('Array')
    .items({
      type: 'Link',
      linkType: 'Asset',
    });

  const navbar = migration.editContentType('navBar');
  navbar
    .createField('title')
    .name('title')
    .type('Symbol');

  navbar.moveField('title').toTheTop();
  navbar.displayField('title');

  navbar
    .createField('logo')
    .name('Logo')
    .type('Link')
    .linkType('Asset');
  navbar.moveField('logo').afterField('title');
} as MigrationFunction;
