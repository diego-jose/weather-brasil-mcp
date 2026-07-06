/**
 * Sistema de cache simples em memória para dados meteorológicos
 */

interface CacheEntry<T> {
  dados: T;
  timestamp: number;
  ttl: number; // Time to live em ms
}

export class Cache {
  private armazenamento = new Map<string, CacheEntry<any>>();
  private ttlPadrao: number; // em ms

  constructor(ttlPadraoSegundos: number = 3600) {
    this.ttlPadrao = ttlPadraoSegundos * 1000;
  }

  /**
   * Obtém um valor do cache
   */
  obter<T>(chave: string): T | null {
    const entry = this.armazenamento.get(chave);

    if (!entry) {
      return null;
    }

    // Verificar se expirou
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.armazenamento.delete(chave);
      return null;
    }

    return entry.dados as T;
  }

  /**
   * Armazena um valor no cache
   */
  armazenar<T>(chave: string, dados: T, ttlSegundos?: number): void {
    const ttl = (ttlSegundos || this.ttlPadrao / 1000) * 1000;

    this.armazenamento.set(chave, {
      dados,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * Remove um valor do cache
   */
  remover(chave: string): boolean {
    return this.armazenamento.delete(chave);
  }

  /**
   * Limpa todo o cache
   */
  limpar(): void {
    this.armazenamento.clear();
  }

  /**
   * Obtém informações sobre o cache
   */
  obterInfo(): { tamanho: number; chaves: string[] } {
    return {
      tamanho: this.armazenamento.size,
      chaves: Array.from(this.armazenamento.keys())
    };
  }

  /**
   * Limpa entradas expiradas
   */
  limparExpirados(): number {
    let removidos = 0;
    const agora = Date.now();

    for (const [chave, entry] of this.armazenamento.entries()) {
      if (agora - entry.timestamp > entry.ttl) {
        this.armazenamento.delete(chave);
        removidos++;
      }
    }

    return removidos;
  }

  /**
   * Executa limpeza periódica
   */
  iniciarLimpezaPeriodica(intervaloMs: number = 300000): NodeJS.Timer {
    return setInterval(() => {
      const removidos = this.limparExpirados();
      if (removidos > 0) {
        console.log(`[Cache] ${removidos} entradas expiradas removidas`);
      }
    }, intervaloMs);
  }

  /**
   * Gerador de chave de cache
   */
  static gerarChave(...partes: (string | number)[]): string {
    return partes.join(':').toLowerCase();
  }
}

// Instância global do cache
export const cacheGlobal = new Cache(3600); // 1 hora de TTL padrão
