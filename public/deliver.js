(async function () {
  const currentScript = document.currentScript;

  const environment =
    currentScript.getAttribute("data-environment") || "sandbox";
  const apiKey = currentScript.getAttribute("api-key");
  const urlApi = currentScript.getAttribute("url-api");

  let res;
  try {
    res = await fetch(`${urlApi}/api/v1/script?environment=${environment}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = await res.json();

    if (!document.getElementById("midtrans-script")) {
      const script = document.createElement("script");
      script.id = "midtrans-script";
      script.type = "text/javascript";
      script.src =
        "https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js";
      script.setAttribute("data-environment", environment);
      script.setAttribute("data-client-key", data.key);

      document.head.appendChild(script);

      script.onload = () => {
        window.MembershipNew3ds = {
          getCardToken: (cardData, options) => {
            return window.MidtransNew3ds.getCardToken(cardData, options);
          },
        };
      };
    }
  } catch (error) {
    console.log("ERROR", error);
  }
})();
