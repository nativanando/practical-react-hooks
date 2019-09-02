import Layout from 'layouts/Authenticated';
import React, { useEffect, useState } from 'react';
import { getToken } from 'services/authentication';
import { get, post, remove, put } from 'services/api';
import Button from '@material-ui/core/Button';

export default function EditeDevice() {

  const [permissions, setPermissions] = useState([]);
  const [rule, setRules] = useState({ permit: 'permit', deny: 'deny' });
  const [methods, setMethods] = useState([
    { get: 'GET', description: 'Listar' },
    { post: 'POST', description: 'Inserir' },
    { put: 'PUT', description: 'Atualizar' },
    { delete: 'DELETE', description: 'Deletar' }
  ]);

  //user to example - fabio - id 44

  useEffect(() => {
    // componentDidMount(), componentDidUpdate()
    try {
      const url = '/auth/pap/permission';
      const response = get(url, getToken());
      console.log(response);
      response.then(response => response.json())
        .then(data => {
          console.log(data);
          setPermissions(data.permissions);
        });
    } catch (e) {
      console.error("Error on submit - There's something wrong", e);
    }
  },
    []);

  const addPermission = () => {
    console.log("adicionar permissão function");
    try {
      const requestParams = {
        "path": "/device/(.*)",
        "method": "(.*)",
        "permission": "deny",
        "type": "system",
        "name": "deny"
      }
      const url = '/auth/pap/permission';
      const response = post(url, requestParams, getToken());
      if (!response.ok && response.status === 400) {
        console.log("erro na rquisicao");
        return 0;
      }
      console.log("sucesso na requsiicao");
    } catch (e) {
      console.error("Error on submit - There's something wrong", e);
    }
  }

  const addPermissionToUser = () => {
    console.log("add permission to user");
    const params = {
      user_id: 30,
      permission_id: 26
    }
    try {
      const url = '/auth/pap/userpermissions/4/15';
      const response = post(url, null, getToken());
      if (!response.ok && response.status === 400) {
        console.log("erro na rquisicao");
        return 0;
      }
      console.log("sucesso na requsiicao");
    } catch (e) {
      console.error("Error on submit - There's something wrong", e);
    }
  }

  const listUserPermission = () => {
    // componentDidMount(), componentDidUpdate()
    try {
      const url = '/auth/pap/user/kenner/allpermissions';
      const response = get(url, getToken());
      response.then(response => response.json())
        .then(data => {
          console.log(data);
        });
    } catch (e) {
      console.error("Error on submit - There's something wrong", e);
    }
  }

  const deleteUserPermission = () => {
    try {
      const url = '/auth/pap/userpermissions/2/27';
      // const url = '/auth/pap/permission/22';
      const response = remove(url, getToken());
      console.log(response);
      if (!response.ok && response.status === 400) {
        console.log("erro na rquisicao");
        return 0;
      }
      console.log("sucesso na requsiicao");
    } catch (e) {
      console.error("Error on submit - There's something wrong", e);
    }
  }

  const deletePermission = () => {
    try {
      const url = '/auth/pap/permission/8';
      // const url = '/auth/pap/permission/22';
      const response = remove(url, getToken());
      if (!response.ok && response.status === 400) {
        console.log("erro na rquisicao");
        return 0;
      }
      console.log("sucesso na requsiicao");
    } catch (e) {
      console.error("Error on submit - There's something wrong", e);
    }
  }

  const createNewGroup = () => {
    const params = {
      name: 'itaipu',
      description: 'a fine group'
    }
    try {
      const url = '/auth/pap/group';
      const response = post(url, params, getToken());
      if (!response.ok && response.status === 400) {
        console.log("erro na rquisicao");
        return 0;
      }
      console.log("sucesso na requsiicao");
    } catch (e) {
      console.error("Error on submit - There's something wrong", e);
    }
  }

  const addPermissionToGroup = () => {
    console.log("add permission to group");
    const params = {
      user_id: 30,
      permission_id: 26
    }
    try {
      const url = '/auth/pap/grouppermissions/3/38';
      const response = post(url, null, getToken());
      if (!response.ok && response.status === 400) {
        console.log("erro na rquisicao");
        return 0;
      }
      console.log("sucesso na requsiicao");
    } catch (e) {
      console.error("Error on submit - There's something wrong", e);
    }
  }

  const listGroup = () => {
    // componentDidMount(), componentDidUpdate()
    try {
      const url = '/auth/pap/group';

      const response = get(url, getToken());
      response.then(response => response.json())
        .then(data => {
          console.log(data);
        });
    } catch (e) {
      console.error("Error on submit - There's something wrong", e);
    }
  }

  const testeHistoryApi = () => {
    // componentDidMount(), componentDidUpdate()
    try {
      const url = '/history/device/7f4c7a/history?lastN=3&attr=temperatura';
      const response = get(url, getToken());
      response.then(response => response.json())
        .then(data => {
          console.log(data);
        });
    } catch (e) {
      console.error("Error on submit - There's something wrong", e);
    }
  }

  return (
    <Layout greeting="Permissões de usuários">
      User permission page
      <Button variant='contained' color='primary' onClick={addPermission}>
        Adicionar Permissão teste
      </Button>
      <Button variant='contained' color='primary' onClick={deleteUserPermission}>
        Deletar permissao do ususário
      </Button>
      <Button variant='contained' color='primary' onClick={addPermissionToUser}>
        Adicionar permissão para um usuário
      </Button>
      <Button variant='contained' color='primary' onClick={listUserPermission}>
        Listar permissos do usuário
      </Button>
      <Button variant='contained' color='primary' onClick={deletePermission}>
        Deleter permissao
      </Button>
      <Button variant='contained' color='primary' onClick={createNewGroup}>
        Criar grupo itaipu
      </Button>
      <div>
        <Button variant='contained' color='primary' onClick={addPermissionToGroup}>
          Permissao para o grupo
      </Button>
        <Button variant='contained' color='primary' onClick={listGroup}>
          Listar grupos
       </Button>
        <Button variant='contained' color='primary' onClick={testeHistoryApi}>
          Testa history API
      </Button>
      </div>
    </Layout>
  );
};