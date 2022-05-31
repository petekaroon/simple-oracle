App = {
    callerAddress: "0xac146c347E424756177e265499AD4bDdc3AB7F35",
    callerContract: null,

    init: async function() {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            window.web3 = new Web3(window.ethereum);

            App.callerContract = new web3.eth.Contract(callerABI, App.callerAddress);

            // Switch networks
            App.switchToBSCTestnet();
        }

        App.subscribeToContractEvents();
        App.bindBrowserEvents();
    },

    switchToBSCTestnet: function() {
        window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: "0x61",
                    chainName: "BSC Testnet",
                    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
                    iconUrls: [
                        "https://upload.wikimedia.org/wikipedia/commons/b/b2/Repl.it_logo.svg",
                    ],
                    nativeCurrency: {
                        name: "BNB",
                        symbol: "BNB",
                        decimals: 18,
                    },
                },
            ],
        });
    },

    // contract interactions
    getRandomNumber: async function() {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        // Request random number & return request ID
        return (await App.callerContract.methods.getRandomNumber().send({from: account}));
    },

    subscribeToContractEvents: function() {
        App.callerContract.events.RandomNumberRequested(async (err, event) => {
            if (err) console.error('Error on event', err)

            // Create list item
            let reqEventLi = document.createElement("li");
            reqEventLi.classList.add("request");
            reqEventLi.innerHTML = `Random number requested, ID: ${event.returnValues.id}`;
            
            // Add to top of list
            const eventLog = document.getElementById("events");
            eventLog.prepend(reqEventLi);
          });       

          App.callerContract.events.RandomNumberReceived((err, event) => {
            if (err) console.error('Error on event', err)

            // Create list item
            let recEventLi = document.createElement("li");
            recEventLi.classList.add("response");
            recEventLi.innerHTML = `Random number received for ID ${event.returnValues.id}: ${event.returnValues.number}`;

            // Add to top of list
            const eventLog = document.getElementById("events");
            eventLog.prepend(recEventLi);
          });
    },

    // interface
    bindBrowserEvents: function () {
        const requestButton = document.getElementById("request-rand");
        requestButton.addEventListener("click", async function() {
            const transaction = await App.getRandomNumber();

            const requestID = document.getElementById("request-id");
            requestID.innerHTML = `Submitted! Request ID: ${transaction.events.RandomNumberRequested.returnValues.id}`;
        });
    },
}

App.init();