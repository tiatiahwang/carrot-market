import type { NextPage } from 'next';
import Button from '@/components/button';
import Input from '@/components/input';
import Layout from '@/components/layout';
import TextArea from '@/components/textarea';
import { useForm } from 'react-hook-form';
import useMutation from '@/libs/client/useMutation';
import { Stream } from '@prisma/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface createForm {
  name: string;
  price: string;
  description: string;
}

interface CreateResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<createForm>();
  const [createLive, { loading, data }] =
    useMutation<CreateResponse>('/api/streams');

  const onValid = (validForm: createForm) => {
    if (loading) return;
    createLive(validForm);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title='Go Live'>
      <form onSubmit={handleSubmit(onValid)} className=' space-y-4 px-4 py-10'>
        <Input
          register={register('name', { required: true })}
          required
          label='Name'
          name='name'
          type='text'
        />
        <Input
          register={register('price', { required: true, valueAsNumber: true })}
          required
          label='Price'
          name='price'
          type='text'
          kind='price'
        />
        <TextArea
          register={register('description', { required: true })}
          name='description'
          label='Description'
        />
        <Button text={loading ? 'Loading..' : 'Go live'} />
      </form>
    </Layout>
  );
};

export default Create;
