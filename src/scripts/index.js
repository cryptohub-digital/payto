import './lightswitch.js';
import Clipboard from 'clipboard';
import Ican from '@cryptohub/ican';
import Validator from 'multicoin-address-validator';

const idSection = document.querySelector('.idSection'),
    curSection = document.querySelector('.curSection'),
    idBtn = document.querySelector('.idButton'),
    curBtn = document.querySelector('.curButton'),
    nxtBtn = document.querySelector('.nextButton'),
    input = document.querySelectorAll('.input'),
    selLink = document.querySelector('.selLink'),
    paymentType = document.getElementsByName('type');

for (let item of input) {
    item.addEventListener('keyup', (e) => {
        const value = e.target.value,
            id = e.target.id,
            origin = document.getElementById(id),
            output = document.querySelector('.' + id + 'Output'),
            link = document.querySelector('.payto-link-container'),
            label = document.getElementById(id + 'Label');

        if (id == 'asset') {
            if (value.length >= 3) {
                var asset = value.toLowerCase();
                output.innerText = asset;
                for (var cyc = 0; cyc < paymentType.length; cyc++) {
                    if (paymentType[cyc].value === asset) {
                        document.getElementById(asset).checked = true;
                    }
                }
            } else {
              output.innerText = '';
            }
        }

        if (id == 'address') {
            if (value.length >= 5) {
                var asset = document.getElementById('asset').value.toLowerCase();
                const data = value.toLowerCase();
                if (asset.length >= 3) {
                    switch(asset) {
                        case 'xcb': // Core livenet
                        case 'xce': // Core Enterprise
                        case 'xab': // Core Testnet
                        case 'iban': // International Bank Account Number
                        case 'ican': // International Crypto Account Number
                            var valid = Ican.isValid(data);
                            if (valid) {
                                output.innerText = data;
                                origin.style.backgroundColor = "#9bffa66b";
                                label.classList.add('dib');
                                document.getElementById('addressLabel').classList.add('dib');
                            } else {
                                origin.style.backgroundColor = "#ff9b9b6b";
                            }
                            break;
                        case 'bic': // Bank Identifier Code
                            const bicrex = /^([a-z]{4})([a-z]{2})(([2-9a-z]{1})([0-9a-np-z]{1}))((([0-9a-wy-z]{1})([0-9a-z]{2}))|([x]{3})|)$/;
                            var valid = bicrex.test(String(data));
                            if (valid) {
                                output.innerText = data;
                                origin.style.backgroundColor = "#9bffa66b";
                                label.classList.add('dib');
                                document.getElementById('addressLabel').classList.add('dib');
                            } else {
                                origin.style.backgroundColor = "#ff9b9b6b";
                            }
                            break;
                        case 'upi': // Unified Payments Interface
                            const upirex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Uh oh! Stay simple
                            var valid = upirex.test(String(data));
                            if (valid) {
                                output.innerText = data;
                                origin.style.backgroundColor = "#9bffa66b";
                                label.classList.add('dib');
                                document.getElementById('addressLabel').classList.add('dib');
                            } else {
                                origin.style.backgroundColor = "#ff9b9b6b";
                            }
                            break;
                        case 'void': // Void, mostly cash
                            output.innerText = data;
                            label.classList.add('dib');
                            document.getElementById('addressLabel').classList.add('dib');
                            break;
                        default: // Crypto Wallets
                            var valid = Validator.validate(data, asset, 'both');
                            if (valid) {
                                output.innerText = data;
                                origin.style.backgroundColor = "#9bffa66b";
                                label.classList.add('dib');
                                document.getElementById('addressLabel').classList.add('dib');
                            } else {
                                origin.style.backgroundColor = "#ff9b9b6b";
                            }
                    }
                } else {
                    output.innerText = '';
                }
            } else {
                output.innerText = '';
                origin.style.backgroundColor = "transparent";
                label.classList.remove('dib');
                document.getElementById('addressLabel').classList.remove('dib');
            }
        }

        if (id == 'amount') {
            const amunum = parseFloat(value);
            if (value.length >= 1 && typeof amunum == 'number') {
                output.innerText = amunum;
                origin.style.backgroundColor = "#9bffa66b";
                label.classList.add('dib');
            } else if (value.length >= 1) {
                output.innerText = '';
                document.getElementById('currency').value = '';
                document.getElementById('currency').dispatchEvent(new Event('keyup'));
                origin.style.backgroundColor = "#ff9b9b6b";
                label.classList.remove('dib');
            } else {
                output.innerText = '';
                document.getElementById('currency').value = '';
                document.getElementById('currency').dispatchEvent(new Event('keyup'));
                origin.style.backgroundColor = "transparent";
                label.classList.remove('dib');
            }
        }

        if (id == 'currency') {
            if (value.length >= 3) {
                output.innerText = value.toUpperCase();
                label.classList.add('dib');
            } else {
                output.innerText = '';
                label.classList.remove('dib');
            }
        }

        if (id == 'id') {
            if (value.length >= 1) {
                output.innerText = encodeURIComponent(value);
                label.classList.add('dib');
            } else {
                output.innerText = '';
                label.classList.remove('dib');
            }
        }

        var showlbl = 0;
        for (let itm of input) {
            if (itm.name !== 'asset' && itm.name !== 'address' && itm.name !== 'currency' && itm.value.length >= 1) {
                showlbl++;
            }
        }
        if (showlbl === 1) {
            document.getElementById('symbolQuestion').classList.add('dib');
            document.getElementById('symbolAmp').classList.remove('dib');
        } else if (showlbl > 1) {
            document.getElementById('symbolQuestion').classList.add('dib');
            document.getElementById('symbolAmp').classList.add('dib');
        } else {
            document.getElementById('symbolQuestion').classList.remove('dib');
            document.getElementById('symbolAmp').classList.remove('dib');
        }
    });
}

// Currency click
curBtn.addEventListener("click", function (e) {
    if (curSection.classList.contains('dn')) {
        curSection.classList.remove('dn');
        document.getElementById('currency').focus();
    } else {
        curSection.classList.add('dn');
    }
});

// ID click
idBtn.addEventListener("click", function (e) {
    if (idSection.classList.contains('dn')) {
        idSection.classList.remove('dn');
        document.getElementById('id').focus();
    } else {
        idSection.classList.add('dn');
    }
});

// Reset click
nxtBtn.addEventListener("click", function (e) {
    document.getElementById('asset').value = '';
    document.getElementById("wallet").checked = true;
    document.getElementById('sendType').innerHTML = 'Wallet';
    document.getElementById('address').value = '';
    document.getElementById('address').style.backgroundColor = "transparent";
    document.getElementById('currency').value = '';
    document.getElementById('id').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('amount').style.backgroundColor = "transparent";
    document.getElementById('symbolQuestion').classList.remove('dib');
    document.getElementById('symbolAmp').classList.remove('dib');
});

// Select payment type
for (var cyc = 0; cyc < paymentType.length; cyc++) {
    paymentType[cyc].addEventListener('change', function (e) {
        if (this.checked) {
            switch(this.value) {
                case 'upi':
                    document.getElementById('sendType').innerText = 'E-mail';
                    break;
                case 'void':
                    document.getElementById('sendType').innerText = 'Clearing';
                    break;
                default:
                    document.getElementById('sendType').innerText = document.getElementById('label-' + this.value).textContent;
            }
            if (this.value !== 'wallet') {
                document.getElementById('asset').value = this.value;
            } else if (this.value === 'wallet') {
                document.getElementById('asset').value = '';
            }
        document.getElementById('asset').dispatchEvent(new Event('keyup'));
        }
    });
}

// Select click
selLink.addEventListener("click", function (e) {
    var ran = document.createRange();
    ran.selectNodeContents(document.getElementById('paytoResult'));
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(ran);
});
