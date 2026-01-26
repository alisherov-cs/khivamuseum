import {useCallback, useEffect, useState} from 'react'
import API from '../api/index'
import {useDispatch} from 'react-redux'
import {updateLoader} from '../store/user'
import {default_loader} from '../constant'

export default function useFetch(path, {query = '', loader = default_loader, api = API, default_data = {}} = {}) {
    const [data, setData] = useState(default_data)
    const [loading, setLoading] = useState(loader)
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const getData = useCallback(
        async ({path: p = path, query: q = query, loading: showLoader = loader} = {}) => {
            setLoading(true)
            if (showLoader) {
                dispatch(updateLoader({loader_key: showLoader, value: {loading: true}}))
            }

            try {
                const {data: fetched} = await api.get(`/${p}?${q}`)
                setData(fetched || default_data)
            } catch (err) {
                setError(err?.response?.data?.message || err.message || 'Something went wrong')
            } finally {
                setLoading(false)
                if (showLoader) {
                    dispatch(updateLoader({loader_key: showLoader, value: {loading: false}}))
                }
            }
        },
        [path, query, loader, dispatch, default_data]
    )

    useEffect(() => {
        getData()
    }, [path])

    return {data, setData, loading, setLoading, error, refresh: getData}
}
