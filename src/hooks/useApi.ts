import {
    useEffect, useState, Dispatch, SetStateAction
} from 'react';

import axios from 'axios';

function useApi<T>(url: string | undefined): [T | null, Boolean, Dispatch<SetStateAction<T | null>>] {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        (async () => {
            if (url) {
                setLoading(true);
                const response = await axios.get(url);
                setData(response.data);
            }
            setLoading(false);
        })();
    },
        [url],
    );

    return [data, loading, setData];
}

export default useApi;