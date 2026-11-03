"use client";
// Loads every tracker the site relies on. The old <Head> tags from next/head
// are ignored by the App Router, so none of these were running before.
import Script from "next/script";
import { useEffect } from "react";

const GTM_ID = "GTM-TJ32RV86";
// Retargeting pixels so site visitors keep seeing Comex Homes on Facebook,
// Instagram, TikTok and LinkedIn. Set these in Vercel > Settings > Environment Variables.
const META_PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_PIXEL = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
const LINKEDIN_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
// Set only if the GTM container does NOT already contain a GA4 tag, to avoid counting visits twice.
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function Tracking() {
  // Send a dataLayer event for every enquiry action so GA4 / GTM can report
  // which projects and pages produce leads.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest("a,button");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      let event = a.dataset.track;
      if (!event) {
        if (href.startsWith("tel:")) event = "call_click";
        else if (href.includes("wa.me") || href.includes("whatsapp")) event = "whatsapp_click";
        else if (href.includes("zfrmz.com") || href.includes("zohopublic.com")) event = "register_interest";
        else if (/astanaresidence|thereveal|balozisuites|nyayoviewsuites|lukenyaridge/.test(href)) event = "project_site_click";
      }
      if (!event) return;
      window.dataLayer = window.dataLayer || [];
      if (window.fbq) window.fbq("track", event === "register_interest" ? "Lead" : "Contact", { content_name: a.dataset.project || "" });
      if (window.gtag) window.gtag("event", event, { project: a.dataset.project || "", link_url: href });
      if (window.ttq) window.ttq.track(event === "register_interest" ? "SubmitForm" : "Contact");
      window.dataLayer.push({
        event,
        project: a.dataset.project || "",
        page_path: window.location.pathname,
        link_url: href,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <Script id="zsiq-init" strategy="afterInteractive">
        {`window.$zoho=window.$zoho||{};$zoho.salesiq=$zoho.salesiq||{widgetcode:"e9d202d9e744bd817759ea6dab3438a3be85a8fdad626057265123f3d5af7add1e873f1fea789d2454eec55d29ee6f4e",values:{},ready:function(){}};`}
      </Script>
      <Script id="zsiqscript" src="https://salesiq.zoho.com/widget" strategy="lazyOnload" />
      <Script id="metricool" strategy="lazyOnload">
        {`function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"fa199c8d48c8cf04b58c065d5c96587b"})});`}
      </Script>
      {GA4_ID && (
        <>
          <Script id="ga4-src" src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA4_ID}');`}
          </Script>
        </>
      )}
      {META_PIXEL && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL}');fbq('track','PageView');if(location.pathname.indexOf('/properties/')===0)fbq('track','ViewContent',{content_name:location.pathname.split('/').pop()});`}
        </Script>
      )}
      {TIKTOK_PIXEL && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${TIKTOK_PIXEL}');ttq.page();}(window,document,'ttq');`}
        </Script>
      )}
      {LINKEDIN_ID && (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`window._linkedin_partner_id="${LINKEDIN_ID}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(window._linkedin_partner_id);(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s)})(window.lintrk);`}
        </Script>
      )}
    </>
  );
}
