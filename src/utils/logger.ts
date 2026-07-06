/**
 * Sistema simples de logging
 */

export enum NivelLog {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

export class Logger {
  private nivelMinimo: NivelLog;

  constructor(nivelMinimo: NivelLog = NivelLog.INFO) {
    this.nivelMinimo = nivelMinimo;
  }

  private deveFazerLog(nivel: NivelLog): boolean {
    const ordem = [NivelLog.DEBUG, NivelLog.INFO, NivelLog.WARN, NivelLog.ERROR];
    return ordem.indexOf(nivel) >= ordem.indexOf(this.nivelMinimo);
  }

  private formatarMensagem(nivel: NivelLog, mensagem: string): string {
    const agora = new Date().toISOString();
    return `[${agora}] [${nivel}] ${mensagem}`;
  }

  debug(mensagem: string, dados?: any): void {
    if (this.deveFazerLog(NivelLog.DEBUG)) {
      console.log(this.formatarMensagem(NivelLog.DEBUG, mensagem), dados || '');
    }
  }

  info(mensagem: string, dados?: any): void {
    if (this.deveFazerLog(NivelLog.INFO)) {
      console.log(this.formatarMensagem(NivelLog.INFO, mensagem), dados || '');
    }
  }

  warn(mensagem: string, dados?: any): void {
    if (this.deveFazerLog(NivelLog.WARN)) {
      console.warn(this.formatarMensagem(NivelLog.WARN, mensagem), dados || '');
    }
  }

  error(mensagem: string, erro?: Error | any): void {
    if (this.deveFazerLog(NivelLog.ERROR)) {
      console.error(this.formatarMensagem(NivelLog.ERROR, mensagem));
      if (erro) {
        console.error(erro);
      }
    }
  }

  setNivelMinimo(nivel: NivelLog): void {
    this.nivelMinimo = nivel;
  }
}

// Instância global
export const logger = new Logger(NivelLog.INFO);
