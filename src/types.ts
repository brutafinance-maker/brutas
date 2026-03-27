export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  sizes: string[];
  stock: number;
  status?: 'available' | 'unavailable';
  featured?: boolean;
  createdAt?: any;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export interface Order {
  id?: string;
  customer: {
    name: string;
    phone: string;
    course?: string;
  };
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
  }[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'pix';
  createdAt: any;
}
