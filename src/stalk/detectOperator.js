module.exports = function (app) {
  // Fungsi detectOperator dari kode yang kamu berikan
  function detectOperator(phoneNumber) {
    phoneNumber = String(phoneNumber).replace(/\D/g, "");
    let country = "";
    if (phoneNumber.startsWith("62")) {
      phoneNumber = "0" + phoneNumber.slice(2);
      country = "Indonesia";
    } else if (phoneNumber.startsWith("91")) {
      country = "India";
    } else if (phoneNumber.startsWith("60")) {
      phoneNumber = "0" + phoneNumber.slice(2);
      country = "Malaysia";
    } else if (phoneNumber.startsWith("81")) {
      country = "Jepang";
    } else if (phoneNumber.startsWith("82")) {
      country = "Korea Selatan";
    } else if (phoneNumber.startsWith("86")) {
      country = "China";
    } else if (phoneNumber.startsWith("65")) {
      country = "Singapura";
    } else if (phoneNumber.startsWith("66")) {
      country = "Thailand";
    } else if (phoneNumber.startsWith("63")) {
      country = "Filipina";
    } else if (phoneNumber.startsWith("92")) {
      country = "Pakistan";
    } else if (phoneNumber.startsWith("880")) {
      country = "Bangladesh";
    } else if (phoneNumber.startsWith("84")) {
      country = "Vietnam";
    } else if (phoneNumber.startsWith("856")) {
      country = "Laos";
    } else if (phoneNumber.startsWith("95")) {
      country = "Myanmar";
    } else if (phoneNumber.startsWith("976")) {
      country = "Mongolia";
    } else if (phoneNumber.startsWith("31")) {
      phoneNumber = "0" + phoneNumber.slice(2);
      country = "Belanda";
    } else if (phoneNumber.startsWith("44")) {
      phoneNumber = "0" + phoneNumber.slice(2);
      country = "Inggris";
    }

    const operators = {
      "Indonesia": {
        'Telkomsel': [/^08(11|12|13|21|22|23|52|53)/],
        'Indosat Ooredoo': [/^08(14|15|16|55|56|57|58)/],
        'XL Axiata': [/^08(17|18|19|59|77|78)/],
        'Tri (3)': [/^08(95|96|97|98|99)/],
        'Smartfren': [/^08(81|82|83|84|85|86|87|88|89)/],
        'Axis': [/^08(31|32|33|38)/],
        'By.U': [/^08(51)/]
      },
      "India": {
        'Airtel': [/^07(00|01|02|03|04|05|06|07|08|09)/],
        'Vi (Vodafone Idea)': [/^07(10|11|12|13|14|15|16|17|18|19)/],
        'Jio': [/^07(20|21|22|23|24|25|26|27|28|29)/],
        'BSNL': [/^07(30|31|32|33|34|35|36|37|38|39)/],
        'MTNL': [/^07(40|41|42|43|44|45|46|47|48|49)/],
        'Reliance Communications': [/^07(50|51|52|53|54|55|56|57|58|59)/],
        'Tata Docomo': [/^07(60|61|62|63|64|65|66|67|68|69)/],
        'Telenor India': [/^07(70|71|72|73|74|75|76|77|78|79)/],
        'MTS India': [/^07(80|81|82|83|84|85|86|87|88|89)/],
        'Uninor': [/^07(90|91|92|93|94|95|96|97|98|99)/]
      },
      "Malaysia": {
        'Maxis (Hotlink)': [/^012/, /^017/, /^0142/, /^0111/, /^0112/],
        'Celcom (Xpax)': [/^013/, /^019/, /^0143/, /^0148/, /^0113/, /^0114/],
        'Digi': [/^016/, /^0146/, /^0115/, /^0116/],
        'U Mobile': [/^018/, /^0118/, /^0119/],
        'Unifi Mobile': [/^010/, /^0117/],
        'Yes 4G': [/^018/],
        'Tune Talk': [/^011/],
        'RedOne': [/^011/, /^012/],
        'XOX Mobile': [/^0122/, /^0123/, /^0124/, /^0125/]
      },
      "Jepang": {
        'NTT Docomo': [/^81(90|91|92|93)/],
        'SoftBank': [/^81(80|81|82)/],
        'au (KDDI)': [/^81(70|71|72)/]
      },
      "Korea Selatan": {
        'SK Telecom': [/^82(10|11|12|13)/],
        'KT Corporation': [/^82(16|17|18)/],
        'LG Uplus': [/^82(19)/]
      },
      "China": {
        'China Mobile': [/^86(13|15|18)/],
        'China Unicom': [/^86(130|131|132)/],
        'China Telecom': [/^86(133|153|180)/]
      },
      "Singapura": {
        'Singtel': [/^65(8|9)/],
        'StarHub': [/^65(83|84)/],
        'M1': [/^65(85|86)/]
      },
      "Pakistan": {
        'Jazz': [/^92(30|31|32|33)/],
        'Telenor': [/^92(34|35)/],
        'Zong': [/^92(36|37)/],
        'Ufone': [/^92(38|39)/]
      },
      "Vietnam": {
        'Viettel': [/^84(86|96|97|98)/],
        'Vinaphone': [/^84(88|91|94)/],
        'Mobifone': [/^84(89|90|93)/]
      },
      "Bangladesh": {
        'Grameenphone': [/^880(17)/],
        'Banglalink': [/^880(19)/],
        'Robi': [/^880(18)/],
        'Teletalk': [/^880(15)/]
      },
      "Belanda": {
        'KPN': [/^06(10|11|12|13|14|15|16|17|18|19)/],
        'Vodafone NL': [/^06(20|21|22|23|24|25|26|27|28|29)/],
        'T-Mobile NL': [/^06(30|31|32|33|34|35|36|37|38|39)/],
        'Tele2 NL': [/^06(40|41|42|43|44|45|46|47|48|49)/],
        'Lycamobile': [/^06(50|51|52|53|54|55|56|57|58|59)/],
        'Lebara': [/^06(60|61|62|63|64|65|66|67|68|69)/],
        'Youfone': [/^06(70|71|72|73|74|75|76|77|78|79)/],
        'Hollandsnieuwe': [/^06(80|81|82|83|84|85|86|87|88|89)/],
        'Budget Mobiel': [/^06(90|91|92|93|94|95|96|97|98|99)/]
      },
      "Inggris": {
        'EE (T-Mobile & Orange)': [/^07(40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59|62|70|71|72|73|74|75|76|77|78|79)/],
        'O2 (Telefonica UK)': [/^07(10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59|62)/],
        'Vodafone UK': [/^07(72|73|74|75|76|77|78|79|82|83|84|85|86|87|88|89|92|93|94|95|96|97|98|99)/],
        'Three UK': [/^07(32|33|34|35|36|37|38|39|41|71|81|91)/],
        'Giffgaff': [/^07(50|51|52|53|54|55|56|57|58|59|72|73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89)/],
        'Tesco Mobile': [/^07(70|71|72|73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89)/],
        'Sky Mobile': [/^07(40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59)/],
        'VOXI': [/^07(70|71|72|73|74|75|76|77|78|79|80|81|82|83|84|85|86|87|88|89)/],
        'Lebara Mobile': [/^07(40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59)/],
        'Lycamobile': [/^07(40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59|60|61|62|63|64|65|66|67|68|69)/],
        'iD Mobile': [/^07(32|33|34|35|36|37|38|39)/],
        'BT Mobile': [/^07(40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59)/]
      }
    };

    if (country && operators[country]) {
      for (const [operator, patterns] of Object.entries(operators[country])) {
        if (patterns.some(pattern => pattern.test(phoneNumber))) {
          return `${operator} (${country})`;
        }
      }
    }
    return 'Operator tidak ditemukan';
  }

  // Route: /api/detect-operator?phoneNumber=xxxx
  app.get('/api/detect-operator', async (req, res) => {
    try {
      const { phoneNumber } = req.query;
      if (!phoneNumber) {
        return res.status(400).json({
          status: false,
          error: "Parameter 'phoneNumber' wajib diisi"
        });
      }
      const result = detectOperator(phoneNumber);
      res.status(200).json({
        status: true,
        result: {
          phoneNumber,
          operator: result
        }
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message
      });
    }
  });
};
