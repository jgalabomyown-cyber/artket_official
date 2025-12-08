import React from 'react';
import { supabase } from '../SupabaseClient';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      navigate('/');
      window.location.reload(); // force reload to reset auth state
    }
  };

  return (
    <button onClick={handleLogout} className='logout-btn'>
      Logout
    </button>
  );
};

export default LogoutButton;
