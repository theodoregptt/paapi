const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 3000;

console.log("Server is starting...");

var ProductAdvertisingAPIv1 = require("./src/index");
var defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;

defaultClient.accessKey = "AKIAJNYDUIUL3RXQ5F3Q";
defaultClient.secretKey = "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";
defaultClient.host = "webservices.amazon.com";
defaultClient.region = "us-east-1";

var api = new ProductAdvertisingAPIv1.DefaultApi();

app.get("/search", (req, res) => {
  const { keywords } = req.query;

  var searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();
  searchItemsRequest["PartnerTag"] = "giftologyexpe-20";
  searchItemsRequest["PartnerType"] = "Associates";
  searchItemsRequest["Keywords"] = keywords;
  searchItemsRequest["ItemCount"] = 2;
  searchItemsRequest["Resources"] = [
    "CustomerReviews.Count",
    "CustomerReviews.StarRating",
    "Images.Primary.Medium",
    "ItemInfo.Title",
    "Offers.Listings.Price",
  ];

  api.searchItems(searchItemsRequest).then(
    function (data) {
      res.json(data);
    },
    function (error) {
      res.status(500).json(error);
    }
  );
});

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
