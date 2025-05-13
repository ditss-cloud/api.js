module.exports = function (app) {
  const regionMap = {
    AF: "Afghanistan", AL: "Albania", DZ: "Aljazair", AS: "Samoa Amerika",
    AD: "Andorra", AO: "Angola", AR: "Argentina", AM: "Armenia", AU: "Australia",
    AT: "Austria", AZ: "Azerbaijan", BH: "Bahrain", BD: "Bangladesh", BY: "Belarus",
    BE: "Belgia", BJ: "Benin", BO: "Bolivia", BA: "Bosnia dan Herzegovina",
    BW: "Botswana", BR: "Brasil", BN: "Brunei", BG: "Bulgaria", KH: "Kamboja",
    CM: "Kamerun", CA: "Kanada", CL: "Chili", CN: "China", CO: "Kolombia",
    CR: "Kosta Rika", HR: "Kroasia", CY: "Siprus", CZ: "Republik Ceko",
    DK: "Denmark", DO: "Republik Dominika", EG: "Mesir", SV: "El Salvador",
    EE: "Estonia", ET: "Ethiopia", FI: "Finlandia", FR: "Perancis", GE: "Georgia",
    DE: "Jerman", GH: "Ghana", GR: "Yunani", GT: "Guatemala", HN: "Honduras",
    HK: "Hong Kong", HU: "Hungaria", IS: "Islandia", IN: "India", ID: "Indonesia",
    IR: "Iran", IQ: "Irak", IE: "Irlandia", IL: "Israel", IT: "Italia", JM: "Jamaika",
    JP: "Jepang", JO: "Yordania", KZ: "Kazakhstan", KE: "Kenya", KR: "Korea Selatan",
    KW: "Kuwait", LA: "Laos", LV: "Latvia", LB: "Lebanon", LY: "Libya",
    LT: "Lituania", LU: "Luksemburg", MO: "Makau", MG: "Madagaskar", MW: "Malawi",
    MY: "Malaysia", MV: "Maladewa", ML: "Mali", MT: "Malta", MX: "Meksiko",
    MN: "Mongolia", ME: "Montenegro", MA: "Maroko", MZ: "Mozambik", MM: "Myanmar",
    NA: "Namibia", NP: "Nepal", NL: "Belanda", NZ: "Selandia Baru", NI: "Nikaragua",
    NE: "Niger", NG: "Nigeria", MK: "Makedonia Utara", NO: "Norwegia", OM: "Oman",
    PK: "Pakistan", PS: "Palestina", PA: "Panama", PG: "Papua Nugini",
    PY: "Paraguay", PE: "Peru", PH: "Filipina", PL: "Polandia", PT: "Portugal",
    QA: "Qatar", RO: "Rumania", RU: "Rusia", RW: "Rwanda", SA: "Arab Saudi",
    SN: "Senegal", RS: "Serbia", SG: "Singapura", SK: "Slovakia", SI: "Slovenia",
    ZA: "Afrika Selatan", ES: "Spanyol", LK: "Sri Lanka", SE: "Swedia",
    CH: "Swiss", SY: "Suriah", TW: "Taiwan", TJ: "Tajikistan", TH: "Thailand",
    TR: "Turki", UG: "Uganda", UA: "Ukraina", AE: "Uni Emirat Arab",
    GB: "Inggris", US: "Amerika Serikat", UY: "Uruguay", UZ: "Uzbekistan",
    VE: "Venezuela", VN: "Vietnam", YE: "Yaman", ZM: "Zambia", ZW: "Zimbabwe"
  }

  app.get('/api/kode-negara', (req, res) => {
    const kode = req.query.kode
    if (!kode) return res.status(400).json({ status: false, message: "Parameter 'kode' tidak ditemukan." })

    const namaNegara = regionMap[kode.toUpperCase()] || null

    res.json({
      status: !!namaNegara,
      result: namaNegara ? {
        kode: kode.toUpperCase(),
        negara: namaNegara
      } : {
        message: "Kode negara tidak ditemukan."
      }
    })
  })
}
