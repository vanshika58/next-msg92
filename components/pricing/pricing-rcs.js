import faqData from '@/data/faq.json';

import FaqSection from '../faqSection/faqSection';

const pricingrcs = () => {
  return <>
    <div className="price-card rcs bg-white p-4 rounded-2">
      <h2 className="card-write c-fs-3 mb-3">Connect To Our Team For The Customized Pricing</h2>
      <button data-bs-toggle="modal" data-bs-target="#sales-modal" className="fw-semibold  btn btn-dark rounded-1 py-2 px-3 mt-2">
        Get Started
      </button>
      {/* <a href="/contact-us" className="btn btn-outline-dark col-6 col-sm-5 col-md-3 mx-auto mt-3">Talk to an Expert</a> */}
    </div>
    {/* <a className="more-about" href="#"> 
            <img src="/img/icon/link.svg" alt="#" className="icon me-2" />
            <span>Know more about RCS</span>
          </a>
          <FaqSection faqData={faqData?.otp}/> */}
  </>;
};

export default pricingrcs;