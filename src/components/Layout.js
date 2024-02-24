import React from 'react';
import Header from './Header';
const Layout = ({ children }) => {
    return (
        <div className="w-full flex min-h-screen">
            <div className="md:w-[30vw] lg:w-[12vw]">
                <Header />
            </div>
            <div className="w-full p-[10px] pt-[60px] md:pt-0">{children}</div>
        </div>
    )
}

export default Layout