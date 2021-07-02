import React from 'react';
import { uid } from '@formily/shared';
import {
  observer,
  ISchema,
  FormProvider,
  useFieldSchema,
  RecursionField,
  useField,
} from '@formily/react';
import { Input } from '../../input';
import { FormItem } from '../../form-item';
import { createDesignableSchemaField } from '../../DesignableSchemaField';
import { createForm } from '@formily/core';
import { Grid } from '../';

const schema: ISchema = {
  type: 'object',
  properties: {
    [uid()]: {
      type: 'void',
      'x-component': 'Grid',
      properties: {
        [`row_${uid()}`]: {
          type: 'void',
          'x-component': 'Grid.Row',
          properties: {
            [`col_${uid()}`]: {
              type: 'void',
              'x-component': 'Grid.Col',
              "x-component-props": {
                width: 30,
              },
              properties: {
                [`block_${uid()}`]: {
                  type: 'void',
                  'x-component': 'Grid.Block',
                  properties: {
                    [uid()]: {
                      type: 'string',
                      title: uid(),
                      'x-designable-bar': 'FormItem.DesignableBar',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                    },
                  },
                },
              },
            },
            [`col_${uid()}`]: {
              type: 'void',
              'x-component': 'Grid.Col',
              "x-component-props": {
                width: 70,
              },
              properties: {
                [`block_${uid()}`]: {
                  type: 'void',
                  'x-component': 'Grid.Block',
                  properties: {
                    [uid()]: {
                      type: 'string',
                      title: uid(),
                      'x-designable-bar': 'FormItem.DesignableBar',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                    },
                  },
                },
              },
            },
          },
        },
        [`row_${uid()}`]: {
          type: 'void',
          'x-component': 'Grid.Row',
          properties: {
            [`col_${uid()}`]: {
              type: 'void',
              'x-component': 'Grid.Col',
              properties: {
                [`block_${uid()}`]: {
                  type: 'void',
                  'x-component': 'Grid.Block',
                  properties: {
                    [uid()]: {
                      type: 'string',
                      title: uid(),
                      'x-designable-bar': 'FormItem.DesignableBar',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const DesignableSchemaField = createDesignableSchemaField({
  components: {
    Grid,
    Input,
    FormItem,
  },
});

const form = createForm();

export default () => {
  return (
    <FormProvider form={form}>
      <DesignableSchemaField schema={schema} />
    </FormProvider>
  );
};
