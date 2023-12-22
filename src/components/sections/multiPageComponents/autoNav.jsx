import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

 //small component to navigate to a specified page (easiest way to do this programatically)
 function AutoNav({destination}) {

    const navigate = useNavigate();

    useEffect(() => {
        navigate(destination);
    }, []);

    return(<React.Fragment></React.Fragment>);
};

export default AutoNav;