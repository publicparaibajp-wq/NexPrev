export enum UserRole {
  SOCIO = 'SOCIO',
  ADVOGADO = 'ADVOGADO',
  ASSISTENTE = 'ASSISTENTE',
  FINANCEIRO = 'FINANCEIRO',
  ADMINISTRATIVO = 'ADMINISTRATIVO'
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface Role {
  id: string;
  name: UserRole;
  permissions: string[]; // Array of permission IDs
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  tenantId: string;
  is2FAEnabled: boolean;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
  ip: string;
}

export const PERMISSIONS = {
  FINANCIAL_VIEW_ALL: 'financial:view_all',
  FINANCIAL_VIEW_STRATEGIC: 'financial:view_strategic',
  FINANCIAL_EDIT: 'financial:edit',
  FINANCIAL_EXPORT: 'financial:export',
  FINANCIAL_VIEW_OWN: 'financial:view_own',
  PROCESS_VIEW_ALL: 'process:view_all',
  CLIENT_VIEW_ALL: 'client:view_all',
  AUDIT_VIEW: 'audit:view',
  USER_MANAGE: 'user:manage',
  SETTINGS_EDIT: 'settings:edit'
};
