import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabaseClient';

const Login = () => {
  useEffect(() => {
    document.title = "Login | GPTmart";
  }, []);

  return (
    <div className="flex justify-center mt-12">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={['google']}
      />
    </div>
  );
};

export default Login;
