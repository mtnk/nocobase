import { BaseFieldOptions, Field } from '@nocobase/database';
import { DataTypes } from 'sequelize';
import { evaluate } from '../utils/evaluate';

export class ExcelFormulaField extends Field {
  get dataType() {
    const { dataType } = this.options;
    return dataType === 'string' ? DataTypes.STRING : DataTypes.DOUBLE;
  }

  calculate(expression, scope) {
    try {
      return evaluate(expression, scope);
    } catch {}
    return null;
  }

  initFieldData = async ({ transaction }) => {
    const { expression, name } = this.options;

    const records = await this.collection.repository.find({
      order: [this.collection.model.primaryKeyAttribute],
      transaction,
    });

    for (const record of records) {
      const scope = record.toJSON();
      const result = this.calculate(expression, scope);
      if (result) {
        await record.update(
          {
            [name]: result,
          },
          {
            transaction,
            silent: true,
            hooks: false,
          },
        );
      }
    }
  };

  calculateField = async (instance) => {
    const { expression, name } = this.options;
    const scope = instance.toJSON();
    const result = this.calculate(expression, scope);
    if (result) {
      instance.set(name, result);
    }
  };

  updateFieldData = async (instance, { transaction }) => {
    if (this.collection.name === instance.collectionName && instance.name === this.options.name) {
      this.options = Object.assign(this.options, instance.options);
      const { name, expression } = this.options;

      const records = await this.collection.repository.find({
        order: [this.collection.model.primaryKeyAttribute],
        transaction,
      });

      for (const record of records) {
        const scope = record.toJSON();
        const result = this.calculate(expression, scope);
        await record.update(
          {
            [name]: result,
          },
          {
            transaction,
            silent: true,
            hooks: false,
          },
        );
      }
    }
  };

  bind() {
    super.bind();
    this.on('afterSync', this.initFieldData);
    // TODO: should not depends on fields table (which is defined by other plugin)
    this.database.on('fields.afterUpdate', this.updateFieldData);
    this.on('beforeSave', this.calculateField);
  }

  unbind() {
    super.unbind();
    this.off('beforeSave', this.calculateField);
    // TODO: should not depends on fields table
    this.database.off('fields.afterUpdate', this.updateFieldData);
    this.off('afterSync', this.initFieldData);
  }

  toSequelize() {
    const opts = super.toSequelize();
    delete opts.dataType;
    return opts;
  }
}

export interface ExcelFormulaFieldOptions extends BaseFieldOptions {
  type: 'excelFormula';
  dataType?: 'number' | 'string';
  expression: string;
}
