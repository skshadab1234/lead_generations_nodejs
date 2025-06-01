const axios = require('axios');
const ExcelJs = require('exceljs')
require('dotenv').config()
const API_KEY = process.env.GOOGLE_API_KEY

const getPlacesDetail = async (place_id) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,formatted_phone_number,website,formatted_address,opening_hours,rating,user_ratings_total&key=${API_KEY}`;

        const response = await axios.get(url)
        if (response.data.status !== 'OK') {
            console.log(`Places DETAILS ERROR ${response.data.status}`)
            return null
        }

        return response.data.result
    } catch (error) {
        console.log(error)
    }
}

const findNearbyPlaces = async (keyword, location, radius) => {
    try {
        const nearByurl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${encodeURIComponent(keyword)}&location=${location}&radius=${radius}&key=${API_KEY}`

        const response = await axios.get(nearByurl)

        if (response.data.status !== 'OK') {
            console.log('Error fetching data:', response.data.status);
            return []
        }

        const places = response.data.results

        const detailedPlaces = await Promise.all(
            places.map(async place => {
                const details = await getPlacesDetail(place.place_id)
                let email = 'N/A'
                if (details?.website) {
                    email = await getEmailByWebiste(details?.website)
                }

                return {
                    name: place.name,
                    address: place.vicinity,
                    rating: place.rating || 'N/A',
                    user_ratings_total: place.user_ratings_total || 0,
                    phone: details?.formatted_phone_number || 'N/A',
                    website: details?.website,
                    email,
                    opening_hours: details?.opening_hours?.weekday_text?.join('; ') || 'N/A'
                }
            })
        )

        return detailedPlaces
    } catch (error) {
        console.log(error)
    }
}

const getEmailByWebiste = async (website_url) => {
    try {
        const response = await axios.get(website_url, { timeout: 5000 })
        const html = response.data

        // Simple regex to find email
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const emails = html.match(emailRegex)

        if (emails && emails.length > 0) {
            return emails[0]
        }

        return 'No email found'
    } catch (error) {
        console.log(error)
    }
}

// Save Excel file and store place data
const saveExcel = async (places) => {
    const workbook = new ExcelJs.Workbook()
    const worksheet = workbook.addWorksheet('Nearby places')

    worksheet.columns = [
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Address', key: 'address', width: 40 },
        { header: 'Rating', key: 'rating', width: 10 },
        { header: 'User Ratings Total', key: 'user_ratings_total', width: 20 },
        { header: 'Phone', key: 'phone', width: 20 },
        { header: 'Website', key: 'website', width: 40 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Opening Hours', key: 'opening_hours', width: 50 },
    ]

    places.forEach(place => {
        worksheet.addRow(place)
    })

    await workbook.xlsx.writeFile('places_with_emails.xlsx')
    console.log("Excel file saved")
}

(
    async () => {
        const keyword = 'perfume shop'
        const location = '28.6448,77.216721'
        const radius = 5000
        const data = await findNearbyPlaces(keyword, location, radius)
        if (data?.length > 0) {
            await saveExcel(data)
        } else {
            console.log('No places data')
        }
    }
)()
