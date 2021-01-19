import React from 'react';


type Props = {
	children: React.ReactNode;
};

type PageContextType = {
    pageElement: any;
    setPageElement: (value: any) => void;
}

const PageContext = React.createContext<PageContextType | undefined>(
    undefined
);

export const PageProvider = ({
    children
}: Props) => {
    const [pageElement, setPageElement] = React.useState('Overview');

    return (
        <PageContext.Provider value={{ pageElement, setPageElement }}>
            {children}
        </PageContext.Provider>
    )
};

export const usePageContext = () => React.useContext(PageContext);