import { MdDone, MdClose } from 'react-icons/md';
import { useEffect, useState, useRef, use } from 'react';
import countries from '@/data/countries.json';
import { Typeahead } from 'react-bootstrap-typeahead';
import { setUtm } from '@/components/utils';

const Pricingsms = ({
    pricing,
    setPricing,
    amountArr,
    fetchSMSData,
    originCountry,
    setOriginCountry,
    destinationCountry,
    setDestinationCountry,
    currency,
    currencySymbol,
    countryCode,
}) => {
    const [sliderValue, setSliderValue] = useState(47);
    const [noOfSection, setNoOfSection] = useState(0);

    // const [pricingEnv, setPricingEnv] = useState(4);
    // const [totalNoOfSmsArray, setTotalNoOfSmsArray] = useState([]);
    // useEffect(() => {
    //     setUtm();
    // }, [pricing, originCountry, destinationCountry]);
    // useEffect(() => {
    //     if (process.env.PRICING_URL === 'https://test.msg91.com') {
    //         setPricingEnv(4);
    //     }
    // }, []);

    // useEffect(() => {
    //     if (pricing.length > 0) {
    //         setTotalNoOfSmsArray(pricing.map((item) => item[pricingEnv]['totalNoOfSms']).sort((a, b) => a - b));
    //     }
    // }, [pricing]);

    // let noOfsms = 0,
    //     pricingsms = 0,
    //     ratePersms = 0;

    // if (pricing[0] && pricing.length > 2) {
    //     let arrayOfPrices = totalNoOfSmsArray.slice();
    //     arrayOfPrices.unshift('0');

    //     const lenAmountArr = totalNoOfSmsArray.length;
    //     const widthOfSection = 100 / lenAmountArr;
    //     setNoOfSection(Math.floor(sliderValue / widthOfSection));
    //     // const noOfSection = 100/pricing.length
    //     if (pricing[0]) {
    //         if (pricing[noOfSection]) {
    //             ratePersms = pricing[noOfSection][pricingEnv]?.rate;
    //         } else {
    //             ratePersms = pricing[noOfSection - 1][pricingEnv]?.rate;
    //         }

    //         const rangeInSection = lenAmountArr * (sliderValue - widthOfSection * noOfSection);
    //         const noOfExtrasms = ((arrayOfPrices[noOfSection + 1] - arrayOfPrices[noOfSection]) * rangeInSection) / 100;
    //         noOfsms = Number(arrayOfPrices[noOfSection]) + Math.floor(noOfExtrasms);
    //     }
    //     console.log(noOfSection, 77);
    //     if (sliderValue == 100) {
    //     }
    //     let pricingSMSstr = pricing[noOfSection][pricingEnv]?.totalNoOfSms * pricing[noOfSection][pricingEnv]?.rate;
    //     if (countryCode === 'IN') {
    //         pricingsms = pricingSMSstr.toLocaleString('en-IN');
    //     } else {
    //         pricingsms = pricingSMSstr.toLocaleString(undefined);
    //     }
    //     noOfsms = Number(arrayOfPrices[noOfSection]);
    // }
    console.log('🚀 ~ pricing:', pricing.length);
    useEffect(() => {
        if (pricing[0] && pricing.length > 1) {
            const totalSections = pricing.length;
            const sectionSize = 100 / totalSections;
            const currentSection = Math.floor(sliderValue / sectionSize);
            setNoOfSection(currentSection);
            console.log(currentSection);
        }
    }, [sliderValue]);

    return (
        <>
            {originCountry?.length >= 1 && (
                <div className="d-flex flex-column flex-lg-row align-items-center  gap-4 ">
                    <span className="Send-sms c-fw-m ">Send SMS from</span>
                    <div className="gap-3 col d-flex flex-column text-start flex-md-row align-items-center justify-content-start col-12 col-md-10 col-lg-7">
                        <Typeahead
                            className="col c-fs-6"
                            id="originCountry c-fs-6"
                            placeholder="Origin Country"
                            labelKey="name"
                            onChange={(selected) => {
                                setPricing([]);
                                if (selected[0]?.name) fetchSMSData(currency, selected[0]?.name, destinationCountry);
                            }}
                            options={countries}
                            clearButton
                            defaultSelected={[countries?.find((item) => item.name === originCountry)]}
                            inputProps={{
                                autoComplete: 'off',
                            }}
                        />

                        <div className="c-fw-m">To</div>

                        <Typeahead
                            className="col"
                            id="destinationCountry"
                            placeholder="Destination Country"
                            labelKey="name"
                            onChange={(e) => {
                                const stepValue = 100 / pricing.length;
                                let newValue = Number(e.target.value);
                                // Ensure the slider does not go below the first step
                                if (newValue < stepValue) {
                                    newValue = stepValue;
                                }
                                // Adjust this condition to ensure the slider can reach the end
                                if (newValue >= 100 - stepValue) {
                                    newValue = 100;
                                }
                                setSliderValue(newValue);
                            }}
                            options={countries}
                            clearButton
                            defaultSelected={[countries?.find((item) => item.name === originCountry)]}
                        />
                    </div>
                </div>
            )}
                  <input
                className="slider"
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                step="14.2857142857" // Precise step value for 7 equal sections
                onChange={(e) => {
                    let newValue = parseFloat(e.target.value);
                    const stepValue = 100 / 7;
                    // Explicitly handle the edge case for the minimum value
                    if (newValue <= stepValue / 2) {
                        newValue = 0;
                    } else if (newValue >= 100 - (stepValue / 2)) {
                        // Explicitly handle the edge case for the maximum value
                        newValue = 100;
                    } else {
                        // Calculate the index of the closest step (0 to 6)
                        const stepIndex = Math.round(newValue / stepValue);
                        // Set newValue to the exact value of the closest step
                        newValue = stepIndex * stepValue;
                    }
                    setSliderValue(newValue);
                }}
                aria-label="Slider"
            />
            <div className="talk-to-sales connect-personalized mt-4">
                <span className="personalized d-block c-fs-4">
                    Connect with our team for a personalized pricing
                    {originCountry === 'India' && (
                        <>
                            {' '}
                            and get up to <span className="text-green c-fs-4 fw-medium"> ₹0.13</span> per SMS to meet
                            your needs.{' '}
                        </>
                    )}
                </span>
                <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#sales-modal"
                    className="btn btn-outline-dark mt-2 mb-4 c-fs-5 border border-dark rounded-1 px-3 py-1"
                >
                    Talk to Sales
                </button>
                <br />
                <a className="more-about" href="/sms">
                    <img src="/img/icon/link.svg" alt="Know more" className="icon me-2" />
                    <span>Know more about SMS</span>
                </a>
            </div>
            {/* <div className="d-flex align-items-end mt-4 mb-3">
                                    <p className="c-fs-2 c-fw-500">
                                            <span className="c-fs-1 fw-bold">
                                                {pricing[0][pricingEnv]?.totalNoOfSms}
                                            </span>
                                        SMS for{' '}
                                        <span className="c-fs-1 text-green fw-bold">
                                            {currencySymbol}
                                            {pricingsms}{' '}
                                        </span>{' '}
                                        +18%GST at{' '}
                                        <span className="c-fs-1 text-green fw-bold">
                                            {currencySymbol}
                                            {pricing[0][pricingEnv]?.rate}
                                        </span>
                                        per SMS{' '}
                                    </p>
                                </div> */}
            <a
                href="/signup?service=SMS"
                target="_blank"
                className={`btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3`}
            >
                Get Started
            </a>
            {/* <div>
           
           
                {pricing[0] && (
                    <>
                        {pricing.length > 2 ? (
                            <>
                                <div className="d-flex flex-column gap-3 align-items center mt-3 p-4 bg-white rounded ">
                                    <div className="text-center text-dark c-fw-m">Number of SMS</div>
                                    <div className=" d-none d-md-flex">
                                        {totalNoOfSmsArray.map((amount, index) => {
                                            return (
                                                <div className="text-end col c-fs-5" key={index}>
                                                    {amount}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="d-flex d-md-none">
                                        <div className="text-start col c-fs-5">0</div>
                                        <div className="text-end col c-fs-5">
                                            {totalNoOfSmsArray[totalNoOfSmsArray.length - 1]}
                                        </div>
                                    </div>

                                    <input
                                        step={100 / totalNoOfSmsArray.length}
                                        className="slider"
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={
                                            sliderValue < 100 / totalNoOfSmsArray.length
                                                ? 100 / totalNoOfSmsArray.length
                                                : sliderValue
                                        }
                                        onChange={(e) =>
                                            setSliderValue(
                                                Math.min(Math.max(100 / totalNoOfSmsArray.length, e.target.value), 100)
                                            )
                                        }
          
                                        aria-label="Slider"
                                    />

                                    <div className="d-none d-md-flex">
                                        {pricing.map((data, index) => {
                                            return (
                                                <div className="text-end col c-fs-5" key={index}>
                                                    {currencySymbol}
                                                    {data[pricingEnv]?.rate}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="text-center text-dark c-fw-m">Cost per SMS</div>
                                </div>
                             
                            </>
                        ) : (
                            <>
                                {pricing[0][pricingEnv].rate && (
                                    <div className="content-fit bg-white btn-ft d-flex flex-column border rounded gap-5 p-4 border-2 mt-4 align-items-center">
                                        <h3 className="c-fs-4">SMS Pricing</h3>
                                        <h3 className="text-green c-fs-2">
                                            {currencySymbol}
                                            {pricing[0][pricingEnv].rate}per SMS
                                        </h3>
                                        <a
                                            href="/signup?service=SMS"
                                            target="_blank"
                                            className={`btn btn-dark fw-semibold rounded-1 border border-2 border-dark px-3 btn-ft`}
                                        >
                                            Get Started
                                        </a>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}

          
            </div> */}
        </>
    );
};

export default Pricingsms;
