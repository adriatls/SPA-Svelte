export class StructureError extends Error {
    constructor(mensage: string) {
      super(mensage);
      this.name = 'MeuErro';
    }
}