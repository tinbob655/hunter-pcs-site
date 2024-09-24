import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

//this only works as a function because it requires react hooks
export default function AutoNav({destination}) {

    const navigate = useNavigate();

    //when the component mounts, navigate to the required page
    useEffect(() => {
        navigate(destination);
    }, []);

    return (
        <React.Fragment>
        </React.Fragment>
    );
};