interface IModel {
  [key: string]: unknown;
}

export interface IFormSubmitConfig {
  params?: {
    [key: string]: unknown;
  }
}

export interface IErrorsFields {
  [key: string]: { errors: string[] };
}

export class ValidationResult {
  private fields: IErrorsFields | null = null;

  public setFields (fields: IErrorsFields | null) {
    this.fields = fields;
  }

  public hasErrorField (fieldName: string) {
    if (
      this.fields &&
      this.fields[fieldName] &&
      this.fields[fieldName].errors.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  public getFieldErrors (field: string, onePerField?: boolean): Array<string> {
    if (
      this.fields &&
      this.fields[field] &&
      this.fields[field].errors.length > 0
    ) {
      if (onePerField) {
        return [this.fields[field].errors[0]];
      } else {
        return this.fields[field].errors;
      }
    } else {
      return [];
    }
  }
}

export default abstract class Form <SubmitResType> {
  public statusText = '';
  public errorText = '';

  protected busy = false;

  public abstract model: IModel;
  protected abstract submitAction(config?: IFormSubmitConfig): SubmitResType;
  protected validationResult = new ValidationResult();

  public hasErrorField (field: string): boolean {
    return this.validationResult.hasErrorField(field);
  }

  public getFieldErrors (field: string, onePerField?: boolean): Array<string> {
    return this.validationResult.getFieldErrors(field, onePerField);
  }

  public setFields (fields: IErrorsFields) {
    this.validationResult.setFields(fields);
  }

  public async submit (config?: IFormSubmitConfig) {
    if (!config) {
      config = <IFormSubmitConfig>{};
    }

    try {
      this.statusText = '';
      this.errorText = '';
      this.busy = true;
      const response = await this.submitAction(config);
      this.busy = false;
      return response;
    } catch (error) {
      this.busy = false;
      this.validationResult.setFields(error.response.data.fields);
      throw error;
    }
  }

  public clearErrors () {
    this.errorText = '';
    this.validationResult.setFields(null);
  }

  public setModel (model: any) {
    this.model = model;
  }
}
