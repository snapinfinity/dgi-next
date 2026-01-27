import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

// ============================================
// Generic Firestore Operations
// ============================================

/**
 * Get a single document by ID
 */
export async function getDocument(collectionName, docId) {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

/**
 * Get all documents from a collection
 */
export async function getCollection(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/**
 * Add a new document to a collection
 */
export async function addDocument(collectionName, data) {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: new Date(),
  });
  return docRef.id;
}

/**
 * Update a document
 */
export async function updateDocument(collectionName, docId, data) {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date(),
  });
}

/**
 * Delete a document
 */
export async function deleteDocument(collectionName, docId) {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

/**
 * Query documents with filters
 */
export async function queryDocuments(collectionName, filters = [], sortBy = null, limitCount = null) {
  let q = collection(db, collectionName);
  
  // Build query with filters
  const constraints = [];
  
  filters.forEach(({ field, operator, value }) => {
    constraints.push(where(field, operator, value));
  });
  
  if (sortBy) {
    constraints.push(orderBy(sortBy.field, sortBy.direction || "asc"));
  }
  
  if (limitCount) {
    constraints.push(limit(limitCount));
  }
  
  q = query(q, ...constraints);
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/**
 * Subscribe to real-time updates on a collection
 */
export function subscribeToCollection(collectionName, callback) {
  const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(docs);
  });
  
  return unsubscribe;
}

/**
 * Subscribe to real-time updates on a single document
 */
export function subscribeToDocument(collectionName, docId, callback) {
  const docRef = doc(db, collectionName, docId);
  const unsubscribe = onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      callback({ id: snapshot.id, ...snapshot.data() });
    } else {
      callback(null);
    }
  });
  
  return unsubscribe;
}

// ============================================
// Enquiry Submission (Contact Form)
// ============================================

export async function submitEnquiry(formData) {
  return addDocument("enquiry", {
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    subject: formData.subject,
    message: formData.message,
    status: "new",
  });
}

// ============================================
// Example: Newsletter Subscription
// ============================================

export async function subscribeToNewsletter(email) {
  // Check if email already exists
  const existing = await queryDocuments("newsletter_subscribers", [
    { field: "email", operator: "==", value: email },
  ]);
  
  if (existing.length > 0) {
    throw new Error("Email already subscribed");
  }
  
  return addDocument("newsletter_subscribers", {
    email,
    subscribedAt: new Date(),
  });
}

export async function submitSubscriptionForm(formData) {
  // Check if email already exists
  const existing = await queryDocuments("newsletter_subscribers", [
    { field: "email", operator: "==", value: formData.email },
  ]);
  
  if (existing.length > 0) {
    throw new Error("Email already subscribed");
  }
  
  return addDocument("newsletter_subscribers", {
    ...formData,
    subscribedAt: new Date(),
    status: "active",
  });
}
