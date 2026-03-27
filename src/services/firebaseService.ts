import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  getDocFromServer
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Product, Order, OperationType, FirestoreErrorInfo } from '../types';

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const firebaseService = {
  async getProducts(): Promise<Product[]> {
    const path = 'products';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    const path = `products/${id}`;
    try {
      const docRef = doc(db, 'products', id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as Product;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  },

  async createOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<string> {
    const path = 'orders';
    try {
      const newOrder: Omit<Order, 'id'> = {
        ...order,
        status: 'pending',
        createdAt: Timestamp.now(),
      };
      const docRef = await addDoc(collection(db, path), newOrder);
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      return '';
    }
  },

  async testConnection() {
    try {
      await getDocFromServer(doc(db, 'test', 'connection'));
    } catch (error) {
      if(error instanceof Error && error.message.includes('the client is offline')) {
        console.error("Please check your Firebase configuration.");
      }
    }
  },

  async seedProducts(products: Product[]) {
    const existing = await this.getProducts();
    if (existing.length === 0) {
      for (const p of products) {
        await addDoc(collection(db, 'products'), {
          ...p,
          createdAt: Timestamp.now()
        });
      }
    }
  }
};
