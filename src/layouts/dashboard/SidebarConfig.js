import { Icon } from '@iconify/react';
import listFill from '@iconify/icons-eva/list-fill';
import githubFill from '@iconify/icons-eva/github-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'PokeList',
    path: '/',
    icon: getIcon(listFill)
  },
  {
    title: 'Github',
    path: '/dashboard/user',
    icon: getIcon(githubFill)
  }
];

export default sidebarConfig;
