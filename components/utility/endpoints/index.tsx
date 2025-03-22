import axios from "axios";

export const getSkips = async (id: any) =>
    axios.get(`https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft`);