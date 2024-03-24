import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

 //small component to navigate to a specified page (easiest way to do this programatically)
 function AutoNav({destination, randomHash}) {

    const navigate = useNavigate();
    
    useEffect(() => {
        navigate(destination);
    }, [randomHash]);

    return(<React.Fragment></React.Fragment>);
};

export default AutoNav;