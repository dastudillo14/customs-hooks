import { useEffect, useState } from "react"

const localCache = {

};


export const useFetch = (url) => {
    const initalState = {
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    }

    const [state, setState] = useState(initalState);

    const setLoadingState = () => {
        setState(initalState);
    }

    const getFetch = async () => {

        if (localCache[url]) {
            console.log('si, usando cache');
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            })
            return;
        }

        setLoadingState();
        const resp = await fetch(url);

        if (!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText
                }
            });
            return;
        }
        const data = await resp.json();
        setState({
            data,
            isLoading: false,
            hasError: false,
            error: null
        });

        localCache[url] = data;
    }

    useEffect(() => {
        getFetch()

    }, [url]);

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    }
}



