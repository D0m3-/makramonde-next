import { MigrationFunction } from 'contentful-migration';
import slugify from 'slugify';

module.exports = function(migration) {
  migration.transformEntries({
    contentType: 'uniqueProduct',
    from: ['title', 'slug'],
    to: ['slug'],
    transformEntryForLocale: (fields, locale) => {
      if (fields.slug?.[locale] || !fields.title?.[locale]) {
        return;
      }
      return {
        slug: slugify(fields.title[locale]),
      };
    },
  });
} as MigrationFunction;
