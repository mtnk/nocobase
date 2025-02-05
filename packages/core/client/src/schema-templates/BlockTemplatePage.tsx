import { PageHeader as AntdPageHeader } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CollectionManagerProvider } from '../collection-manager';
import { SchemaComponent } from '../schema-component';
import { uiSchemaTemplatesCollection } from './collections/uiSchemaTemplates';
import { uiSchemaTemplatesSchema } from './schemas/uiSchemaTemplates';

export const BlockTemplatePage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <AntdPageHeader ghost={false} title={t('Block templates')} />
      <div style={{ margin: 'var(--nb-spacing)' }}>
        <CollectionManagerProvider collections={[uiSchemaTemplatesCollection]}>
          <SchemaComponent schema={uiSchemaTemplatesSchema} />
        </CollectionManagerProvider>
      </div>
    </div>
  );
};

export const BlockTemplatesPane = () => {
  return (
    <CollectionManagerProvider collections={[uiSchemaTemplatesCollection]}>
      <SchemaComponent schema={uiSchemaTemplatesSchema} />
    </CollectionManagerProvider>
  );
};
