import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalMoviesRoundedIcon from '@mui/icons-material/LocalMoviesRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const iconStyle = {
  fontSize: '2.4rem',
  color: '#f4f0fa',
}

const navLinksConfig = [
  {
    id: 1,
    icon: <HomeRoundedIcon style={iconStyle}/>,
    label: 'Home',
    path: '/home'
  },
  {
    id: 2,
    icon: <LocalMoviesRoundedIcon style={iconStyle}/>,
    label: 'Discover',
    path: '/movies',
    movies: [
      {
        label: 'Latest',
        path: '/latest'
      },
      {
        label: 'Now Play',
        path: '/now_play'
      },
      {
        label: 'Popular',
        path: '/popular'
      },
      {
        label: 'Upcoming',
        path: '/upcoming'
      },
    ]
  },
  {
    id: 3,
    icon: <InfoRoundedIcon style={iconStyle}/>,
    label: 'About',
    path: '/about'
  },
];

export default navLinksConfig;