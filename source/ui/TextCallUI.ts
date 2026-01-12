import { ICallController } from "../funcionalidade/iCallController";
import { ICallUI } from "./iCallUI";

/**
 * Interface de usuário textual (prompt/alert) para interação com o sistema de chamados.
 * Permite abrir chamados, listar e marcar como concluídos via menu simples.
 */
export class TextCallUI implements ICallUI{
    
    callController : ICallController;

    /**
     * Inicializa a UI com um controlador de chamados.
     * @param callController instância responsável pelas regras de negócio
     */
    constructor(callController:ICallController){
        this.callController = callController;
    }

    /**
     * Inicia o loop de interação com o usuário via prompt.
     * Opções: 1) Cadastrar, 2) Listar, 3) Marcar como concluído, 0) Sair.
     * Observação: As opções de listagem e marcação podem ser expandidas pelos alunos.
     */
    start(): void {
        let op = 1;
        while(op!=0){
            op = Number(prompt('=== SISTEMA DE CHAMADOS ===\n\nEscolha uma opção:\n1 - Cadastrar\n2 - Listar\n3 - Marcar como concluido\n0 - Sair'));
            switch(op){
                case 1:
                    let nome : string = prompt('Digite seu nome')!;
                    let descricao : string = prompt('Digite a descrição do problema')!;
                    let deuCerto : boolean = this.callController.abrirChamado(nome,descricao);
                    if(deuCerto){
                        alert('Chamado cadastrado');
                    }else{
                        alert('Não foi possível cadastrar o chamado');
                    }
                    break;
                case 2:
                    let chamadosListar = this.callController.listarChamado();
                    if (chamadosListar.length === 0) {
                        alert("Nenhum chamado cadastrado.");
                    } else {
                        let mensagemListagem = "----- LISTA DE CHAMADOS -----\n";
                        chamadosListar.forEach((chamado, index) => {
                            let statusTexto = chamado.status ? "ATENDIDO" : "PENDENTE";
                            mensagemListagem += `${index} - [${statusTexto}] ${chamado.solicitante}: ${chamado.descricao}\n`;
                        });
                        alert(mensagemListagem);
                    }
                    break;
                case 3:
                    let chamadosParaAtender = this.callController.listarChamado();
                    if (chamadosParaAtender.length === 0) {
                        alert("Nenhum chamado para atender.");
                    } else {
                        let mensagemEscolha = "----- ESCOLHA O CHAMADO PARA ATENDER -----\n";
                        chamadosParaAtender.forEach((chamado, index) => {
                            let statusTexto = chamado.status ? "ATENDIDO" : "PENDENTE";
                            mensagemEscolha += `${index} - [${statusTexto}] ${chamado.solicitante}: ${chamado.descricao}\n`;
                        });
                        mensagemEscolha += "\nDigite o número do chamado a ser atendido:";
                        
                        let indiceStr = prompt(mensagemEscolha);
                        let indice = Number(indiceStr);

                        if (!isNaN(indice) && indice >= 0 && indice < chamadosParaAtender.length) {
                            let chamadoSelecionado = chamadosParaAtender[indice];
                            if (chamadoSelecionado.status) {
                                alert("Este chamado já foi atendido anteriormente.");
                            } else {
                                let sucesso = this.callController.marcarComoAtendido(chamadoSelecionado);
                                if (sucesso) {
                                    alert("Chamado marcado como atendido com sucesso!");
                                } else {
                                    alert("Erro ao atualizar o chamado.");
                                }
                            }
                        } else {
                            alert("Índice inválido.");
                        }
                    }
                    break;
                case 0:
                    break;
                default:
                    alert('Opcao Inválida');
            }
        }
    }

}
