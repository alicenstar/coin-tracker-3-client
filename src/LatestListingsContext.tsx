import React from 'react';
import { IListing } from './types/types';
import { useInterval } from './utils';


type Props = {
	children: React.ReactNode;
};

type LatestListingsContextType = {
    listings: IListing[];
    setListings: (listings: IListing[]) => void;
};

const LatestListingsContext = React.createContext<LatestListingsContextType | undefined>(
    undefined
);

export const LatestListingsProvider = ({
    children
}: Props) => {
    const [ listings, setListings ] = React.useState<IListing[]>([]);

    const fetchListings = React.useCallback(async () => {
        const response = await fetch('http://localhost:5000/api/listings/');
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
        <LatestListingsContext.Provider value={{ listings, setListings }}>
            {children}
        </LatestListingsContext.Provider>
    )
};

export const useListingsContext = () => React.useContext(LatestListingsContext);