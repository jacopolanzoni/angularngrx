import { InMemoryDbService } from 'angular-in-memory-web-api';

export class ProductData implements InMemoryDbService {

    public createDb() {
      return {
        products: [{
          description: 'Leaf rake with 48-inch wooden handle',
          id: 1,
          productCode: 'GDN-0011',
          productName: 'Leaf Rake',
          starRating: 3.2,
        }, {
          description: '15 gallon capacity rolling garden cart',
          id: 2,
          productCode: 'GDN-0023',
          productName: 'Garden Cart',
          starRating: 4.2,
        }, {
          description: 'Curved claw steel hammer',
          id: 5,
          productCode: 'TBX-0048',
          productName: 'Hammer',
          starRating: 4.8,
        }, {
          description: '15-inch steel blade hand saw',
          id: 8,
          productCode: 'TBX-0022',
          productName: 'Saw',
          starRating: 3.7,
        }, {
          description: 'Standard two-button video game controller',
          id: 10,
          productCode: 'GMG-0042',
          productName: 'Video Game Controller',
          starRating: 4.6,
        }],
      };
    }
}
