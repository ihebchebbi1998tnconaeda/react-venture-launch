interface SizeQuantities {
  '3xl_size': string;
  's_size': string;
  'm_size': string;
  'l_size': string;
  'xl_size': string;
  'xxl_size': string;
  '48_size': string;
  '50_size': string;
  '52_size': string;
  '54_size': string;
  '56_size': string;
  '58_size': string;
}

interface StockReduceItem {
  id_product: string;
  quantities: SizeQuantities;
}

class StockReduceManager {
  private static instance: StockReduceManager;
  private stockItems: Map<string, StockReduceItem>;

  private constructor() {
    this.stockItems = new Map();
  }

  public static getInstance(): StockReduceManager {
    if (!StockReduceManager.instance) {
      StockReduceManager.instance = new StockReduceManager();
    }
    return StockReduceManager.instance;
  }

  private getEmptySizeQuantities(): SizeQuantities {
    return {
      '3xl_size': '0',
      's_size': '0',
      'm_size': '0',
      'l_size': '0',
      'xl_size': '0',
      'xxl_size': '0',
      '48_size': '0',
      '50_size': '0',
      '52_size': '0',
      '54_size': '0',
      '56_size': '0',
      '58_size': '0'
    };
  }

  public addItem(productId: string, size: string, quantity: number): void {
    const existingItem = this.stockItems.get(productId) || {
      id_product: productId,
      quantities: this.getEmptySizeQuantities()
    };

    const sizeKey = `${size.toLowerCase()}_size` as keyof SizeQuantities;
    if (sizeKey in existingItem.quantities) {
      const currentQty = parseInt(existingItem.quantities[sizeKey] || '0');
      existingItem.quantities[sizeKey] = (currentQty + quantity).toString();
    }

    this.stockItems.set(productId, existingItem);
  }

  public clearItems(): void {
    this.stockItems.clear();
  }

  public getStockItems(): StockReduceItem[] {
    return Array.from(this.stockItems.values());
  }

  public async sendStockUpdate(): Promise<void> {
    const items = this.getStockItems();
    if (items.length === 0) {
      return;
    }

    try {
      const response = await fetch('https://www.fioriforyou.com/backfiori/reduicestock.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(items),
      });

      if (!response.ok) {
        throw new Error(`Stock update failed: ${response.statusText}`);
      }

      const result = await response.text();
      this.clearItems();
    } catch (error) {
      throw error;
    }
  }
}

export const stockReduceManager = StockReduceManager.getInstance();