export interface ActionResult<TModel> {
  actionResult: TModel;
  validationResult: ValidationResult;
}

export interface ValidationResult {
  isValid: boolean;
  validationErrors: string[];
}
