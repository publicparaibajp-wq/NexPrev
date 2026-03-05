# Arquitetura Técnica NexPrev

## 1. Stack Tecnológica
- **Frontend**: React 19 + Vite + Tailwind CSS 4.
- **Backend**: Node.js (Express) + TypeScript.
- **Banco de Dados**: PostgreSQL (Multi-tenant via RLS - Row Level Security).
- **Real-time**: WebSockets para Chat e Notificações.
- **IA**: Google Gemini 1.5 Pro (Processamento de CNIS e Simulações).
- **Infra**: AWS/GCP com Kubernetes para auto-scaling.
- **Pagamentos**: Iugu API (especialista em recorrência e split de honorários).

## 2. Estratégia Multi-tenant
Utilizamos a estratégia de **Shared Database, Isolated Schema (ou Column-based)**.
- Cada tabela possui uma coluna `tenant_id`.
- Middleware no Express injeta o `tenant_id` baseado no subdomínio ou header da requisição.
- No banco de dados, políticas de RLS garantem que um escritório nunca acesse dados de outro.

## 3. Modelagem de Dados (Principais Tabelas)

### Tenants (Escritórios)
- `id`: UUID
- `name`: String
- `subdomain`: String (ex: silva-advogados.nexprev.com)
- `plan`: Enum (Basic, Pro, Enterprise)
- `settings`: JSONB

### Users (Colaboradores)
- `id`: UUID
- `tenant_id`: UUID (FK)
- `role`: Enum (Admin, Lawyer, Secretary)
- `name`, `email`, `password_hash`

### Clients
- `id`: UUID
- `tenant_id`: UUID (FK)
- `name`, `cpf`, `nit`, `birth_date`
- `social_security_history`: JSONB
- `documents`: JSONB (URLs de S3)

### Processes
- `id`: UUID
- `client_id`: UUID (FK)
- `tenant_id`: UUID (FK)
- `type`: Enum (Admin, Judicial)
- `benefit_type`: String
- `status`: String
- `value`: Decimal
- `success_probability`: Float

### Financial
- `id`: UUID
- `process_id`: UUID (FK)
- `tenant_id`: UUID (FK)
- `type`: Enum (Contractual, Success)
- `amount`: Decimal
- `due_date`: Date
- `status`: Enum (Pending, Paid, Overdue)

### Calendar_Events
- `id`: UUID
- `tenant_id`: UUID (FK)
- `user_id`: UUID (FK)
- `process_id`: UUID (FK, optional)
- `title`, `description`, `start_time`, `end_time`
- `critical_deadline`: Boolean

## 4. Escalabilidade (10.000+ Usuários)
- **Caching**: Redis para sessões e dados de dashboard frequentes.
- **Load Balancing**: Nginx/ALB distribuindo tráfego entre instâncias Node.js.
- **Database Read Replicas**: Distribuição de carga de leitura para dashboards.
- **Microservices (Futuro)**: Separação do módulo de IA e Processamento de Documentos em serviços independentes.

## 5. Inteligência Artificial
- **Treinamento**: Fine-tuning em base de dados de jurisprudência previdenciária e normas do INSS.
- **Segurança**: Dados anonimizados antes de serem enviados para a API da Gemini.
- **CNIS Parser**: OCR + Extração estruturada de vínculos e salários.
