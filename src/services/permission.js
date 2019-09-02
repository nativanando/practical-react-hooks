export const methods = [
  {
    method: 'GET',
    description: 'Visualizar'
  },
  {
    method: 'POST',
    description: 'Inserir'
  },
  {
    method: 'PUT',
    description: 'Atualizar'
  },
  {
    method: 'DELETE',
    description: 'Deletar'
  },
  {
    method: '(.*)',
    description: 'Todos os recursos'
  }
]

export const permissionTypeEnum = {
  deny: 'deny',
  allow: 'permit'
}

export const paths = [
  {
   path: '/device/',
   description: 'Permissões de dispositivos do sistema'
  },
  {
    path: '/template/',
    description: 'Permissões de templates do sistema'

  },
  {
    path: '/auth/user/',
    description: 'Permissões para o gerenciamento de usuários'
  },
  {
    path: '/auth/pap/',
    description: 'Permissões para o gerenciamento de permissões'
  }
]

export const createPermissionPattern = (path, method, permissionType) => {
  return permission = {
    "path": path,
    "method": method,
    "permission": permissionType,
    "type": "system",
    "name": "" + path + "_" + method + "_" + permissionType + ""
  }
} 