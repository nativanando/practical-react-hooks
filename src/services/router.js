
import User from "pages/user/User";
import Login from "pages/user/Login";
import Device from "pages/device/Device";
import Template from "pages/template/Template";
import Dashboard from "pages/dashboard/Dashboard";
import DeviceMap from "pages/mapa/Map";
import TemplateIcon from '@material-ui/icons/FileCopy';
import DeviceIcon from '@material-ui/icons/Memory';
import PeopleIcon from '@material-ui/icons/PeopleOutline';
import MapIcon from '@material-ui/icons/Place';
import DashIcon from '@material-ui/icons/SignalCellularAlt';
import LockIcon from '@material-ui/icons/Lock';
import Add from '@material-ui/icons/Add';
import List from '@material-ui/icons/List';
import NewDevice from 'pages/device/NewDevice';
import NewTemplate from 'pages/template/NewTemplate';
import NewUser from 'pages/user/NewUser';
import UserPermission from 'pages/user/UserPermission';

export const publicRoutes = [
  {
    path: '/login',
    component: Login,
    text: 'Login',
    subtitle: 'Página de autenticação',
  }
]

export const privateRoutes = [
  {
    path: '/',
    component: Device,
    text: 'Dispositivos',
    subtitle: 'Dispositivos e configurações',
    Icon: DeviceIcon,
    isOpened: false,
    subPath: [
      {
        path: '/',
        component: Device,
        text: 'Visualizar Dispositivos',
        Icon: List,
      },
      {
        path: '/device/new',
        component: NewDevice,
        text: 'Adicionar Dispositivo',
        Icon: Add,
      }
    ]
  }, {
    path: '/template',
    component: Template,
    text: 'Templates',
    subtitle: 'Templates e configurações',
    Icon: TemplateIcon,
    isOpened: false,
    subPath: [
      {
        path: '/template',
        component: Template,
        text: 'Visualizar Templates',
        Icon: List,
      },
      {
        path: '/template/new',
        component: NewTemplate,
        text: 'Adicionar Template',
        Icon: Add,
      },
    ]
  }, {
    path: '/user',
    component: User,
    text: 'Usuários',
    subtitle: 'Usuários e permissões',
    Icon: PeopleIcon,
    isOpened: false,
    subPath: [
      {
        path: '/user',
        component: User,
        text: 'Visualizar usuários',
        Icon: List,
      },
      {
        path: '/user/new',
        component: NewUser,
        text: 'Adicionar Usuário',
        Icon: Add,
      },
      {
        path: '/user/permissions',
        component: UserPermission,
        text: 'Permissões de Usuário',
        Icon: LockIcon,
      },
    ]
  },
  {
    path: '/dashboard',
    component: Dashboard,
    text: 'Dashboard',
    subtitle: 'Dashboards do usuário',
    Icon: DashIcon,
    isOpened: false,
    subPath: []
  },
  {
    path: '/map',
    component: DeviceMap,
    text: 'Mapas',
    subtitle: 'Mapa dos dispositivos',
    Icon: MapIcon,
    isOpened: false,
    subPath: []
  }
];