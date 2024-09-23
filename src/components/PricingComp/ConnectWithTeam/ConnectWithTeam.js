import getRelativeURL from '@/utils/getRelativeURL';
import Link from 'next/link';
import { MdLaunch } from 'react-icons/md';

export default function ConnectWithTeam({ product, isPlan, data }) {
    return (
        <div className='flex flex-col gap-3'>
            {isPlan && (
                <>
                    <p className='text-xl'>{data?.content}</p>
                    <button className='btn btn-outline btn-md'>{data?.sales_btn}</button>
                </>
            )}
            <div>
                <Link
                    href={getRelativeURL(product, 'product')}
                    className='flex items-center gap-1 text-link active-link '
                >
                    <MdLaunch />
                    {data?.know_more} <span className='capitalize'>{product}</span>
                </Link>
            </div>
        </div>
    );
}