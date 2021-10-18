const redirectToMagento = (id) => {
  const openSalesOrder = (base_url) => {
    window.open(`${base_url}/sales/order/view/order_id/${id}`);
  };
  switch (window.location.origin) {
    case "https://master.d3i7a2ghskccgo.amplifyapp.com":
      openSalesOrder("https://nesto.shop/admin_7xbmc4");
      break;
    case "https://staging.d3i7a2ghskccgo.amplifyapp.com":
      openSalesOrder("https://staging.nesto.shop/admin_15vrxo");
      break;
    // case "https://dev.d3i7a2ghskccgo.amplifyapp.com":
    //   openSalesOrder("https://dev.nesto.shop/admin_15vrxo");
    //   break;
    default:
      openSalesOrder("https://dev.nesto.shop/admin_15vrxo");
  }
};
export default redirectToMagento;
