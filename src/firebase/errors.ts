export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  __proto__ = Error;
  private context: SecurityRuleContext;
  public name = 'FirestorePermissionError';

  constructor(context: SecurityRuleContext) {
    const message = `Firestore Permission Denied: ${context.operation} on ${context.path}`;
    super(message);
    this.context = context;
    Object.setPrototypeOf(this, FirestorePermissionError.prototype);
  }

  public toMetric() {
    return {
      message: this.message,
      ...this.context,
    };
  }
}
