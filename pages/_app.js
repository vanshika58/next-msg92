import "@/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Headcomp from "@/components/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from 'next/script'
import { getCookie, setCookie } from "@/components/utils";
import $ from "jquery";

export default function App({ Component, pageProps }) {
  const router = useRouter();  
  var  browserPath = router.asPath;  
  var browserPathCase = browserPath;
  var browserPathMeta = browserPath;
  
  if (browserPath !== '/') {
    const pattern = /\/([^/?]+)/;
    const result = browserPath.match(pattern);
    browserPath = result ? result[0] : browserPath;    
  }
  var path = browserPath.split("/")[1];
  const products = [
    '/sms', 
    '/email', 
    '/voice', 
    '/whatsapp', 
    '/rcs', 
    '/otp', 
    '/hello', 
    '/segmento', 
    '/campaign', 
    '/knowledgebase', 
    '/free-whatsapp-link-generator', 
    '/pricing',
    '/pricing/sms',
    '/shorturl',
  ]  
  var pageSlug = Object.keys(router.query).length ? `/${router.query.pageslug}` : browserPath
  var pricingPath = (products.includes(pageSlug)) ? `/pricing${pageSlug}` : `/pricing/sms`;

  const year = new Date().getFullYear();
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    
    const search = window.location.search;
    if(search.includes("utm_")){      
      setCookie('msg91_query', search, 30);
    }
    
    // Get all anchor tags in the document using querySelectorAll
    var anchorTags = document.querySelectorAll(".utm");        
    // Loop through the anchor tags
    for (var i = 0; i < anchorTags.length; i++) {
      var href = anchorTags[i].getAttribute("href"); // Get the current href value
      var query = getCookie('msg91_query');
      if (href && query) {
        anchorTags[i].setAttribute("href", href + query);
      }
    }
    
    const countryList = ['in','ae','ph','sg','es','gb','us']
    /* const split = window.location.href.split('/');
    if(split.length === 2){
      country = split[1].length === 2 ? split[1] : '';
    }
    if(browserPath.browserPath.split('/').length === 3){
      country = split[1].length === 2 ? split[1] : '';      
    } */
    
    var cc = getCookie('country_code');    
    if(!cc && countryList.includes(path)){
      setCookie('country_code', path, 30);
    }
    
    $("a").on("click", function (event) {
      event.preventDefault();
      var href =  $(this).attr('href');
      if(href !== undefined){
        if(products.includes(href) && cc){          
          window.location.href = '/'+ cc + href;
        }
        else{
          window.location.href = href;
        }
      }
    });

  }, []);
    return (
      <>
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `var helloConfig = {
              widgetToken: "1d31e",
              hide_launcher: false
            };`,
          }}
        />

        <Script          
          onload="initChatWidget(helloConfig, 5000)"
          src="https://control.msg91.com/app/assets/widget/chat-widget.js"
        />

        {/* <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NWZKLRJ');`,
          }}
        /> */}

        { browserPath.browserPath == '/in' &&
          <>
          <Script type="application/ld+json" strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org/",
              "@type": "WebSite",
              "name": "MSG91",
              "url": "https://msg91.com${browserPath.browserPath}",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://msg91.com/in/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }`,
          }}
          />
          
          <Script type="application/ld+json" strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "MSG91",
              "url": "https://msg91.com/in",
              "logo": "https://msg91.com/img/logo.svg",
              "sameAs": [
                "https://www.facebook.com/msg91",
                "https://twitter.com/msg91",
                "https://www.youtube.com/@WalkoverWS"
              ]
            }`,
          }}
          />
          </>
        }
        <Headcomp browserPath={browserPathMeta} />
        <Navbar browserPath={browserPath} pricingPath={pricingPath} />
        <Component 
        {...pageProps} 
        path={path} 
        browserPath={browserPath} 
        browserPathCase={browserPathCase} 
        pricingPath={pricingPath}
        />
        <Footer path={path} year={year} />
    </>
    );
}

/* 
getInitialProps solves serverside rendering in pricing page 
without getInitialProps it was giving path: '/pricing/[product]' 
with getInitialProps it returns path: '/pricing/hello'
*/
App.getInitialProps = async ({ asPath }) => {
  return {
    asPath,
  };
};