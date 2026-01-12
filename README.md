# Sistema de Chamados — Módulo 02 ADS

## Visão Geral
- Projeto didático para gerenciamento simples de chamados (abrir, listar, marcar como atendido).
- Estrutura em camadas: Modelo (entidades), Funcionalidade (regras de negócio), UI (interface com usuário).
- Objetivo: reforçar conceitos de interfaces, separação de responsabilidades e implementação incremental.

## Alterações Realizadas (Implementação)
Este repositório contém a resolução da atividade proposta, onde foram implementados os seguintes componentes:

### 1. MemoryCallRepository (Camada de Modelo)
- Implementação completa da classe `MemoryCallRepository`.
- Criação de coleção interna (`private chamados: Array<Chamado>`) para persistência em memória.
- Implementação dos métodos:
  - `criarNovoChamado`: Adiciona novos chamados ao array.
  - `atualizarChamado`: Valida a existência do chamado na lista.
  - `listarChamados`: Retorna a lista completa de chamados.

### 2. TextCallUI (Camada de UI)
- Implementação das opções pendentes no menu:
  - **Opção 2 (Listar)**: Exibe todos os chamados cadastrados (Pendentes e Atendidos) utilizando `alert()`, conforme cenário de sistema textual.
  - **Opção 3 (Marcar como concluído)**: Permite ao usuário selecionar um chamado pelo índice para marcá-lo como atendido.
- **Melhorias de Interface**:
  - Adição de título "=== SISTEMA DE CHAMADOS ===" ao menu principal.
  - Ajuste na formatação das quebras de linha (`\n`) para correta exibição no `prompt`.
  - Refatoração para garantir que todas as interações (entradas e saídas) ocorram estritamente via `prompt` e `alert`, simulando fielmente o ambiente proposto sem necessidade de console do navegador.

### 3. Bootstrap
- Atualização do `index.ts` para invocar o método `ui.start()`, garantindo a execução imediata do sistema ao iniciar.

---

## Arquitetura Original
- **Modelo**: entidades e contratos de persistência
  - [Chamado](source/modelo/chamado.ts): representa um registro de suporte com `status`, `solicitante` e `descricao`.
  - [ICallRepository](source/modelo/iCallRepository.ts): contrato de persistência para `Chamado` (criar, atualizar, listar).
  - [MemoryCallRepository](source/modelo/memoryCallRepository.ts): repositório em memória.
- **Funcionalidade**: regras de negócio
  - [ICallController](source/funcionalidade/iCallController.ts): contrato do controlador (abrir, listar, marcar como atendido).
  - [CallController](source/funcionalidade/callController.ts): implementação que orquestra operações com o repositório.
- **UI**: interação com o usuário
  - [ICallUI](source/ui/iCallUI.ts): contrato para UIs do sistema.
  - [TextCallUI](source/ui/TextCallUI.ts): interface textual via `prompt/alert`.
- **Bootstrap**
  - [index.ts](source/index.ts): instancia repositório, controlador e UI.

## Métodos e Contratos
- Repositório:
  - `criarNovoChamado(chamado: Chamado): boolean`
  - `atualizarChamado(chamado: Chamado): boolean`
  - `listarChamados(): Array<Chamado>`
- Controlador:
  - `abrirChamado(nome: string, descricao: string): boolean`
  - `listarChamado(): Array<Chamado>`
  - `marcarComoAtendido(chamado: Chamado): boolean`
- UI:
  - `start(): void`

## Como Executar
- Pré-requisitos:
  - Node.js (>= 18)
- Instalação e Execução:
  ```bash
  npm install
  npm start
  ```
  O sistema será aberto no navegador padrão. Utilize os pop-ups (prompt/alert) para interagir.
