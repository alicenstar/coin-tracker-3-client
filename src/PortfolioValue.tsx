import {
    Grid,
    Theme,
    Typography,
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import React from 'react';
import { currencyFormatter, percentFormatter } from './utils/Formatters';
import { useTrackerContext } from './TrackerContext';
import { useListingsContext } from './ListingsContext';
import { IHolding } from './types/types';


export const PortfolioValue: React.FC = () => {
    const { listings } = useListingsContext()!;
    const { tracker } = useTrackerContext()!;
    const total = tracker!.holdings.map((holding: IHolding) => {
        const listingMatch = listings.find(listing => listing.id === holding.coinId);
        return parseFloat(holding.quantity) * listingMatch!.quote.USD.price;
    });
    let portfolioTotal: number = 0;
    let returnOnInvestment: number = 0;
    if (total.length > 0) {
        portfolioTotal = total.reduce((a: number, b: number) => a + b);
        returnOnInvestment = (portfolioTotal / tracker!.initialInvestment) - 1;
    }
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (
            <Grid container spacing={3}>
                <Grid
                 item
                 container
                 direction={smallScreen ? "row-reverse" : "column"}
                 alignItems="center"
                 justify={smallScreen ? "space-between" : "center"}
                 xs={12}
                 sm={4}
                 md={4}
                >
                    <Grid item>
                        <Typography variant="subtitle1">
                            {currencyFormatter.format(portfolioTotal)}
                        </Typography>
                    </Grid>
                    
                    <Grid item>
                        <Typography variant="subtitle1">
                            Portfolio Value
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                 item
                 container
                 direction={smallScreen ? "row-reverse" : "column"}
                 alignItems="center"
                 justify={smallScreen ? "space-between" : "center"}
                 xs={12}
                 sm={4}
                 md={4}
                >
                    <Typography variant="subtitle1">
                        {currencyFormatter.format(tracker!.initialInvestment)}
                    </Typography>
                    <Typography variant="subtitle1">
                        Initial Investment
                    </Typography>
                </Grid>
                <Grid
                 item
                 container
                 direction={smallScreen ? "row-reverse" : "column"}
                 alignItems="center"
                 justify={smallScreen ? "space-between" : "center"}
                 xs={12}
                 sm={4}
                 md={4}
                >
                    <Typography variant="subtitle1">
                        {percentFormatter.format(returnOnInvestment)}
                    </Typography>
                    <Typography variant="subtitle1">
                        Return on Investment
                    </Typography>
                </Grid>
            </Grid>
    );
};