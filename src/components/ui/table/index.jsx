import {
    ArrowDownIcon,
    ArrowUpDownIcon,
    ArrowUpIcon,
    EyeIcon,
    LockIcon,
    PencilIcon,
    Trash2Icon,
    UnlockIcon
} from 'lucide-react'
import {useCallback, useMemo, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import IsLoading from '../../loader/helper'
import LoaderOverlay from '../../loader/overlay'
import ModalAsk from '../../modal/ask'
import Pagination from '../pagination'

export default function Table({
    table_data = [],
    loader_key = 'table_loading',
    data = {},
    action,
    row_number = false,
    refresh,
    className = '',
    pagination = {}
}) {
    const [modal, setModal] = useState(false)
    const table_loading = IsLoading(loader_key)

    const [params, setParams] = useSearchParams()
    const [sort, setSort] = useState([params.get('field'), params.get('order')])

    const pagination_none = !(data.page && data.limit)
    const nth_item = pagination_none ? 1 : (data?.page - 1) * data?.limit + 1

    const sorting = useCallback(
        async field_name => {
            const result = [field_name, sort[1] === 'up' ? 'down' : 'up']
            setSort(result)
            params.set('field', result[0])
            params.set('order', result[1])
            setParams(params)
            await refresh({
                query: `${params.toString()}${pagination.limit ? `&limit=${pagination.limit}` : ''}`,
                loading: loader_key
            })
        },
        [params, sort, setParams, refresh, pagination.limit, loader_key]
    )

    const renderTableHead = useMemo(
        () => (
            <tr className='uppercase bg-[#81819916] text-xs font-semibold tracking-wide'>
                {row_number && <th className='p-4 opacity-80 w-[4%] pl-4'>T/r</th>}
                {table_data.map(({align = 'center', title, sort: sort_name}, idx) => (
                    <th className='p-4 opacity-80 group' align={align} key={idx}>
                        {sort_name ? (
                            <button
                                className='flex items-center gap-2 uppercase relative'
                                onClick={() => sorting(sort_name)}>
                                {title}
                                {sort[0] === sort_name ? (
                                    sort[1] === 'up' ? (
                                        <ArrowUpIcon className='size-4 stroke-text' />
                                    ) : (
                                        <ArrowDownIcon className='size-4 stroke-text' />
                                    )
                                ) : (
                                    <div className='absolute left-[calc(100%)] pl-2 transition opacity-0 group-hover:opacity-100'>
                                        <ArrowUpDownIcon className='size-4 stroke-text' />
                                    </div>
                                )}
                            </button>
                        ) : (
                            title
                        )}
                    </th>
                ))}
                {action && <th className='p-4 opacity-80'>Jarayon</th>}
            </tr>
        ),
        [row_number, table_data, sort, sorting, action]
    )

    const renderTableRows = useMemo(
        () =>
            data?.items?.map((item, i) => (
                <tr className='text-center border-solid border-b border-border' key={item.id}>
                    {row_number && <td className='p-3 px-4'>{nth_item + i}</td>}
                    {table_data.map(({align = 'center', value}, idx) => (
                        <td className='p-3 px-4 text-wrap' align={align} key={idx}>
                            {typeof value === 'string' ? value : value(item) ?? '---'}
                        </td>
                    ))}
                    {action && (
                        <td className='py-3 px-4'>
                            <div className='flex justify-center gap-2'>
                                {action.view && (
                                    <button
                                        onClick={action.view.click}
                                        className='card items-center justify-center bg-primary px-2 py-1 rounded-md'>
                                        <EyeIcon className='size-5' stroke='white' />
                                    </button>
                                )}
                                {action.edit && (
                                    <button
                                        onClick={() => action.edit.click(item)}
                                        className='card items-center justify-center bg-green-700 px-2 p-1 rounded-md'>
                                        <PencilIcon className='size-4' stroke='white' />
                                    </button>
                                )}
                                {action.remove && (
                                    <button
                                        onClick={() => setModal({...action.remove, item})}
                                        className='card items-center justify-center bg-red-500 px-2 py-1 rounded-md'>
                                        <Trash2Icon className='size-5' stroke='white' />
                                    </button>
                                )}
                                {action.block &&
                                    (item.blocked ? (
                                        <button
                                            onClick={() => setModal({...action.block, item})}
                                            className='card items-center justify-center bg-green-500 px-2 py-1 rounded-md'>
                                            <UnlockIcon className='size-5' stroke='white' />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setModal({...action.block, item})}
                                            className='card items-center justify-center bg-red-500 px-2 py-1 rounded-md'>
                                            <LockIcon className='size-5' stroke='white' />
                                        </button>
                                    ))}
                            </div>
                        </td>
                    )}
                </tr>
            )),
        [data?.items, row_number, nth_item, table_data, action]
    )

    return (
        <>
            {action && (
                <ModalAsk open={modal} close={() => setModal(false)} next={() => modal?.next(modal?.item)}>
                    {modal && modal?.modal(modal?.item)}
                </ModalAsk>
            )}
            <LoaderOverlay loading={table_loading} className={`card p-0 overflow-x-auto flex-1 relative ${className}`}>
                <table className='border-collapse'>
                    <thead className='sticky top-0'>{renderTableHead}</thead>
                    <tbody>{renderTableRows}</tbody>
                </table>
            </LoaderOverlay>
            {data.total_pages > 1 && (
                <div className='flex justify-end px-4 mt-auto'>
                    <Pagination
                        className='!py-2'
                        data={data}
                        refresh={a => refresh({...a, loading: loader_key})}
                        {...pagination}
                    />
                </div>
            )}
        </>
    )
}
