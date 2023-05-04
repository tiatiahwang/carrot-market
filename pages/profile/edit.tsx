import type { NextPage } from 'next';
import Button from '@/components/button';
import Input from '@/components/input';
import Layout from '@/components/layout';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useUser from '@/libs/client/useUser';
import useMutation from '@/libs/client/useMutation';
import { useRouter } from 'next/router';

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<EditProfileForm>();

  useEffect(() => {
    if (user?.email) setValue('email', user.email);
    if (user?.phone) setValue('phone', user.phone);
    if (user?.name) setValue('name', user.name);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/AjL7FiUUKL0mNbF_IibCSA/${user?.avatar}/avatar`,
      );
  }, [user, setValue]);

  const [editProfile, { loading, data }] =
    useMutation<EditProfileResponse>('/api/users/me');

  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === '' && phone === '' && name === '') {
      return setError('formErrors', {
        message: 'Email OR Phone number are required. You need to choose one.',
      });
    }
    if (avatar && avatar.length > 0 && user) {
      // 1. cloudflare에 URL 요청
      const { uploadURL } = await (await fetch('/api/files')).json();

      // 2. 그 URL에 파일 업로드
      const form = new FormData();
      form.append('file', avatar[0], user?.id + '');
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      console.log(id);
      // 3. 서버 전송
      editProfile({ email, phone, name, avatarId: id });
    } else {
      editProfile({ email, phone, name });
    }
  };

  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError('formErrors', { message: data.error });
    }
    if (data && data.ok) {
      router.push('/profile');
    }
  }, [data, router]);

  const onChange = () => {
    if (errors.formErrors?.message) {
      clearErrors('formErrors');
    }
  };

  const [avatarPreview, setAvatarPreview] = useState('');
  const avatar = watch('avatar');

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <Layout canGoBack title='Edit Profile'>
      <form
        onChange={onChange}
        onSubmit={handleSubmit(onValid)}
        className='space-y-4 px-4 py-10'
      >
        <div className='flex items-center space-x-3'>
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className='h-14 w-14 rounded-full bg-slate-500'
            />
          ) : (
            <img className='h-14 w-14 rounded-full bg-slate-500' />
          )}
          <label
            htmlFor='picture'
            className='cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
          >
            Change
            <input
              {...register('avatar')}
              id='picture'
              type='file'
              className='hidden'
              accept='image/*'
            />
          </label>
        </div>
        <Input
          register={register('email')}
          required={false}
          label='Email address'
          name='email'
          type='email'
        />
        <Input
          register={register('phone')}
          required={false}
          label='Phone number'
          name='phone'
          type='text'
          kind='phone'
        />
        <Input
          register={register('name')}
          required={false}
          label='Name'
          name='name'
          type='text'
        />
        {errors.formErrors ? (
          <span className='my-2 block text-center text-sm font-medium text-red-500'>
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text={loading ? 'Loading...' : 'Update profile'} />
      </form>
    </Layout>
  );
};

export default EditProfile;
