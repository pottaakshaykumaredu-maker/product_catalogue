/**
 * Academic Reference: TypeScript Strong Typing & Classes (Week 11)
 * Course: Web Technologies Laboratory (CO5)
 */

export interface ICatalogueEntity {
  id: number;
  name: string;
  price: number;
  isAvailable(): boolean;
}

export class CatalogueItem implements ICatalogueEntity {
  constructor(
    public readonly id: number,
    public name: string,
    public price: number,
    private stockCount: number
  ) {}

  public isAvailable(): boolean {
    return this.stockCount > 0;
  }

  public calculateTax(rate: number = 0.08): number {
    return this.price * rate;
  }
}
