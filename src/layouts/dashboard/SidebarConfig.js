import { Icon } from '@iconify/react';
import listFill from '@iconify/icons-eva/list-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'PokeList',
    path: '/houm-test',
    icon: getIcon(listFill)
  }
];

export default sidebarConfig;
