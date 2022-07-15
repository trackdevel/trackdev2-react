//EL IMPORT "babel-polyfill" es necessari pq funcioni les crides async/await.
// S'ha de mirar si es pot posar a nivell global de projecte.
import "babel-polyfill"

const API_URL = "https://api.spacexdata.com/v3";

export async function getAllLaunches() {
    try {
        const response = await fetch(`${API_URL}/launches`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function getLaunchByFlightNumber(flightNumber) {
    try {
        const response = await fetch(`${API_URL}/launches/${flightNumber}`);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
