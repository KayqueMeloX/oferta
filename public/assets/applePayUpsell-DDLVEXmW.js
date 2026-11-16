function t(){if(document.getElementById("cb-apple-pay-upsell-script"))return;const e=document.createElement("script");e.id="cb-apple-pay-upsell-script",e.defer=!0,e.textContent=`
(async () => {
    var _a;
    const sdkReady = new Promise((res) => {
        window.addEventListener('CB-apple-pay-ready', res);
    });
    const urlParams = new URLSearchParams(window.location.search);
    const isAppleCustomer = urlParams.get('pmt') === 'apple';
    if (!isAppleCustomer || !((_a = window.ApplePaySession) === null || _a === void 0 ? void 0 : _a.canMakePayments())) {
        return;
    }
    const el = document.createElement('script');
    el.src = 'https://apple-sdk.clickbank.net/cb-apple-pay.js';
    el.type = 'module';
    document.head.appendChild(el);
    const itemToHrefMap = {};
    const itemErrorCount = {};
    let fallbackHref = '';
    window.defaultCBAppleErrorHandler = (event) => {
        const { type, item: incomingItem } = event.detail;
        const item = incomingItem || 'global';
        itemErrorCount[item] = (itemErrorCount[item] || 0) + 1;
        if (itemErrorCount[item] > 1) {
            const redirect = itemToHrefMap[item] || fallbackHref;
            if (redirect) {
                window.location.href = redirect;
            }
        }
        switch (type) {
            case 'payment':
                window.alert('Payment not accepted - please try again!');
                break;
            default:
                window.alert('Unable to process transaction - please try again!');
        }
    };
    window.addEventListener('CB-apple-pay-error', window.defaultCBAppleErrorHandler);
    const sheet = document.createElement('style');
    sheet.innerHTML = \`@supports (-webkit-appearance: -apple-pay-button) {
		.CB-apple-pay-button {
			height: 3.125rem;
			width: 200px;
			display: inline-block;
			-webkit-appearance: -apple-pay-button;
			-apple-pay-button-type: buy;
			-apple-pay-button-style: black;
			box-shadow:
				rgb(0 0 0 / 20%) 0px 3px 1px -2px,
				rgb(0 0 0 / 14%) 0px 2px 2px 0px,
				rgb(0 0 0 / 12%) 0px 1px 5px 0px;
		}

		.CB-apple-pay-button:hover {
			cursor: pointer;
		}

		.CB-apple-pay-button:disabled {
			cursor: not-allowed;
		}
	}

	@supports not (-webkit-appearance: -apple-pay-button) {
		.CB-apple-pay-button {
			display: inline-block;
			background-size: 100% 50%;
			background-repeat: no-repeat;
			background-position: 50% 50%;
			border-radius: 5px;
			padding: 0px;
			box-sizing: border-box;
			min-width: 200px;
			height: 3.125rem;
			background-image: -webkit-named-image(apple-pay-logo-white);
			background-color: black;
			border: 1px solid black;
			box-shadow:
				rgb(0 0 0 / 20%) 0px 3px 1px -2px,
				rgb(0 0 0 / 14%) 0px 2px 2px 0px,
				rgb(0 0 0 / 12%) 0px 1px 5px 0px;
			width: 200px;
		}

		.CB-apple-pay-button:hover {
			cursor: pointer;
		}

		.CB-apple-pay-button:disabled {
			cursor: not-allowed;
		}
	}\`;
    document.head.appendChild(sheet);
    const anchorTags = document.querySelectorAll('a[href*="cbur=a"]');
    if (anchorTags.length === 0) {
        return;
    }
    for (let i = 0; i < anchorTags.length; i++) {
        const tag = anchorTags[i];
        const { href } = tag;
        const paylink = new URL(href);
        if (paylink.protocol !== 'https:') {
            continue;
        }
        const [, seller] = /([a-zA-Z\\d]{5,10})\\.pay\\.clickbank(-tst)?\\.net/.exec(paylink.hostname) || [];
        const tagParams = new URLSearchParams(paylink.search);
        const item = tagParams.get('cbitems');
        if (!item) {
            continue;
        }
        itemToHrefMap[item] = href;
        if (!seller) {
            continue;
        }
        if (!fallbackHref) {
            fallbackHref = href;
        }
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.classList.add('CB-apple-pay-button');
        btn.dataset.item = item;
        btn.dataset.seller = seller;
        tag.after(btn);
        tag.remove();
    }
    await sdkReady;
    window.CBApplePaySdk.init();
})();
`,document.head.appendChild(e)}function a(){const e=document.getElementById("cb-apple-pay-upsell-script");e&&e.remove()}export{t as i,a as r};
