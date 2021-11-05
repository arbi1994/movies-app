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
    path: '/'
  },
  {
    id: 2,
    icon: <LocalMoviesRoundedIcon style={iconStyle}/>,
    label: 'Discover',
    path: '/',
    movies: [
      {
        id: 2.1,
        label: 'Now Play',
        path: 'now_playing'
      },
      {
        id: 2.2,
        label: 'Popular',
        path: 'popular'
      },
      {
        id: 2.3,
        label: 'Upcoming',
        path: 'upcoming'
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