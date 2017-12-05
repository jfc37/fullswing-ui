import { PassTemplateSummary } from '../state-models/pass-template';
export interface PassTemplateDto {
  description: string;
  passType: string;
  cost: number;
  weeksValidFor: number;
  classesValidFor: number;
  availableForPurchase: boolean;
  id: number;
}

export function dtoToPassTemplateSummary(dto: PassTemplateDto): PassTemplateSummary {
  return {
    id: dto.id,
    description: dto.description,
    cost: dto.cost,
  };
}
