import { DiagnosticoMedico, Estigma } from "@fullstack-angular-nest/nueva-consulta/data-access";

/**
 * Interface for the 'Consultas' data
 */
export interface ConsultasEntity {
  id: string | number; // Primary ID
  name: string;
}


export interface EstigmaPerc {
  estigma: Estigma,
  percentage: number,
  diagnosticos: DiagnosticoMedico[]
}