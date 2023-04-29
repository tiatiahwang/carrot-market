import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useUser() {
  const router = useRouter();
  const [user, setUser] = useState();
  useEffect(() => {
    fetch('/api/users/me')
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          return router.replace('/enter');
        }
        setUser(data.profile);
      });
  }, [router]);
  return user;
}
