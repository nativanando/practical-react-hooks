import Layout from 'layouts/Authenticated';
import React from 'react';
import UserTable from 'components/UserTable';

const User = () => {
  return (
    <Layout greeting="Visualizar usuários">
      <UserTable />
    </Layout>);
};

export default User;