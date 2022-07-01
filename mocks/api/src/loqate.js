import express from 'express'
const router = express.Router()

router.get('/find', (req, res) => {
  const result = {
    "Items": [
      {
        "Id": "GB|RM|B|7762190",
        "Type": "Address",
        "Text": "30 Lea Street",
        "Highlight": "0-2,3-6,7-13",
        "Description": "Kidderminster, DY10 1SW"
      },
      {
        "Id": "GB|RM|B|10609346",
        "Type": "Address",
        "Text": "30 Lea Street",
        "Highlight": "0-2,3-6,7-13",
        "Description": "Lindley, Huddersfield, HD3 3LS"
      },
      {
        "Id": "GB|RM|B|22291261",
        "Type": "Address",
        "Text": "30 Lea Street",
        "Highlight": "0-2,3-6,7-13",
        "Description": "New Mills, High Peak, SK22 3DS"
      },
      {
        "Id": "GB|RM|B|53881029",
        "Type": "Address",
        "Text": "30 Lea Street",
        "Highlight": "0-2,3-6,7-13",
        "Description": "Widnes, WA8 0WP"
      },
      {
        "Id": "GB|RM|B|7762157",
        "Type": "Address",
        "Text": "Flat 2, Amber Terrace, Lea Street",
        "Highlight": "",
        "Description": "Kidderminster, DY10 1SW"
      },
      {
        "Id": "GB|RM|B|50445787",
        "Type": "Address",
        "Text": "31B, Lea Street",
        "Highlight": "",
        "Description": "Kidderminster, DY10 1SW"
      },
      {
        "Id": "GB|RM|ENG|0AF-LE3",
        "Type": "Postcode",
        "Text": "LE3 0AF",
        "Highlight": "0-3,4-5",
        "Description": "Bruce Street, Leicester - 32 Addresses"
      },
      {
        "Id": "GB|RM|ENG|0AG-LE3",
        "Type": "Postcode",
        "Text": "LE3 0AG",
        "Highlight": "0-3,4-5",
        "Description": "Bruce Street, Leicester - 30 Addresses"
      }
    ]
  }

  return res.send(result)
})

router.get('/select', (req, res) => {
  const result = {
    "Items": [
      {
        "Id": "GB|RM|A|26731424",
        "DomesticId": "26731424",
        "Language": "ENG",
        "LanguageAlternatives": "ENG",
        "Department": "",
        "Company": "",
        "SubBuilding": "",
        "BuildingNumber": "",
        "BuildingName": "26A",
        "SecondaryStreet": "",
        "Street": "Bromwich Road",
        "Block": "",
        "Neighbourhood": "",
        "District": "",
        "City": "Worcester",
        "Line1": "26A Bromwich Road",
        "Line2": "",
        "Line3": "",
        "Line4": "",
        "Line5": "",
        "AdminAreaName": "Worcestershire",
        "AdminAreaCode": "",
        "Province": "Worcestershire",
        "ProvinceName": "Worcestershire",
        "ProvinceCode": "",
        "PostalCode": "WR2 4AA",
        "CountryName": "United Kingdom",
        "CountryIso2": "GB",
        "CountryIso3": "GBR",
        "CountryIsoNumber": "826",
        "SortingNumber1": "94141",
        "SortingNumber2": "",
        "Barcode": "(WR24AA2B9)",
        "POBoxNumber": "",
        "Label": "26A Bromwich Road\nWORCESTER\nWR2 4AA\nUNITED KINGDOM",
        "Type": "Residential",
        "DataLevel": "Premise",
        "Field1": "",
        "Field2": "",
        "Field3": "",
        "Field4": "",
        "Field5": "",
        "Field6": "",
        "Field7": "",
        "Field8": "",
        "Field9": "",
        "Field10": "",
        "Field11": "",
        "Field12": "",
        "Field13": "",
        "Field14": "",
        "Field15": "",
        "Field16": "",
        "Field17": "",
        "Field18": "",
        "Field19": "",
        "Field20": ""
      }
    ]
  }

  return res.send(result)
});

export default router;
