import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Header from './header';
import Footer from './footer';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

export default function Layout({ children }) {
  const pathname = usePathname();
  const categoryList = useSelector((state) => state.home.categoryList);
  const isAuthenticated = sessionStorage.getItem("userId");

  if (pathname !== '/dashboard' && isEmpty(isAuthenticated))
    return (
      <>
        <Header categoryList={categoryList}/>
        <main>{children}</main>
        <Footer />
      </>
    )
  else {
    return (
      <>
        <main>{children}</main>
      </>
    )
  }
}