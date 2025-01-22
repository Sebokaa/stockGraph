import axios from "axios";

export const fetchData = async (buisness) => {
    const api = process.env.REACT_APP_FMP_API_KEY;
    const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${buisness}?apikey=${api}`

    try {
        const apiResponse = await axios.get(url);
        return apiResponse;
    } catch (err) {
        console.error("Error fetching: ", err);
        return "Data N/A";
    }
}