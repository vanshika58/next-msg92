import Link from 'next/link';
import { MdArrowDropDown, MdOutlineCall, MdOutlineLanguage } from 'react-icons/md';
import availableCountries from '@/data/availableCountries.json';
import Image from 'next/image';
import getRelativeURL from '@/utils/getRelativeURL';

export default function NotificationBarComp({ componentData, pageInfo }) {
    const currentCountry = availableCountries.find((cont) => cont.shortname.toLowerCase() === pageInfo?.country);
    const hidden = componentData?.hide?.includes(pageInfo?.page);
    if (componentData && !hidden) {
        return (
            <div className='py-1 border border-b'>
                <div className='container flex gap-6 justify-end '>
                    <div className='dropdown'>
                        {/* /* Render the currentCountry in notification bar */}
                        <div tabIndex={0} role='button' className='flex gap-1 items-center '>
                            {currentCountry?.shortname ? (
                                <Image
                                    src={`/assets/country-flags/${currentCountry?.shortname.toLowerCase()}.svg`}
                                    width={18}
                                    height={18}
                                />
                            ) : (
                                <MdOutlineLanguage fontSize={16} />
                            )}

                            {currentCountry?.name || 'Global'}
                            <MdArrowDropDown fontSize={16} />
                        </div>
                        <div tabIndex={0} className='dropdown-content bg-neutral z-[9999] w-60 rounded shadow'>
                            <ul>
                                <li className='cursor-pointer'>
                                    <a href={`/`} className='px-2 py-1 hover:bg-secondary flex items-center gap-2 '>
                                        <Image src={`/assets/country-flags/global.svg`} width={18} height={18} />
                                        Global
                                    </a>
                                </li>
                                {/* /* Render the country list */}
                                {availableCountries.map((cont, index) => {
                                    return (
                                        <li key={index} className='cursor-pointer'>
                                            <a
                                                href={getRelativeURL(cont?.shortname.toLowerCase(), 'country')}
                                                className='px-2 py-1 hover:bg-secondary flex items-center gap-2 '
                                            >
                                                {/* /* ${cont?.shortname} == 'in,us,gb etc. */}
                                                <Image
                                                    src={`/assets/country-flags/${cont?.shortname.toLowerCase()}.svg`}
                                                    width={18}
                                                    height={18}
                                                    alt={cont?.name}
                                                />

                                                {cont?.name}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    <Link className='text-link flex gap-1 items-center' href={'/contact-us'}>
                        <MdOutlineCall fontSize={16} />
                        {componentData?.support}
                    </Link>
                    <Link className='text-link ' href={'https://test.msg91.com/signin/'}>
                        {componentData?.login}
                    </Link>
                </div>
            </div>
        );
    }
}
