import useSWR from 'swr';
import Item from './item';
import { ProductWithCount } from '@/pages';

interface ProductListProps {
  kind: 'favorites' | 'sales' | 'purchases';
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          id={record.product.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favorites}
        />
      ))}
    </>
  ) : null;
}
