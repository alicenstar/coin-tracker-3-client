import React from "react";
import { useParams } from "react-router-dom";
import { NewTransactionForm } from "./NewTransactionForm";
import { returnedTracker } from './NewTrackerForm';


interface IRouteParams {
    id: string;
}

interface IState {
    loaded: boolean;
    tracker: returnedTracker | undefined;
}

export const Trackers: React.FC = () => {
    const [ state, setState ] = React.useState<IState>({
        loaded: false,
        tracker: undefined
    });
    const { id } = useParams<IRouteParams>();
    const trackerId = React.useRef(id);
    
    React.useEffect(() => {
        const findTracker = async () => {
            const response = await fetch(`http://localhost:5000/api/trackers/${trackerId.current}`)
            const json = await response.json();
            if (json.tracker) {
                trackerId.current = json.tracker._id;
            } else {
                trackerId.current = '';
            }
            setState({ loaded: true, tracker: json.tracker });
        };

        findTracker();
    }, [state.loaded]);

    return (
        <div className="portfolio-container">
            {!state.loaded &&
                <div>Loading...</div>
            }
            {state.tracker
                ? (
                    <React.Fragment>
                        <NewTransactionForm />
                        <p>Tracker Name: {state.tracker.name}</p>
                        <p>Tracker ID: {trackerId.current}</p>
                    </React.Fragment>
                )
                : 'Tracker not found'
            }
        </div>
    );
};