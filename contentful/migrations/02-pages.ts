import { MigrationFunction } from 'contentful-migration';

module.exports = function(migration) {
  const navBar = migration
    .createContentType('navBar')
    .name('NavBar')
    .description('');

  navBar
    .createField('links')
    .name('Links')
    .type('Array')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: 'Link',
      validations: [],
      linkType: 'Entry',
    });

  navBar.changeFieldControl('links', 'builtin', 'entryLinksEditor', {});
  const page = migration
    .createContentType('page')
    .name('Page')
    .description('')
    .displayField('title');
  page
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  page
    .createField('slug')
    .name('slug')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .disabled(false)
    .omitted(false);

  page
    .createField('content')
    .name('Content')
    .type('RichText')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  page
    .createField('tag')
    .name('tag')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  page.changeFieldControl('title', 'builtin', 'singleLine', {});
  page.changeFieldControl('slug', 'builtin', 'singleLine', {});
  page.changeFieldControl('content', 'builtin', 'richTextEditor', {});
  page.changeFieldControl('tag', 'builtin', 'singleLine', {});
} as MigrationFunction;
