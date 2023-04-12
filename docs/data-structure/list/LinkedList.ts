export interface LinkedNode<T> {
  next?: LinkedNode<T>;
  val: T;
}
