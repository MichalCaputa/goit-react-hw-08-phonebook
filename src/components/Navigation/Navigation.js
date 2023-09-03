import { useAuth } from 'hooks/useAuth.js';
import css from './Navigation.module.css';
import { Link } from 'components/AuthNav/LayoutStyled';
export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      <Link className={css.link} to="/">
        Home
      </Link>
      {isLoggedIn && <Link to="/contacts">Contacts</Link>}
    </nav>
  );
};
