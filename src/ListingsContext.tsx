import React from 'react';
import { IListing } from './types/types';
import { useInterval } from './utils';


type Props = {
	children: React.ReactNode;
};

type ListingsContextType = {
    listings: IListing[];
    setListings: (listings: IListing[]) => void;
};

const ListingsContext = React.createContext<ListingsContextType | undefined>(
    undefined
);

export const ListingsProvider = ({
    children
}: Props) => {
    const [ listings, setListings ] = React.useState<IListing[]>([]);

    const fetchListings = React.useCallback(async () => {
        const response = await fetch('http://97.87.184.181/api/listings/');
        const json = await response.json();
        setListings(json.listings);
    }, []);

    React.useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    useInterval(() => {
        fetchListings();
    }, 90000);

    return (
        <ListingsContext.Provider value={{ listings, setListings }}>
            {children}
        </ListingsContext.Provider>
    );
};

export const useListingsContext = () => React.useContext(ListingsContext);