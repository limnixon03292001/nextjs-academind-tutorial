import MainNavigation from './MainNavigation';
import classes from './layout.module.css';
import { ReactNode } from 'react';

type LayoutTypeProps = {
    children: ReactNode
}

function Layout(props: LayoutTypeProps) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;