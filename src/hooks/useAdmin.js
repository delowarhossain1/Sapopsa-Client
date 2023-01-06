import { useEffect, useState } from "react";

const useAdmin = () => {
    const [admin, setAdmin] = useState(false);

    useEffect(()=>{
        fetch('')
        .then(res => res.json())
        .then(res => setAdmin(res));
    }, []);


    return 
};

export default useAdmin;